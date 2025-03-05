import { createServer } from "node:http";
import { readFileSync } from "node:fs";

const port = 3000;
const app = createServer(function (request, response) {
  let url = request.url;
  let movePage = request.url;
  if (url === "/") {
    movePage = "/index.html";
  }
  if (url === "/favicon.ico") {
    return response.writeHead(404);
  }

  response.statusCode = 200;
  response.end(readFileSync(__dirname + movePage));
});

app.listen(port);
