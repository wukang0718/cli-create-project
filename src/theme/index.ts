import { App } from "vue";
import "dayjs/locale/zh-cn";
import {
  ElButton,
  ElCalendar,
  ElConfigProvider,
  ElContainer,
  ElMenu,
} from "element-plus";
import "./index.scss";

export default (app: App): void => {
  app.config.globalProperties.$ELEMENT = { size: "small" };
  app.use(ElButton);
  app.use(ElCalendar);
  app.use(ElConfigProvider);
  app.use(ElContainer);
  app.use(ElContainer.ElHeader);
  app.use(ElContainer.ElAside);
  app.use(ElContainer.ElMain);
  app.use(ElMenu);
  app.use(ElMenu.ElMenuItem);
  app.use(ElMenu.ElSubMenu);
};
