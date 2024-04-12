import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // To build the other non-index.html files in the root required for auth,
    // we need to specify multiple entry points as described at
    // https://vitejs.dev/guide/build.html#multi-page-app
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        callback: resolve(__dirname, "callback.html"),
        login: resolve(__dirname, "login.html"),
        logout: resolve(__dirname, "logout.html"),
        register: resolve(__dirname, "register.html")
      }
    }
  }
})
