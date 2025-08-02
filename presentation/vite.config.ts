import { UserConfig } from 'vite';

export default {
  optimizeDeps: {
    exclude: ['playground-elements']
  }
} satisfies UserConfig;
