# cli-create-project

## 已经配置的库

Vue3 + element-plus + axios + husky + jest + cypress + commitizen + validate-commit-msg + conventional-changelog-cli

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
