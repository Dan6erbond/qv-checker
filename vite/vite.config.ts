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
  optimizeDeps: {
    exclude: [
      "vuestic-ui",
      "@popperjs/core",
      "asva-executors",
      "cleave.js",
      "colortranslator",
      "css-minimizer-webpack-plugin",
      "detect-browser",
      "element-resize-detector",
      "flatpickr",
      "gravatar",
      "lodash",
      "normalize.css",
      "spa-http-server",
      "v-tooltip",
      "vue-color",
      "vue-epic-bus",
      "vue-flatpickr-component",
      "vue-router",
    ],
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // suppress eval warnings
        if (warning.code === 'EVAL') return
        warn(warning)
      },
    },
  },
});
