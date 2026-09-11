import { defineConfig } from "vite";

export default defineConfig({
  resolve: { alias: { "@": new URL("./", import.meta.url).pathname } },
});
