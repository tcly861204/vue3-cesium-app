import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: "/",
    publicDir: 'dist',
    mode: mode,
    define: {
      CESIUM_BASE_URL: `'/public/'`,
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    assetsInclude: ['**/*.glb'],
    plugins: [vue()],
  }
})
