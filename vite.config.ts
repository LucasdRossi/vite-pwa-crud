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
      base: "/",
      includeAssets: ["/src/assets/favicon.ico"],
      manifest: {
        name: "VitePWA",
        short_name: "VitePWA",
        description: "VitePWA",
        background_color: "#fafafa",
        theme_color: "#fafafa",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "src/assets/android-chrome-192x192",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "src/assets/android-chrome-512x512",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/src/assets/android-chrome-192x192",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/src/assets/android-chrome-512x512",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
