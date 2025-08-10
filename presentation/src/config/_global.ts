import dedent from 'dedent';
import type { ProjectManifest } from './interface.ts';

export const globalConfig = {
  files: {
    'global.css': {
      content: dedent`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap');

        body {
          --bg-color: rgb(27, 27, 27);
          --yellow: rgb(247, 214, 83);

          padding: 0;
          margin: 1rem;
          background-color: var(--bg-color);

          font-family: "JetBrains Mono", monospace;
          font-optical-sizing: auto;
          font-weight: 400;
          font-style: normal;
          font-size: 2.125em;
          color: #fff;
        }
      `,
      hidden: true,
    },
    'index.d.ts': {
      content: dedent`
        declare module '*.css' {
          const content: CSSStyleSheet;
          export default content;
        }
      `,
      hidden: true,
    },
  },
} satisfies ProjectManifest;

export const globalHead = (extra: string = '') => dedent`
  <!-- playground-hide -->
  <!doctype html>
  <head>
    <link rel="stylesheet" href="./global.css" />
    ${extra}
  </head>
  <!-- playground-hide-end -->
`;
