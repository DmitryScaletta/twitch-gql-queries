import assert from "node:assert/strict";
import fsp from "node:fs/promises";
import path from "node:path";

const OPEN_API = "./docs/openapi.json";
const OPEN_API_ALL = "./docs/openapi-all.json";
const OUT_DIR = "packages/typescript/src/generated";

const PAIRS = [
  { openApi: OPEN_API, suffix: "" },
  { openApi: OPEN_API_ALL, suffix: "-all" },
];

type Schema = Record<string, unknown>;
type Nodes = Record<string, Schema>;
type PathItem = { post: { tags: string[] } };
type Document = { paths: Record<string, PathItem>; components: { schemas: Nodes } };

const KEYS = {
  args: "x-args",
  confidence: "x-confidence",
  scalar: "x-gql-scalar",
  aliasFor: "x-alias-for",
  directive: "x-directive",
} as const;

const REF = "#/components/schemas/";

const UNKNOWN = "Unknown";
const PRIMITIVE_VALUE = "PrimitiveValue";
const ENUM_OR_INPUT = "EnumOrInput";
const UNKNOWN_VALUE = "UnknownValue";
const RESERVED = new Set([UNKNOWN, UNKNOWN_VALUE]);

const SCALARS: Record<string, string> = {
  ID: "string",
  Cursor: "string",
  Time: "string",
  DateTime: "string",
};

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

const isRecord = (value: unknown): value is Schema =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isText = (value: unknown): value is string => typeof value === "string";

const objects = (value: unknown): Schema[] => (Array.isArray(value) ? value.filter(isRecord) : []);

const texts = (value: unknown) => (Array.isArray(value) ? value.filter(isText) : []);

const keywords = (schema: Schema) => (isText(schema.type) ? [schema.type] : texts(schema.type));

const nullableOf = (schema: Schema) =>
  keywords(schema).includes("null") ||
  objects(schema.oneOf).some((one) => keywords(one).includes("null"));

const propsOf = (schema: Schema): Record<string, Schema> =>
  isRecord(schema.properties) ? (schema.properties as Record<string, Schema>) : {};

const requiredOf = (schema: Schema) => new Set(texts(schema.required));

const isRef = (schema: Schema) => isText(schema.$ref);

const refName = (schema: Schema) => String(schema.$ref).replace(REF, "");

const isPlaceholder = (schema: Schema) => {
  const confidence = schema[KEYS.confidence];
  return isRecord(confidence) && confidence.typedef === false;
};

const literal = (value: unknown) => (isText(value) ? JSON.stringify(value) : String(value));

/** A union or an intersection has to say where it ends, an object does not */
const wrap = (text: string) => (/[|&]/.test(text) && !text.startsWith("{") ? `(${text})` : text);

const metaValueToGql = (value: unknown): string => {
  if (isText(value)) return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value === null) return "null";
  if (Array.isArray(value)) return `[${value.map(metaValueToGql).join(", ")}]`;
  if (!isRecord(value)) return String(value);
  const entries = Object.entries(value).map(([key, one]) => {
    const name = IDENTIFIER.test(key) ? key : JSON.stringify(key);
    return `${name}: ${metaValueToGql(one)}`;
  });
  return `{ ${entries.join(", ")} }`;
};

const scalarOf = (schema: Schema) => {
  const one = schema[KEYS.scalar];
  return isText(one) && SCALARS[one] !== undefined ? one : undefined;
};

const plainOf = (schema: Schema): string => {
  const found = keywords(schema).filter((one) => one !== "null");
  const one = found.length === 1 ? found[0] : undefined;
  if (one === "string") return scalarOf(schema) ?? "string";
  if (one === "integer" || one === "number") return "number";
  if (one === "boolean") return "boolean";
  return "unknown";
};

