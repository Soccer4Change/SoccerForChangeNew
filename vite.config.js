import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // ✅ For GitHub Pages: use repo name in base
  // If deploying to a custom domain or root path, change this to "/"
  base: "./",

  plugins: [react()],

  preview: {
    port: 5174,
    strictPort: true,
  },

  server: {
    port: 3000,
    strictPort: true,
    open: true, // Optional: opens browser automatically on dev server start
  },
});
