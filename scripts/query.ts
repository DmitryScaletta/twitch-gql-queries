import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { gen } from './gen.ts';

const SYNTAX = `Syntax:
pnpm add-query QueryName [QueryDisplayName]
pnpm remove-query QueryName
`;

const getFileTemplates = async () => {
  const queryFilesTemplate = await fsp.readFile(
    'scripts/query-files-template.md',
    'utf8',
  );
  const templatesArr = queryFilesTemplate
    .split(/## (\w+\.(?:ts|test\.ts|http))/)
    .slice(1);
  const templates: [name: string, template: string][] = [];
  for (let i = 0; i < templatesArr.length; i += 2) {
    const name = templatesArr[i];
    const template = templatesArr[i + 1];
    templates.push([name, template.match(/```[^\n]+\s*(.*)\s*```/s)![1]]);
  }
  return templates;
};

const addLineAndSort = (
  _content: string,
  newLine: string,
  lineRegex: RegExp,
) => {
  const content = _content.replaceAll('\r', '');
  const lines = content.match(lineRegex);
  if (!lines) throw new Error('Wrong lineRegex');
  const oldLinesContent = lines.join('\n');
  if (lines.includes(newLine)) return null;
  lines.push(newLine);
  lines.sort();
  const newLinesContent = lines.join('\n');
  return content.replace(oldLinesContent, newLinesContent);
};

const getLinesInFiles = (queryName: string) =>
  [
    [
      'index.ts',
      [
        `export * from './src/queries/${queryName}/query.ts';`,
        /export \* from '\.\/src\/queries\/.+\/query\.ts';/g,
      ],
    ],
    ['README.md', [`* ${queryName}`, /\* \w+/g]],
  ] as const;

const addQuery = async (queryName: string, queryDisplayName: string) => {
  const fileTemplates = await getFileTemplates();

  await fsp.mkdir(path.join('src', 'queries', queryName), { recursive: true });

  for (const [name, template] of fileTemplates) {
    const filePath = path.join('src', 'queries', queryName, name);
    if (fs.existsSync(filePath)) continue;
    await fsp.writeFile(
      filePath,
      template
        .replaceAll('%QUERY_NAME%', queryName)
        .replaceAll('%QUERY_DISPLAY_NAME%', queryDisplayName),
    );
    console.log(`+ \x1b[32m${filePath}\x1b[0m`);
  }

  for (const [filePath, [queryLine, lineRegex]] of getLinesInFiles(queryName)) {
    const content = await fsp.readFile(filePath, 'utf8');
    let newContent = content;
    const result = addLineAndSort(newContent, queryLine, lineRegex);
    if (result) newContent = result;
    if (content !== newContent) {
      await fsp.writeFile(filePath, newContent);
      console.log(`* \x1b[33m${filePath}\x1b[0m`);
    }
  }
};

const removeQuery = async (queryName: string) => {
  const queryFolder = path.join('src', 'queries', queryName);
  const dir = await fsp.readdir(queryFolder, {
    recursive: true,
    withFileTypes: true,
  });
  const entries = [
    ...dir.filter((f) => f.isFile()),
    ...dir.filter((f) => f.isDirectory()),
  ];
  for (const dirent of entries) {
    const filePath = path.join(dirent.parentPath, dirent.name);
    try {
      await fsp.unlink(filePath);
      console.log(`- \x1b[31m${filePath}\x1b[0m`);
    } catch {}
  }
  for (const [filePath, [queryLine]] of getLinesInFiles(queryName)) {
    const content = await fsp.readFile(filePath, 'utf8');
    let newContent = content.replace(`${queryLine}\n`, '');
    if (content !== newContent) {
      await fsp.writeFile(filePath, newContent);
      console.log(`* \x1b[33m${filePath}\x1b[0m`);
    }
  }
  await gen();
};

const main = async () => {
  const args = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
  });

  if (args.positionals.length === 0 || args.positionals.length > 3) {
    return console.warn(SYNTAX);
  }

  let [operation, queryName, queryDisplayName] = args.positionals;
  if (!queryDisplayName) queryDisplayName = queryName.replaceAll('_', '');

  if (operation === 'add') return addQuery(queryName, queryDisplayName);
  if (operation === 'remove') return removeQuery(queryName);

  console.warn(SYNTAX);
};

main();
