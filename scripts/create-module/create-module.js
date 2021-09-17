/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const { ESLint } = require("eslint");
const modules = require("./module.json");

const viewsPath = path.join(__dirname, "../../src/views/");
const routerPath = path.join(__dirname, "../../src/router");
const routesPath = path.join(routerPath, "/routes");
const menuPath = path.join(__dirname, "../../src/layout");

const eslint = new ESLint({ fix: true });

/**
 * 工厂函数，创建以恶搞创建文件夹的方法
 * @param {string} basePath 创建文件夹的基础路径
 * @returns { function } 返回一个创建文件夹的具体方法
 */
const getCreateFolder = (basePath) => {
  return async (folderName) => {
    const folderPath = path.join(basePath, folderName);
    try {
      const res = await fs.promises.stat(folderPath);
      if (!res.isDirectory()) {
        // 不是文件夹的时候，创建文件夹
        fs.promises.mkdir(folderPath);
      }
    } catch (err) {
      // 找不到文件或文件夹或报错
      fs.promises.mkdir(folderPath, { recursive: true });
    }
  };
};

/**
 * 创建 views 下的文件夹
 */
const createViewFolder = getCreateFolder(viewsPath);
/**
 * 创建 router/routes 下的文件夹
 */
const createRouteFolder = getCreateFolder(routesPath);

/**
 * 工厂函数返回实际创建文件的方法
 * @param {string} basePath 创建文件的基本路径
 * @param {string} ext 文件后缀名
 * @returns {function} 返回实际创建文件的方法
 */
const getCreateFile = (basePath, ext) => {
  const templatePath = path.join(__dirname, "/template/", ext.slice(1));
  return async (fileName) => {
    const filePath = path.join(basePath, `${fileName}${ext}`);
    const name = fileName.replace(/\/\w/gi, (res) =>
      res.slice(1).toUpperCase()
    );
    const write = async () => {
      const templateStr = await fs.promises.readFile(templatePath, {
        encoding: "utf8",
      });
      await fs.promises.writeFile(
        filePath,
        templateStr.replace(/#{name}/g, name)
      );
    };
    try {
      const res = await fs.promises.stat(filePath);
      if (!res.isFile()) {
        // 不是文件，可以写入内容
        write();
      }
    } catch (err) {
      // 找不到文件或文件夹或报错
      write();
    }
  };
};

const createViewFile = getCreateFile(viewsPath, ".vue");

/**
 * 创建 views 下的文件夹和文件夹
 * @param {{
 *  name: "product",
 *  title: "项目",
 *  children: []
 * }} views 创建的模块
 * @param {string} basePath 基于src/views/的路径
 */
const createViews = (views, basePath = "/") => {
  // 要创建的文件/文件夹的路径
  const isFolder = !!views.children;
  if (isFolder) {
    createViewFolder(basePath + views.name);
  } else {
    createViewFile(basePath + views.name);
  }
  if (views.children) {
    for (let i = 0; i < views.children.length; i++) {
      const element = views.children[i];
      createViews(element, basePath + views.name + "/");
    }
  }
};

/**
 * 拼接字符串，从第二个参数开始，首字母大写
 * @param {string} str
 * @param  {...string} arg
 * @returns string
 */
const joinStr = (str, ...arg) => {
  return (str ?? "") + arg.map((item) => item[0].toUpperCase() + item.slice(1));
};

/**
 * 获取单个route的配置
 * @param {{
 *  name: "product",
 *  title: "项目",
 *  children: []
 * }} routes 创建的模块
 * @param isParent {boolean} 是否是顶级的路由
 * @param parentName {string} 父路由的 name/path
 */
const getRouteTmp = (route, isParent, parentName) => {
  const path = isParent ? "/" + route.name : route.name;
  const name = isParent ? route.name : joinStr(parentName, route.name);
  const componentPath = isParent ? route.name : `${parentName}/${route.name}`;
  const isRedirect = route.redirect;
  const component = `component: () => import(/* webpackName: "${name}" */"@/views/${componentPath}.vue"),`;
  const redirect = `redirect: "${isRedirect}",component: () => import(/* webpackName: "Layout" */"@/layout/index.vue"),`;
  return `{
    path: "${path}",
    name: "${name}",
    ${isRedirect ? redirect : component}
    meta: {
      title: "${route.title}"
    },
    ${
      route.children?.length
        ? `children: [
      ${route.children
        ?.map((item) => getRouteTmp(item, false, route.name))
        .join(",")}
    ]
    `
        : ""
    }
  }
  `;
};

/**
 * 创建 routes 下的文件
 * @param {{
 *  name: "product",
 *  title: "项目",
 *  children: []
 * }} routes 创建的模块
 */
const createRouteFile = async (routes) => {
  const filePath = path.join(routesPath, routes.name + ".ts");
  const str = `export default ${getRouteTmp(routes, true)};`;
  const write = async () => {
    // 先用 eslint 修改一下代码格式
    const results = await eslint.lintText(str);
    await fs.promises.writeFile(filePath, results[0].output);
  };
  try {
    const res = await fs.promises.stat(filePath);
    if (!res.isFile()) {
      // 不是文件，可以写入内容
      write();
    }
  } catch (err) {
    // 找不到文件或文件夹或报错
    write();
  }
};

/**
 * 创建 routes 下的index.ts 导出所有的路由
 */
const createRouteIndexFile = async () => {
  let files = await fs.promises.readdir(routesPath);
  files = files
    .filter((file) => {
      return file !== "index.ts" && file.endsWith(".ts");
    })
    .map((file) => file.slice(0, -3));
  let str = files
    .map((file) => `import ${file}Routes from "./${file}";`)
    .join("");
  str += `
    export default [
      ${files.map((file) => file + "Routes").join(",")}
    ]
  `;
  // 先用 eslint 修改一下代码格式
  const results = await eslint.lintText(str);
  await fs.promises.writeFile(
    path.join(routesPath, "./index.ts"),
    results[0].output
  );
};

/**
 * 创建 routes 下的文件夹和文件
 * @param {{
 *  name: "product",
 *  title: "项目",
 *  children: []
 * }} routes 创建的模块
 * @param {string} basePath 基于src/views/的路径
 */
const createRoutes = async (routes) => {
  await createRouteFile(routes);
};

const getMenu = (menu, parentMenu = "/") => {
  const children = menu.children?.filter((item) => item.show !== false) || [];
  const route = parentMenu + menu.name;
  return {
    name: menu.title,
    route: menu.redirect || parentMenu + menu.name,
    icon: menu.icon,
    children: children.length
      ? children.map((item) => getMenu(item, `${route}/`))
      : null,
  };
};

/**
 * 创建左侧侧边栏
 */
const createMenuFile = async () => {
  const filePath = path.join(menuPath, "./menu.json");
  const menus = modules
    .filter((menu) => menu.show !== false)
    .map((menu) => getMenu(menu));
  await fs.promises.writeFile(filePath, JSON.stringify(menus, null, 4));
};

const run = async () => {
  await createRouteFolder("/");
  for (const item of modules) {
    createViews(item);
    await createRoutes(item);
  }
  await createRouteIndexFile();
  createMenuFile();
};

run();
