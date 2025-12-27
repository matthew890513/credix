import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    fs: {
      allow: [
        '/Users/mateovazquezw/Proyectos/Credix/credixClient/public',
        '/Users/mateovazquezw/Proyectos/Credix/credixClient/src/assets'     
      ]
    }
  }
});