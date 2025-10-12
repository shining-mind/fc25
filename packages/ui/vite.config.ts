import { UserConfig } from 'vite';
import { NodePackageImporter } from 'sass-embedded';
import autoprefixer from 'autoprefixer';
import { getEntryFromPackage } from './vite-helpers';

export default {
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
    // Код в dist должен быть читаемым, он будет обфусцирован в конечном проекте
    minify: false,
    cssMinify: true,
    outDir: './dist',
    lib: {
      formats: ['es'],
      entry: getEntryFromPackage(import.meta.url),
    },
    rollupOptions: {
      external: [/\.test\.ts$/, /lit/],
      output: {
        preserveModules: true,
      },
    },
  },
} as UserConfig;
