const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.env.PORT) || 3000;
const publicDir = path.join(__dirname, "public");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon"
};

const server = http.createServer((request, response) => {
  const requestPath = decodeURIComponent((request.url || "/").split("?")[0]);
  const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
  const filePath = path.resolve(publicDir, relativePath);

  if (!filePath.startsWith(`${publicDir}${path.sep}`) && filePath !== path.join(publicDir, "index.html")) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        fs.readFile(path.join(publicDir, "index.html"), (fallbackError, fallbackContent) => {
          if (fallbackError) {
            response.writeHead(404);
            response.end("Not found");
            return;
          }
          response.writeHead(200, { "Content-Type": mimeTypes[".html"] });
          response.end(fallbackContent);
        });
        return;
      }

      response.writeHead(500);
      response.end("Internal server error");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, { "Content-Type": mimeTypes[extension] || "application/octet-stream" });
    response.end(content);
  });
});

server.listen(port, () => {
  console.log(`Document Lifecycle Manager: http://localhost:${port}`);
});
