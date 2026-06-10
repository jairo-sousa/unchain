const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const PORT = 3000;

const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "text/javascript",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

const STATIC_PATH = __dirname;

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
  const urlAsPath = decodeURI(url);
  const paths = [STATIC_PATH, urlAsPath];
  if (url.endsWith("/")) paths.push("index.html");
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : null;
  if (!found) return { found };
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

http
  .createServer(async (req, res) => {
    const file = await prepareFile(req.url);
    if (!file.found) return res.writeHead(404).end("Not found");
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    res.writeHead(200, { "Content-Type": mimeType });
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
  })
  .listen(PORT);

console.log(`Server running at http://localhost:${PORT}/`);
