import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from "autoprefixer";
import {fileURLToPath, URL} from "node:url";

export default defineConfig(({command}) => {
    const base = command === 'build' ? import.meta.env.BASE_URL || '/users-test-task/' : '/'
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
