import dedent from 'dedent';
import type { ProjectManifest } from './interface.ts';
import { globalConfig, globalHead } from './_global.ts';

export default {
  files: {
    'index.html': {
      content:
        globalHead(`
          <link rel="stylesheet" href="./styles.css" />
        `) +
        dedent`
        <body>
          <!-- playground-hide -->
          <style>
            label {
              user-select: none;
            }
          </style>
          <!-- playground-hide-end -->
          <input type="checkbox" id="checkbox1" />
          <label for="checkbox1">Чекбокс 1</label>
          <div>
            <template shadowrootmode="open">
              <!-- playground-hide -->
              <link rel="stylesheet" href="./styles.css" />
              <!-- playground-hide-end -->
              <input type="checkbox" id="checkbox2" />
              <slot></slot>
            </template>
            <label for="checkbox2">Чекбокс 2</label>
          </div>
        </body>
      `,
    },
    'styles.css': {
      content: dedent`
        input[type="checkbox"] {
          width: 1.5rem;
          height: 1.5rem;
        }
      `,
    },
    ...globalConfig.files,
  },
} satisfies ProjectManifest;
