import { UserConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import { NodePackageImporter } from 'sass-embedded';
import minifyHTML from 'rollup-plugin-minify-template-literals';

export default {
  plugins: [
    {
      // Этот плагин минифицирует шаблоны компонентов
      ...minifyHTML(),
      apply: 'build',
    },
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        importers: [new NodePackageImporter()],
      },
    },
  },
  build: {
    target: 'es2022',
    cssMinify: true,
  },
} as UserConfig;
