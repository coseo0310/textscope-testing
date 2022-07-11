import { createRouter, createWebHashHistory } from "vue-router";
import { path, routes } from "./routes";

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  next();
});

export { path };
