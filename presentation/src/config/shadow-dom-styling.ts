import dedent from 'dedent';
import type { ProjectManifest } from './interface.ts';
import { globalConfig, globalHead } from './_global.ts';

export default {
  files: {
    'index.html': {
      content:
        globalHead() +
        dedent`
          <body>
            <script
                type="module"
                src="./acme-button.js"
            ></script>
            <style></style>
            <acme-button>
              Кнопка
            </acme-button>
          </body>
        `,
    },
    'acme-button.ts': {
      content: dedent`
        /* playground-hide */
        import { LitElement, html } from 'lit';
        import { customElement } from 'lit/decorators.js';
        import sheet from './acme-button.css' with { type: 'css' };
        /* playground-hide-end */
        /**
         * @csspart button - тело кнопки
         * @cssprop [--color] - цвет текста
         * @cssprop [--bg-color] - цвет фона
         */
        @customElement('acme-button')
        export class AcmeButton extends LitElement {
          /* playground-hide */
          static override styles = [sheet];
          /* playground-hide-end */
          protected override render() {
            return html\`
              <button part="button">
                <slot name="icon"></slot>
                <slot></slot>
              </button>
            \`;
          }
        }
      `,
    },
    'acme-button.css': {
      content: dedent`
        /* playground-fold */
        button {
          font-size: inherit;
          font-family: inherit;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          color: var(--color, white);
          background-color: var(--bg-color, #0070f3);
        }
        /* playground-fold-end */
      `,
    },
    'examples.txt': {
      content: dedent`
        # part demo
        acme-button::part(button) {
          box-shadow: 4px 4px 4px var(--yellow);
        }

        # slot icon demo
        <span slot="icon">⭐</span> 
        ::slotted([slot="icon"]) {
          margin-right: 1rem;
        }

        # variant
        :host([variant="alt"]) {
          --color: #000;
          --bg-color: #fff;
        }
      `,
    },
    ...globalConfig.files,
  },
} satisfies ProjectManifest;
