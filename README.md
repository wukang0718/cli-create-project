# cli-create-project

## 已经配置的库

Vue3 + element-plus + axios + husky + jest + cypress + commitizen + validate-commit-msg + conventional-changelog-cli

## 配置过程
1. [第一篇-使用vue-cli 创建Vue3项目](https://wukang0718.com/2021/09/06/%E7%AC%AC%E4%B8%80%E7%AF%87-%E4%BD%BF%E7%94%A8vue-cli%20%E5%88%9B%E5%BB%BAVue3%E9%A1%B9%E7%9B%AE/)

2. [第二篇-Vue3 项目中集成 element-plus
](https://wukang0718.com/2021/09/07/%E7%AC%AC%E4%BA%8C%E7%AF%87-Vue3-%E9%A1%B9%E7%9B%AE%E4%B8%AD%E9%9B%86%E6%88%90-element-plus/)

3. [第三篇-vue3 项目中配置模式和环境变量](https://wukang0718.com/2021/09/08/%E7%AC%AC%E4%B8%89%E7%AF%87-vue3-%E9%A1%B9%E7%9B%AE%E4%B8%AD%E9%85%8D%E7%BD%AE%E6%A8%A1%E5%BC%8F%E5%92%8C%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F/)

4. [第四篇-添加工具规范 git commit message](https://wukang0718.com/2021/09/08/%E7%AC%AC%E5%9B%9B%E7%AF%87-%E6%B7%BB%E5%8A%A0%E5%B7%A5%E5%85%B7%E8%A7%84%E8%8C%83-git-commit-message/)

5. [第五篇-Vue3项目中集成axios](https://wukang0718.com/2021/09/10/%E7%AC%AC%E4%BA%94%E7%AF%87-Vue3%E9%A1%B9%E7%9B%AE%E4%B8%AD%E9%9B%86%E6%88%90axios/)

6. [第六篇-项目展示基本框架](https://wukang0718.com/2021/09/17/%E7%AC%AC%E5%85%AD%E7%AF%87-%E9%A1%B9%E7%9B%AE%E5%B1%95%E7%A4%BA%E5%9F%BA%E6%9C%AC%E6%A1%86%E6%9E%B6/)
## 项目启动
### 开发环境

```bash
yarn install
yarn serve
```
### 链接测试服务的启动方式

```bash
yarn serve --mode t
```

## 项目打包

### 测试环境

```bash
yarn build:t
```
在 `deployment/test` 会生成 `nginx` 配置文件 `default.cong`

### 生产环境

```bash
yarn build
```
在 `deployment/prod` 会生成 `nginx` 配置文件 `default.cong`

## 运行测试

### eslint

```bash
yarn lint
```

### jest单元测试

```bash
yarn test:unit
```

### cypress端到端的测试

```bash
yarn test:e2e
```

## 代码提交

```bash
yarn commit
```

## 生成 changelog

```bash
yarn changelog
```