const gqlArgTypeOf = (schema: Schema): string => {
  const nameOf = (branch: Schema): string => {
    if (isRef(branch)) return refName(branch);
    const found = keywords(branch).filter((one) => one !== "null");
    if (found.includes("array"))
      return `[${isRecord(branch.items) ? nameOf(branch.items) : "Unknown"}]`;
    const held = found[0];
    if (held === "string") return scalarOf(branch) ?? "String";
    if (held === "integer") return "Int";
    if (held === "number") return "Float";
    if (held === "boolean") return "Boolean";
    return "Unknown";
  };
  const branch = objects(schema.oneOf).find((one) => !keywords(one).includes("null"));
  return `${nameOf(branch ?? schema)}${nullableOf(schema) ? "" : "!"}`;
};

const DOUBTS: Record<string, string> = {
  nullable: "nullable",
  array: "is array",
};

const confidenceOf = (value: unknown): string[] => {
  if (value === false) value = { type: false, array: false, nullable: false };
  if (!isRecord(value)) return [];
  const labels = Object.entries(value)
    .filter(([key, doubt]) => doubt === false && Object.keys(DOUBTS).includes(key))
    .map(([key]) => DOUBTS[key] ?? key);
  const result: string[] = [];
  if (value.name === false) result.push(`ℹ️ Not real Twitch type name`);
  if (labels.length > 0) result.push(`⚠️ Low confidence about: ${labels.join(", ")}`);
  return result;
};

const tagsOf = (schema: Schema): string[] => {
  const tags: string[] = [];
  const held = (tag: string, value: unknown) => {
    if (value === undefined) return;
    tags.push(`@${tag} ${isText(value) ? value : metaValueToGql(value)}`);
  };

  tags.push(...confidenceOf(schema[KEYS.confidence]));
  held("description", schema.description);
  held("format", schema.format);
  held("pattern", schema.pattern);
  held("min-length", schema.minLength);
  held("minimum", schema.minimum);
  held("maximum", schema.maximum);
  held("default", schema.default);
  if (Array.isArray(schema.examples)) tags.push(`@example ${metaValueToGql(schema.examples)}`);
  held("aliasFor", schema[KEYS.aliasFor]);
  held("directive", schema[KEYS.directive]);

  const argumentsOf = schema[KEYS.args];
  if (isRecord(argumentsOf)) {
    for (const [name, one] of Object.entries(propsOf(argumentsOf))) {
      const seen = Array.isArray(one.examples) ? ` ${metaValueToGql(one.examples)}` : "";
      tags.push(`@gqlArg \`${name}: ${gqlArgTypeOf(one)}${seen}\``);
    }
  }

  return tags;
};

const commentOf = (schema: Schema): string => {
  const tags = tagsOf(schema);
  if (tags.length === 0) return "";
  if (tags.length === 1) return `/** ${tags[0]} */\n`;
  return `/**\n${tags.map((one) => ` * ${one}`).join("\n")}\n */\n`;
};

const shift = (text: string, pad: string) =>
  text
    .split("\n")
    .map((one) => (one === "" ? "" : pad + one))
    .join("\n");

const objectOf = (schema: Schema, nodes: Nodes, indent: number): string => {
  const required = requiredOf(schema);
  const pad = "  ".repeat(indent + 1);

  const held = Object.entries(propsOf(schema)).map(([name, one]) => {
    const key = IDENTIFIER.test(name) ? name : JSON.stringify(name);
    const mark = required.has(name) ? "" : "?";
    // a type of several lines indents itself, so only the first is placed here
    return `${shift(commentOf(one), pad)}${pad}${key}${mark}: ${typeAt(one, nodes, indent + 1)};`;
  });
  if (schema.additionalProperties === true) held.push(`${pad}[key: string]: unknown;`);

  if (held.length === 0) return "{}";
  // one field and one line of its own says it best on one line
  const only = held[0]!;
  if (held.length === 1 && !only.includes("\n")) return `{ ${only.trim().replace(/;$/, "")} }`;
  return `{\n${held.join("\n")}\n${"  ".repeat(indent)}}`;
};

