import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      strategies: "generateSW",
      manifest: {
        name: "VitePWA",
        short_name: "VitePWA",
        description: "VitePWA",
        background_color: "#fafafa",
        theme_color: "#fafafa",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
      },
    }),
  ],
});
