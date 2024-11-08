import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Recipe-Roulette-Final-Project/src/main.jsx",
  server: {
    port: 3001,
  },
  build: {
    outDir: "dist",
  },
});
