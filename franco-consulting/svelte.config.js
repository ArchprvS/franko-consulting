import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  kit: {
    adapter: adapter({
      pages: 'build', // Folder wyjściowy dla GitHub Pages
      assets: 'build',
      fallback: '404.html', // Dla SPA, aby obsługiwać routing
      precompress: false
    }),
    paths: {
      base: '/moja-aplikacja-svelte' // Zastąp nazwą repozytorium
    }
  },
  preprocess: vitePreprocess()
};