/** Every branch of a schema, nulls and lists among them, `null` always first */
const typeAt = (schema: Schema, nodes: Nodes, indent = 0): string => {
  if (isRef(schema)) {
    const name = refName(schema);
    if (name === UNKNOWN) return PRIMITIVE_VALUE;
    return isPlaceholder(nodes[name]) ? ENUM_OR_INPUT : name;
  }
  if (schema.const !== undefined) return literal(schema.const);
  if (Array.isArray(schema.enum)) return schema.enum.map(literal).join(" | ");

  if (isPlaceholder(schema)) return ENUM_OR_INPUT;

  const parts = objects(schema.oneOf).map((one) => typeAt(one, nodes, indent));
  const found = keywords(schema);
  if (found.includes("array"))
    parts.push(
      `${wrap(isRecord(schema.items) ? typeAt(schema.items, nodes, indent) : "unknown")}[]`,
    );
  if (found.includes("null")) parts.push("null");

  // a fragment is a type of its own, so it is referred to and not copied
  const members = objects(schema.allOf).map(refName);
  const own = Object.keys(propsOf(schema));
  const shaped = members.length > 0 || own.length > 0;
  if (shaped)
    parts.push(
      [...members, ...(own.length === 0 ? [] : [objectOf(schema, nodes, indent)])].join(" & "),
    );

  // a keyword says nothing of its own once a shape is found beside it
  const plain = found.filter((one) => one !== "array" && one !== "null");
  if (!shaped || plain.some((one) => one !== "object"))
    parts.push(...plain.map((one) => plainOf({ ...schema, type: one })));

  if (parts.length === 0) return plainOf(schema);
  const kept = [...new Set(parts)];
  // nothing known swallows whatever sits beside it, `null` among them
  if (kept.includes("unknown")) return "unknown";
  return kept.sort((a, b) => Number(b === "null") - Number(a === "null")).join(" | ");
};

const aliasOf = (name: string, schema: Schema, nodes: Nodes) =>
  `${commentOf(schema)}export type ${name} = ${typeAt(schema, nodes, 0)};\n`;

/** Every type the roots reach, and every scalar of a name among them */
const reachOf = (nodes: Nodes, roots: Schema[]) => {
  const shared: string[] = [];
  const scalars = new Set<string>();
  const seen = new Set<string>();

  const visit = (value: unknown) => {
    if (Array.isArray(value)) {
      for (const one of value) visit(one);
      return;
    }
    if (!isRecord(value)) return;

    const scalar = scalarOf(value);
    if (scalar !== undefined) scalars.add(scalar);

    const name = isRef(value) ? refName(value) : undefined;
    if (
      name !== undefined &&
      !seen.has(name) &&
      !RESERVED.has(name) &&
      !isPlaceholder(nodes[name])
    ) {
      seen.add(name);
      shared.push(name);
      visit(nodes[name]);
    }
    for (const one of Object.values(value)) visit(one);
  };

  for (const one of roots) visit(one);
  return { scalars: [...scalars].sort(), shared: shared.sort() };
};

const found = (nodes: Nodes, name: string) => {
  const one = nodes[name];
  assert(one !== undefined, `no schema named ${name}`);
  return one;
};

const constOf = (nodes: Nodes, name: string, keys: string[]) => {
  let at: unknown = found(nodes, name);
  for (const key of keys) {
    assert(isRecord(at) && key in at, `${name} holds no ${key}`);
    at = at[key];
  }
  if (isRecord(at)) at = at.const;
  assert(isText(at), `${name} holds no constant`);
  return at;
};

/**
 * A variable that may be `null` may be left out as well, one that may not has
 * to be sent - so it is the type that says whether a variable is required.
 */
const requiredVariablesOf = (variables: Schema): Schema => {
  const required: string[] = [];
  for (const [name, one] of Object.entries(propsOf(variables)))
    if (!nullableOf(one)) required.push(name);
  return { ...variables, required };
};

