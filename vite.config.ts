import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      
      devOptions: {
        enabled: true
      },
      
      injectRegister: 'auto',
      
      workbox: {
        globPatterns: ['**/*.{tsx,ts,js,jsx,css,html,ico,png,svg,}'],
        cleanupOutdatedCaches: true,
        sourcemap: true
      },
      
      includeAssets: [
        './fonts/IBMPlexSansThai-Bold.ttf',
        './fonts/IBMPlexSansThai-ExtraLight.ttf',
        './fonts/IBMPlexSansThai-Light.ttf',
        './fonts/IBMPlexSansThai-Medium.ttf',
        './fonts/IBMPlexSansThai-Regular.ttf',
        './fonts/IBMPlexSansThai-SemiBold.ttf',
        './fonts/IBMPlexSansThai-Thin.ttf',
        './Icon/icons8-navigate-48.png',
        './images/DrawKit-daily-life-vector-illustration-01.png',
        './images/DrawKit-daily-life-vector-illustration-01.svg',
        './images/DrawKit-daily-life-vector-illustration-02.png',
        './images/drawkit-daily-life-vector-illustration-02.svg',
        './images/example-scene-2.png',
        './images/example-scene-2.svg',
        './images/gradient-background.png',
        './images/gradient-background.svg',
        './images/gradient-background2.png',
        './images/gradient-background2.svg',
        './logos/flowy-red-on-white.png',
        './logos/flowy-red-on-white.svg',
        './logos/flowy-white-on-red.png',
        './logos/flowy-white-on-red.svg',
        './logos/flowy-red-on-white-circle.png',
        './logos/flowy-red-on-white-circle.svg',
        './logos/flowy-white-on-red-circle.png',
        './logos/flowy-white-on-red-circle.svg',
        './logos/flowy-logo.png',
        './logos/flowy-logo.svg'
      ],

      manifest: {
        name: 'Flowider Service | Flowy',
        short_name: 'Flowider',
        scope: '/',
        start_url: '/',
        theme_color: "#FFFEFF",
        background_color: "#FFFEFF",
        display: 'standalone',
        description: 'Flowy is an Airbnb for reading & co-working space, provide you a hourly rental for your task manaing day.',
        icons: [
          {
            src: './logos/flowy-red-on-white.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './logos/flowy-red-on-white.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: './logos/flowy-red-on-white.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: './logos/flowy-red-on-white.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: './logos/flowy-red-on-white.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
          {
            src: './logos/flowy-red-on-white.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
        ]
      }
    }),
  ],
})