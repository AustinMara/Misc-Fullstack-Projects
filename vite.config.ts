import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        tailwindcss(),
        react()
    ],
    base:'/Misc-Fullstack-Projects',
    server: {
       watch: {
         usePolling: true, // Enable polling for file changes
       },
    },

})