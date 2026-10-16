import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // En GitHub Pages la web vive en /<nombre-del-repo>/; en local y en un dominio propio, en /.
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
  return {
    base: process.env.GITHUB_PAGES && repoName ? `/${repoName}/` : '/',
    plugins: [react(), tailwindcss()],
  };
});
