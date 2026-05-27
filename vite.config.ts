import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { manifestPlugin } from '@journals/mf-contract/vite-plugin'

export default defineConfig({
  plugins: [react(), manifestPlugin()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'remoteEntry',
    },
    rollupOptions: {},
  },
  server: { port: 3001 },
  preview: {
    port: 3001,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
})
