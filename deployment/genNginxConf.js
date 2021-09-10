/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const configFile = path.join(__dirname, "../vue.config.js");
const nginxFileName = "default.conf";
const configBaseFile = path.join(__dirname, "./nginx.conf.tmp");
const mode = process.argv[2];

let filePath;
let envPath;
if (mode === "t" || mode === "test") {
  filePath = path.join(__dirname, "test", nginxFileName);
  envPath = path.join(__dirname, "../.env.t");
} else if (mode === "prod") {
  filePath = path.join(__dirname, "prod", nginxFileName);
  envPath = path.join(__dirname, "../.env.production");
} else {
  console.log(`没有对应的模式：${mode}`);
  process.exit(1);
}

// 加载环境变量
const env = dotenv.config({ path: envPath });
dotenvExpand(env);

let proxyPass = `
  # 配置反向代理`;

if (fs.statSync(configFile).isFile()) {
  const webpackConfig = require(configFile);
  const proxy = webpackConfig?.devServer?.proxy;
  if (proxy) {
    for (const [k, { target, pathRewrite }] of Object.entries(proxy)) {
      let metaPath = k;
      if (pathRewrite) {
        Object.keys(pathRewrite).forEach((p) => {
          metaPath = metaPath.replace(p, pathRewrite[p]);
        });
      }
      proxyPass += `
  location ${k} {
    proxy_pass ${target}${metaPath};
  }
      `;
    }
  } else {
    console.log("没有配置 devServer.proxy，不需要设置代理");
  }
} else {
  console.log("没有 vue.config.js 文件，不需要设置代理");
}

const tmpStr = fs.readFileSync(configBaseFile, { encoding: "utf8" });

fs.writeFileSync(
  filePath,
  tmpStr.replace("# proxy_pass placeholder", proxyPass)
);

console.log("nginx 配置文件生成");
