import { createRouter, createWebHashHistory } from "vue-router";
import { path, routes } from "./routes";
import { useCommonStore } from "@/store";

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  isMenuExtend(to.path);
  next();
});

export { path };

function isMenuExtend(path: string) {
  const commonStore = useCommonStore();
  if (path.includes("inspection")) {
    commonStore.isMenuExtend = false;
  } else {
    commonStore.isMenuExtend = true;
  }
}
