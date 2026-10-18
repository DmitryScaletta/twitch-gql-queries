import assert from "node:assert/strict";
import fsp from "node:fs/promises";

const README = "README.md";
const OPEN_API = "docs/openapi.json";
const PACKAGES = {
  typescript: "TypeScript",
};

const getQueriesList = (openApiRaw: string) => {
  const openApi = JSON.parse(openApiRaw);
  const queries: string[] = [];
  for (const openApiPath of Object.values(openApi.paths)) {
    const ref = (openApiPath as any).post.requestBody.content["application/json"].schema.$ref;
    const schema = ref.split("/").pop();
    queries.push(openApi.components.schemas[schema].properties.operationName.const);
  }
  return queries;
};

const fillQueriesList = (readme: string, queries: string[]) => {
  const HEADING = "## Available queries";
  const start = readme.indexOf(HEADING);
  assert(start !== -1, `${readme} has no "${HEADING}" section`);
  const end = readme.indexOf("\n## ", start);
  const after = end === -1 ? "" : readme.slice(end);
  const list = queries.map((query) => `- ${query}`).join("\n");
  const content = `${readme.slice(0, start)}${HEADING}\n\n${list}\n${after}`;
  return content;
};

const [readme, openApi] = await Promise.all([
  fsp.readFile(README, "utf8"),
  fsp.readFile(OPEN_API, "utf8"),
]);
const queriesList = getQueriesList(openApi);
const readmeNew = fillQueriesList(readme, queriesList);

const promises = [fsp.writeFile(README, readmeNew)];
for (const lang of Object.keys(PACKAGES)) {
  promises.push(fsp.writeFile(`packages/${lang}/README.md`, `<!-- generated -->\n\n${readme}`));
}
await Promise.all(promises);
