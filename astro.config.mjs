import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  buildOptions: {
    site: 'http://localhost:3000',
  },
});