const header = (name: string, from: string) => `import type { ${name} } from "${from}";\n`;

const build = (document: Document) => {
  const nodes = document.components.schemas;

  const named = Object.keys(document.paths).map((path) => {
    const display = path.slice(1);
    const body = `${display}RequestBody`;
    const variables = propsOf(found(nodes, body)).variables;
    assert(isRecord(variables), `${display} holds no variables`);
    const sent = requiredVariablesOf(variables);
    return {
      data: found(nodes, `${display}Data`),
      display,
      hash: constOf(nodes, body, [
        "properties",
        "extensions",
        "properties",
        "persistedQuery",
        "properties",
        "sha256Hash",
      ]),
      kind: document.paths[path]!.post.tags.includes("mutation") ? "Mutation" : "Query",
      operation: constOf(nodes, body, ["properties", "operationName"]),
      // nothing to send says nothing to name a type of
      variables: Object.keys(propsOf(sent)).length === 0 ? undefined : sent,
    };
  });

  const roots = named.flatMap((one) => [one.variables ?? {}, one.data]);
  const { scalars, shared } = reachOf(nodes, roots);

  let types = header("QueryResponse", "../types.ts");
  for (const one of scalars) types += `\nexport type ${one} = ${SCALARS[one]};\n`;
  types += `\nexport type ${PRIMITIVE_VALUE} = string | number | boolean;\n`;
  types += `\nexport type ${ENUM_OR_INPUT} = Record<string, unknown> | ${PRIMITIVE_VALUE};\n`;
  types += `\nexport type ${UNKNOWN_VALUE} = null | ${PRIMITIVE_VALUE} | ${PRIMITIVE_VALUE}[];\n`;

  for (const name of shared) types += `\n${aliasOf(name, found(nodes, name), nodes)}`;
  for (const { display, operation, variables, data } of named) {
    if (variables !== undefined) types += `\n${aliasOf(`${display}Variables`, variables, nodes)}`;
    types += `\n${aliasOf(`${display}Data`, data, nodes)}`;
    types += `\nexport type ${display}Response = QueryResponse<${display}Data, ${literal(operation)}>;\n`;
  }

  const names = new Set<string>();
  let operations = "";
  for (const { display, operation, hash, kind } of named) {
    const name = display.endsWith(kind) ? display : `${display}${kind}`;
    assert(!names.has(name), `duplicate operation name ${name}`);
    names.add(name);
    operations += `export const ${name} = [${literal(operation)}, ${literal(hash)}] as const;\n`;
  }

  const mapOf = (name: string, one: (operation: string) => string) => {
    let text = `\nexport type ${name} = {\n`;
    for (const { operation } of named) text += `  ${operation}: ${one(operation)};\n`;
    return `${text}};\n`;
  };
  const byOperation = new Map(named.map((one) => [one.operation, one]));
  types += mapOf("QueryVariablesMap", (operation) => {
    const one = byOperation.get(operation)!;
    return one.variables === undefined ? "Record<string, never>" : `${one.display}Variables`;
  });
  types += mapOf(
    "QueryResponseMap",
    (operation) => `${byOperation.get(operation)!.display}Response`,
  );

  return { operations, types };
};

const main = async () => {
  await fsp.mkdir(OUT_DIR, { recursive: true });

  for (const one of PAIRS) {
    const document = JSON.parse(await fsp.readFile(one.openApi, "utf8")) as Document;
    const types = `types${one.suffix}.generated.ts`;
    const { operations, types: text } = build(document);
    for (const [name, body] of [
      [types, text],
      [`operations${one.suffix}.generated.ts`, operations],
    ])
      await fsp.writeFile(path.join(OUT_DIR, name), body, "utf8");
    console.log(
      `${one.suffix || "stable"}: ${Object.keys(document.paths).length} operations, ${text.split("\n").length} lines`,
    );
  }
};

await main();
