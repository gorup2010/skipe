/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
// import type { UserConfig as VitestUserConfigInterface } from "vitest/config";

// const vitestConfig: VitestUserConfigInterface = {
//   test: {
//     globals: true,
//     environment: "jsdom",
//     setupFiles: ["./src/setupTests.ts"],
//   },
// };

// https://vitejs.dev/config/
export default defineConfig({
  // test: vitestConfig.test,
  plugins: [react({}), tsconfigPaths()],
  preview: {
    port: 5173,
  },
  // resolve: {npm install --save-dev
  //   alias: [
  //     {
  //       find: '@',
  //       replacement: resolve(__dirname, './src'),
  //     },
  //   ],
  // },
});
