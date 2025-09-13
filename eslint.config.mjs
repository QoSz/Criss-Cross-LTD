import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "coverage/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // JS-only overrides (service worker etc.)
  {
    files: ["public/sw.js"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];

export default config;


