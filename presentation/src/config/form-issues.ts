import dedent from 'dedent';
import type { ProjectManifest } from './interface.ts';
import { globalConfig, globalHead } from './_global.ts';

export default {
  files: {
    'index.html': {
      content:
        globalHead(dedent`
          <script type="module" src="./custom-input.js"></script>  
          <script type="module" src="./index.js"></script>  
        `) +
        dedent`
        <body>
          <template shadowrootmode="open">
            <!-- playground-hide -->
            <style>
              pre {
                min-height: 4rem;
                padding: 1rem;
                margin: 1rem 0;
                border: 1px solid var(--yellow);
                font-family: inherit;
              }

              button {
                font-family: inherit;
                font-size: inherit;
                color: #fff;
                background-color: #272727;
              }
            </style>
            <!-- playground-hide-end -->
            <form id="form">
              <custom-input name="value">
              </custom-input>
              <button type="submit">Отправить</button>
            </form>

            <pre id="output"></pre>
          </template>
        </body>
      `,
    },
    'custom-input.ts': {
      content: dedent`
        /* playground-fold */
        import { LitElement, html, css } from 'lit';
        import { customElement, property } from 'lit/decorators.js';
        import sheet from './custom-input.css' with { type: 'css' };
        /* playground-fold-end */

        @customElement('custom-input')
        export class CustomInput extends LitElement {
          static styles = [sheet];

          @property() name!: string;

          render() {
            return html\`
              <input name="\${this.name}" type="text" />
            \`;
          }
        }
      `,
    },
    'custom-input.css': {
      content: dedent`
        input {
          display: block;
          font-family: inherit;
          font-size: inherit;
          margin-bottom: 1rem;
          color: #fff;
          background-color: #272727;
        }
      `,
    },
    'index.ts': {
      content: dedent`
        const form = document.body.shadowRoot.getElementById('form');
        const output = document.body.shadowRoot.getElementById('output');
        
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const data = new FormData(
            e.target as HTMLFormElement
          );

          const result = [];
          for (const [key, value] of data) {
            result.push(\`\n\${key}: \${value}\`);
          }

          output.textContent = \`Payload size: \${result.length}\n---\${result}\`;
        });
      `,
    },
    ...globalConfig.files,
  },
} satisfies ProjectManifest;
