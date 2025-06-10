import dotenv from "dotenv";
import path from "path";

import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { URL } from "node:url";

(() => {
  const result = dotenv.config({ path: path.join(__dirname, ".env") }); // .env 파일의 경로를 dotenv.config에 넘겨주고 성공여부를 저장함
  if (result.parsed == undefined)
    // .env 파일 parsing 성공 여부 확인
    throw new Error("Cannot loaded environment variables file."); // parsing 실패 시 Throwing
})();

const port = Number(process.env.PORT);
const host = process.env.HOST ?? "";

const app = createServer(function (request, response) {
  console.log(port, host);
  let requestUrl = request.url;
  let movePage = request.url;
  if (requestUrl === "/") {
    movePage = "/index.html";
  }
  if (requestUrl === "/favicon.ico") {
    return response.writeHead(404);
  }

  const url = new URL("http://" + host + ":" + port + requestUrl);
  console.log("requestUrl", url, requestUrl);
  response.statusCode = 200;
  response.end(readFileSync(__dirname + movePage));
});

app.listen(port, host);
