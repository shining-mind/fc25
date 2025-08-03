import dedent from 'dedent';
import type { ProjectManifest } from './interface.ts';
import { globalConfig, globalHead } from './_global.ts';

export default {
  files: {
    'index.html': {
      content:
        globalHead +
        dedent`
        <body>
          <style>
            p {
              color: rgb(247, 214, 83); 
            }
          </style>
          <!-- playground-fold -->
          <template shadowrootmode="open">
            <p>Абзац "скрыт" внутри Shadow DOM</p>
            <slot></slot>
          </template>
          <p>Абзац находится в Light DOM</p>
          <!-- playground-fold-end -->
        </body>
      `,
    },
    ...globalConfig.files,
  },
} satisfies ProjectManifest;
