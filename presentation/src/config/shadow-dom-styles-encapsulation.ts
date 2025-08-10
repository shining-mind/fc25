import dedent from 'dedent';
import type { ProjectManifest } from './interface.ts';
import { globalConfig, globalHead } from './_global.ts';

export default {
  files: {
    'index.html': {
      content:
        globalHead(`
          <script type="module" src="./index.js"></script>
        `) +
        dedent`
        <body>
          <style>
            p { color: var(--yellow); }
          </style>

          <template shadowrootmode="open">
            <!-- playground-hide -->
            <link rel="stylesheet" href="./styles.css" />
            <span class="comments">&lt;!-- #shadow-root --&gt;</span>
            <!-- playground-hide-end -->
            <p>Абзац «скрыт» внутри Shadow DOM</p>
            <!-- playground-hide -->
            <span class="comments">&lt;slot&gt;</span>
            <!-- playground-hide-end -->
            <slot></slot>
            <!-- playground-hide -->
            <span class="comments">&lt;/slot&gt;</span>
            <!-- playground-hide-end -->
          </template>

          <p>Абзац находится в Light DOM</p>
        </body>
      `,
    },
    'styles.css': {
      content: dedent`
        :host {
          display: block;
          position: relative;
          padding: 2rem !important;
        }

        p {
          margin: 0;
        }

        .comments {
          user-select: none;
          opacity: 0;
          color: #8d8d8d;
          transition: opacity 0.3s ease-in-out;
        }

        :host, ::slotted(*) {
          border-width: 2px;
          border-style: solid;
          border-color: transparent;
          transition: border-color 0.3s ease-in-out;
        }

        ::slotted(*) {
          position: relative;
          margin: 0.25rem 4rem 0.25rem -2rem;
          padding: 2rem;
          border-left-width: 0;
        }

        ::slotted(*)::before {
          content: '';
          position: absolute;
          top: 0;
          left: -2px;
          height: 100%;
          width: 2px;
          background-color: var(--bg-color);
        }

        :host([showtime]) {
          border-color: var(--yellow);

          .comments {
            opacity: 1;
          }

          ::slotted(*) {
            border-color: var(--yellow);
          }
        }
      `,
    },
    'index.ts': {
      content: dedent`
        document.body.addEventListener('click', () => {
          document.body.toggleAttribute('showtime');
        });
      `,
    },
    ...globalConfig.files,
  },
} satisfies ProjectManifest;
