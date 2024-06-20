import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all")],
  resolve: {
    alias: {
      "@app/pages": path.resolve(__dirname, "src/libs/pages"),
      "@app/api": path.resolve(__dirname, "src/libs/api"),
      "@app/constants": path.resolve(__dirname, "src/libs/constants"),
      "@app/hooks": path.resolve(__dirname, "src/libs/hooks"),
      "@app/models": path.resolve(__dirname, "src/libs/models"),
      "@app/stores": path.resolve(__dirname, "src/libs/stores"),
      "@app/ui": path.resolve(__dirname, "src/libs/ui"),
      "@app/utils": path.resolve(__dirname, "src/libs/utils"),
      "@app/services": path.resolve(__dirname, "src/libs/services"),
    },
  },
});
