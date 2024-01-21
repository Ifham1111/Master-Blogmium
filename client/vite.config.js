import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  //adding const proxy for endpoint frontend
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
