import path from "path"
import {fileURLToPath, URL} from "url";
import vue from "@vitejs/plugin-vue"
import {defineConfig} from "vite"

const commonConfig = defineConfig({
    plugins: [
        vue()
    ],
    define: {
        __VUE_OPTIONS_API__: false
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    },
})

export default defineConfig({
    ...commonConfig,
    build: {
        minify: true,
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "VueErdJs",
            fileName: format => `index.${format}.js`,
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ["vue"],
            output: {
                sourcemap: false,
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: "Vue",
                },
                // Use `index.css` for css
                assetFileNames: assetInfo => {
                    if (assetInfo.name == "style.css") return "index.css"
                    return assetInfo.name
                },
            }
        }
    }
})
