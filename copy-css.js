/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
fs.copyFileSync(path.join("src", "index.css"), path.join("dist", "index.css"));
