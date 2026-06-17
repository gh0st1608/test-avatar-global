import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss({ optimize : true})],
  resolve: {
    alias: {
      "@domain": path.resolve(__dirname, "./src/domain"),
      "@application": path.resolve(__dirname, "./src/application"),
      "@presentation": path.resolve(__dirname, "./src/presentation"),
      "@infrastructure": path.resolve(__dirname, "./src/infrastructure"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/samples": {
        target: "http://localhost:3000",
        changeOrigin: true,
        bypass(req) {
          // Browser page navigation (Accept: text/html) → serve index.html (React Router).
          // fetch/XHR API calls → proxy to backend.
          if (req.headers["accept"]?.includes("text/html")) {
            return "/index.html";
          }
        },
      },
    },
  },
});