import fsp from "node:fs/promises";
import zlib from "node:zlib";

const ARCHIVE = "docs/openapi.br";
const FILES = ["docs/openapi.json", "docs/openapi-all.json"];
const SIZES = FILES.length * 4;

const pack = async () => {
  const files = await Promise.all(FILES.map((file) => fsp.readFile(file)));
  const sizes = Buffer.alloc(SIZES);
  files.forEach((file, index) => sizes.writeUInt32LE(file.length, index * 4));
  const packed = zlib.brotliCompressSync(Buffer.concat([sizes, ...files]), {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      [zlib.constants.BROTLI_PARAM_LGWIN]: 24,
    },
  });
  await fsp.writeFile(ARCHIVE, packed);
  console.log(`${ARCHIVE}: ${(packed.length / 1024).toFixed(1)} KiB`);
};

const unpack = async () => {
  const data = zlib.brotliDecompressSync(await fsp.readFile(ARCHIVE));
  let at = SIZES;
  for (const [index, file] of FILES.entries()) {
    const length = data.readUInt32LE(index * 4);
    await fsp.writeFile(file, data.subarray(at, at + length));
    at += length;
  }
};

if (process.argv.includes("--unpack")) await unpack();
if (process.argv.includes("--pack")) await pack();
