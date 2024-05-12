import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  compilerOptions: {
    isCustomElement: (tag) => tag.startsWith("add-"),
  },
});
