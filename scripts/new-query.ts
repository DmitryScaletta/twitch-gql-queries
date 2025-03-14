import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';

const SYNTAX = 'Syntax: pnpm new-query QueryName [QueryDisplayName]';

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
  content: string,
  newLine: string,
  lineRegex: RegExp,
) => {
  const lines = content.match(lineRegex);
  if (!lines) throw new Error('Wrong lineRegex');
  const oldLinesContent = lines.join('\n');
  if (lines.includes(newLine)) return null;
  lines.push(newLine);
  lines.sort();
  const newLinesContent = lines.join('\n');
  return content.replace(oldLinesContent, newLinesContent);
};

const getTypesNewLine = async (queryName: string, queryDisplayName: string) => {
  const content = await fsp.readFile('src/types.ts', 'utf8');
  const m = content.match(/(  \w+:\s+)(QueryResponse<'[^']+',\s+)[^>]+>;/);
  if (!m) throw new Error();
  const [, part1, part2] = m;
  return [
    `  ${queryName}:`.padEnd(part1.length),
    `QueryResponse<'${queryName}',`.padEnd(part2.length),
    `${queryDisplayName}Data>;`,
  ].join('');
};

const main = async () => {
  const args = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
  });

  if (args.positionals.length === 0 || args.positionals.length > 2) {
    return console.warn(SYNTAX);
  }

  let [queryName, queryDisplayName] = args.positionals;
  if (!queryDisplayName) queryDisplayName = queryName.replaceAll('_', '');

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

  const writeToFiles = [
    {
      filePath: 'scripts/build.ts',
      newLines: [
        [
          `  import('../src/queries/${queryName}/schema.ts'),`,
          /  import\('\.\.\/src\/queries\/.+\.ts'\),/,
        ],
      ],
    },
    {
      filePath: 'index.ts',
      newLines: [
        [
          `export * from './src/queries/${queryName}/query.ts';`,
          /export \* from '\.\/src\/queries\/.+\/query\.ts';/,
        ],
      ],
    },
    {
      filePath: 'src/types.ts',
      newLines: [
        [`  ${queryDisplayName}Data,`, /  [A-Za-z]+,/],
        [
          await getTypesNewLine(queryName, queryDisplayName),
          /  \w+:\s+QueryResponse<'[^']+',\s+[^>]+>;/,
        ],
      ],
    },
    {
      filePath: 'README.md',
      newLines: [[`* ${queryName}`, /\* \w+/]],
    },
  ] as const;

  for (const { filePath, newLines } of writeToFiles) {
    const content = await fsp.readFile(filePath, 'utf8');
    let newContent = content;
    for (const [newLine, lineRegex] of newLines) {
      const result = addLineAndSort(newContent, newLine, lineRegex);
      if (result) newContent = result;
    }
    if (content !== newContent) {
      await fsp.writeFile(filePath, newContent);
      console.log(`* \x1b[33m${filePath}\x1b[0m`);
    }
  }
};

main();
