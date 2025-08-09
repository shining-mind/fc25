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
          <script type="module" src="./acme-button.js"></script>
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
          font-size: 2rem;
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
        ::slotted(span) {
          margin-right: 1rem;
        }

        # variant
        :host([variant="alt"]) {
          --bg-color: #272727;
        }
      `,
    },
    ...globalConfig.files,
  },
} satisfies ProjectManifest;

export const drawHistory = [
  [],
  [
    {
      id: 'line-1754252445922-0.11602419232005845',
      start: { x: 253, y: 438 },
      end: { x: 478, y: 435 },
      type: 'line',
    },
  ],
  [
    {
      id: 'line-1754252445922-0.11602419232005845',
      start: { x: 253, y: 438 },
      end: { x: 478, y: 435 },
      type: 'line',
    },
    {
      id: 'line-1754252450706-0.7063062194579336',
      start: { x: 919, y: 122 },
      end: { x: 1052, y: 121 },
      type: 'line',
    },
  ],
  [
    {
      id: 'line-1754252445922-0.11602419232005845',
      start: { x: 253, y: 438 },
      end: { x: 478, y: 435 },
      type: 'line',
    },
    {
      id: 'line-1754252450706-0.7063062194579336',
      start: { x: 919, y: 122 },
      end: { x: 1052, y: 121 },
      type: 'line',
    },
    {
      id: 'line-1754252455866-0.08868631713232167',
      start: { x: 155, y: 514 },
      end: { x: 363, y: 517 },
      type: 'line',
    },
  ],
  [
    {
      id: 'line-1754252445922-0.11602419232005845',
      start: { x: 253, y: 438 },
      end: { x: 478, y: 435 },
      type: 'line',
    },
    {
      id: 'line-1754252450706-0.7063062194579336',
      start: { x: 919, y: 122 },
      end: { x: 1052, y: 121 },
      type: 'line',
    },
    {
      id: 'line-1754252455866-0.08868631713232167',
      start: { x: 155, y: 514 },
      end: { x: 363, y: 517 },
      type: 'line',
    },
    {
      id: 'line-1754252479312-0.730919526181479',
      start: { x: 936, y: 107 },
      end: { x: 1038, y: 107 },
      type: 'line',
    },
  ],
  [
    {
      id: 'line-1754252445922-0.11602419232005845',
      start: { x: 253, y: 438 },
      end: { x: 478, y: 435 },
      type: 'line',
    },
    {
      id: 'line-1754252450706-0.7063062194579336',
      start: { x: 919, y: 122 },
      end: { x: 1052, y: 121 },
      type: 'line',
    },
    {
      id: 'line-1754252455866-0.08868631713232167',
      start: { x: 155, y: 514 },
      end: { x: 363, y: 517 },
      type: 'line',
    },
    {
      id: 'line-1754252479312-0.730919526181479',
      start: { x: 936, y: 107 },
      end: { x: 1038, y: 107 },
      type: 'line',
    },
    {
      id: 'line-1754253702757-0.722857473973564',
      start: { x: 68, y: 166 },
      end: { x: 364, y: 167 },
      type: 'line',
    },
  ],
  [
    {
      id: 'line-1754252445922-0.11602419232005845',
      start: { x: 253, y: 438 },
      end: { x: 478, y: 435 },
      type: 'line',
    },
    {
      id: 'line-1754252450706-0.7063062194579336',
      start: { x: 919, y: 122 },
      end: { x: 1052, y: 121 },
      type: 'line',
    },
    {
      id: 'line-1754252455866-0.08868631713232167',
      start: { x: 155, y: 514 },
      end: { x: 363, y: 517 },
      type: 'line',
    },
    {
      id: 'line-1754252479312-0.730919526181479',
      start: { x: 936, y: 107 },
      end: { x: 1038, y: 107 },
      type: 'line',
    },
    {
      id: 'line-1754253702757-0.722857473973564',
      start: { x: 68, y: 166 },
      end: { x: 364, y: 167 },
      type: 'line',
    },
    {
      id: 'line-1754253709658-0.1407838928541817',
      start: { x: 69, y: 207 },
      end: { x: 411, y: 206 },
      type: 'line',
    },
  ],
];
