import {defineConfig} from "vite";
import nodePolyfills from "rollup-plugin-polyfill-node";


export default defineConfig({
    define: {
        global: "globalThis",
        'process.env': process.env
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
