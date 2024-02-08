import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from "autoprefixer";
import {fileURLToPath, URL} from "node:url";

const env = loadEnv('all', './')
export default defineConfig(({command}) => {
    const base = command === 'build' ? env?.VITE_BASE_URL || '/users-test-task/' : '/'
    return {
        plugins: [vue()],
        css: {
            postcss: {
                plugins: [autoprefixer],
            },
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "src/assets/css/variables.scss";`,
                }
            }
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
      base
    }
})
