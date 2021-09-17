<template>
  <el-aside>
    <el-menu :default-active="defaultActive" router>
      <template v-for="(item, index) in menus" :key="index">
        <el-sub-menu :index="`${index}`" v-if="item.children">
          <template #title>
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(elItem, elIndex) in item.children"
            :key="elIndex"
            :index="`${index}-${elIndex}`"
            :route="elItem.route"
          >
            <i v-if="elItem.icon" :class="item.icon"></i>
            {{ elItem.name }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="`${index}`" :route="item.route">
          <i v-if="item.icon" :class="item.icon"></i>
          {{ item.name }}
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
export default {
  name: "LayoutAside",
};
</script>
<script lang="ts" setup>
import { computed } from "vue";
import menus from "./menu.json";

const hasChildren = (item: Record<string, any>) => !!item.children;
const getDefaultActive = (list: Record<string, any>[], result = "0") => {
  const [item] = list;
  if (hasChildren(item)) {
    result += "-0";
    getDefaultActive(item.children, result);
  }
  return result;
};

const defaultActive = computed(() => getDefaultActive(menus));
</script>
