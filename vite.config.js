import { defineConfig } from 'vite'
import { resolve } from 'path'
import process from 'process'
import vue from '@vitejs/plugin-vue'
import CopyPlugin from 'vite-plugin-files-copy'
import htmlMinifierTerser from 'vite-plugin-html-minifier-terser'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
const env = process.argv[process.argv.length - 1]
const isProd = env === 'production'
export default defineConfig(({ mode }) => {
  return {
    base: isProd ? "vue3-cesium-app" : "/",
    publicDir: 'dist',
    mode: mode,
    define: {
      CESIUM_BASE_URL: isProd ? `'/vue3-cesium-app/public/'` : `'/public/'`,
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
    plugins: [
      vue(),
      htmlMinifierTerser(),
      CopyPlugin({
        patterns: [
          {
            from: 'public',
            to: 'dist/public',
          },
        ],
      }),
      AutoImport({
        resolvers: [ArcoResolver()],
      }),
      Components({
        resolvers: [
          ArcoResolver({
            sideEffect: true
          })
        ]
      })
    ],
    build: {
      emptyOutDir: true,
      chunkSizeWarningLimit: 5000,
      rollupOptions: {
        output: {
          manualChunks(id, { getModuleInfo, getModuleIds }) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        }
      }
    }
  }
})
