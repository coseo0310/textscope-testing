import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [vue()],
    server: {
      host: "0.0.0.0",
      port: mode.includes("admin") ? 4000 : 3000,
      fs: {
        allow: [".."],
      },
    },
    base: "./",
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
