import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/recipe-roulette-final-project",
  server: {
    port: 3001,
  },
  build: {
    outDir: "dist",
  },
});
