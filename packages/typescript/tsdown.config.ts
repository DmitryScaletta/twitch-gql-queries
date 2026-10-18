import fsp from "node:fs/promises";
import path from "node:path";
import { defineConfig } from "tsdown";

const root = import.meta.dirname;
const src = path.join(root, "src");
const all = path.join(root, "all-ops");

const prepareAllOpsPkg = async () => {
  const pkg = JSON.parse(await fsp.readFile(path.join(root, "package.json"), "utf8"));
  const stamp = new Date().toISOString().replace(/\D/g, "").slice(0, 12);
  await fsp.rm(all, { recursive: true, force: true });
  await fsp.mkdir(all, { recursive: true });
  for (const file of await fsp.readdir(src, { recursive: true, withFileTypes: true })) {
    if (!file.isFile()) continue;
    const dir = path.relative(src, file.parentPath);
    const from = path.join(src, dir, file.name);
    const content = await fsp.readFile(from, "utf8");
    const to = path.join(all, "src", dir, file.name);
    await fsp.mkdir(path.dirname(to), { recursive: true });
    await fsp.writeFile(
      to,
      content.replace(/(\/generated\/)([\w-]+)\.generated\.ts/g, "$1$2-all.generated.ts"),
    );
  }
  await fsp.copyFile(path.join(root, "README.md"), path.join(all, "README.md"));
  const pkgNew = { ...pkg, name: `${pkg.name}-all`, version: `${pkg.version}-all.${stamp}` };
  await fsp.writeFile(path.join(all, "package.json"), JSON.stringify(pkgNew, null, 2));
};

await prepareAllOpsPkg();

export default defineConfig([
  { entry: { index: "src/index.ts" }, outDir: "dist", dts: true, clean: true },
  { entry: { index: "all-ops/src/index.ts" }, outDir: "all-ops/dist", dts: true },
]);
