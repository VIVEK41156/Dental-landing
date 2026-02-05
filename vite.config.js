export default defineConfig({
  base: '/Updated-landing/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'gsap-vendor': ['gsap'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'ui-vendor': ['framer-motion', 'lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
