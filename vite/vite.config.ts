import vue from "@vitejs/plugin-vue";
import { join } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
  optimizeDeps: {},
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // suppress eval warnings
        if (warning.code === "EVAL") {
          console.error(
            `${warning.loc.file} [${warning.loc.line}:${warning.loc.column}]`,
            "-",
            warning.message,
          );
        }
        warn(warning);
      },
    },
  },
});
