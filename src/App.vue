<template>
  <el-config-provider :locale="zhCn">
    <div>
      <h1>请求的内容</h1>
      <div>{{ result }}</div>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <el-button type="primary">测试按需引入</el-button>
    <div class="bg-red">{{ env }}</div>
    <el-calendar />
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { Ref, ref } from "@vue/reactivity";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { aService } from "@/axios";
const env: Ref = ref(process.env.VUE_APP_ENV);
const result = ref("");
aService.get("/get").then(({ data }) => {
  result.value = data;
});
</script>

<style lang="scss">
.bg-red {
  width: toRem(200px);
  height: toRem(200px);
  background: $primary-color;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
