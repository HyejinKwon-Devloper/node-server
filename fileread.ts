import { readFile } from "node:fs";

readFile("sample.txt", "utf8", function (error, data) {
  console.log(data);
});
