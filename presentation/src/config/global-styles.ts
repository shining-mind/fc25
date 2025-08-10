import dedent from 'dedent';
import type { ProjectManifest } from './interface.ts';
import { globalConfig } from './_global.ts';

export default {
  files: {
    'index.html': {
      content: dedent`
        <!doctype html>
        <head>
          <!-- playground-hide -->
          <link rel="stylesheet" href="./global.css" />
          <!-- playground-hide-end -->
          <link rel="stylesheet" href="./tw.css" />
        </head>
        <body>
          <template shadowrootmode="open">
            <div class="bg-sky-500 m-8">
              Hello, world
            </div>
          </template>
          <!-- playground-fold -->
          <script type="module" src="">
          </script>
          <!-- playground-fold-end -->
        </body>
      `,
    },
    'index.ts': {
      content: dedent`
        import sheet from "./tw.css" with {
          type: "css"
        };

        const root = document.body.shadowRoot;
        /* Поддержка с Safari 16.4 */
        root.adoptedStyleSheets = [sheet];
      `,
    },
    'tw.css': {
      content: dedent`
        .bg-sky-500 {
          background-color: oklch(68.5% .169 237.323);
        }

        .m-8 {
          margin: calc(0.25rem * 8);
        }

        /* ... */
      `,
    },
    ...globalConfig.files,
  },
} satisfies ProjectManifest;
