// https://custom-elements-manifest.open-wc.org/analyzer/config/#config-file

export default {
  /** Globs to include */
  globs: ['src/components/**/*.ts'],
  /** Globs to exclude */
  exclude: ['**/*.stories.ts', '**/*.test.ts'],
  /** Run in dev mode, provides extra logging */
  dev: false,
  /** Enable special handling for litelement */
  litelement: true,
};
