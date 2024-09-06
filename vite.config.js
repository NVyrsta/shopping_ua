import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    VitePluginSvgSpritemap('./src/assets/icons/*.svg'),
  ],
});
