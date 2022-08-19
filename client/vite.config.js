import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react';
const path = require('path')

export default ({ mode }) => {
    process.env = {
        ...process.env,
        ...loadEnv(mode, process.cwd())
    }
    return defineConfig({
        plugins: [ react() ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            },
        },
        server: {
            port: 3000,
            proxy: {
                "/api": {
                    target: process.env.VITE__REACT_APP_SERVER_URL,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
    })
}

