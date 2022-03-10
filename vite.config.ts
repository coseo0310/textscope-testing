import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [vue()],
    server: {
      host: "0.0.0.0",
      fs: {
        allow: [".."],
      },
    },
    base: mode === "development" ? "./coseo0310.github.io" : "./",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/scss/_variables.scss";`,
        },
      },
    },
  };
});
