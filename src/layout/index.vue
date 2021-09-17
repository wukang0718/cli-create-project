<template>
  <el-container class="layout" direction="vertical">
    <layout-header style="background: green"></layout-header>
    <el-container>
      <layout-aside style="background: blue"></layout-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
export default {
  name: "Layout",
};
</script>
<script lang="ts" setup>
import LayoutAside from "./Aside.vue";
import LayoutHeader from "./Header.vue";
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>
