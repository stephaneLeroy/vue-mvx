import {defineConfig} from "vite";
import nodePolyfills from "rollup-plugin-polyfill-node";


export default defineConfig({
    define: {
        global: "globalThis",
    },
    build: {
        rollupOptions: {
            plugins: [nodePolyfills()],
        },
        commonjsOptions: {
            transformMixedEsModules: true,
        }
    },
    optimizeDeps: {
        include: ["vue-erdjs", "@elrondnetwork/erdjs"],
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            }
        }
    },
})
