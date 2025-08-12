import dedent from 'dedent';
import type { ProjectManifest } from './interface.ts';
import { globalConfig, globalHead } from './_global.ts';

export default {
  files: {
    'acme-app.ts': {
      content: dedent`
        /* playground-hide */
        import sheet from './acme-app.css' with { type: 'css' };
        /* playground-hide-end */
        /* playground-fold */
        import { LitElement, html } from 'lit';
        import { customElement, property } from 'lit/decorators.js';
        import { until } from 'lit/directives/until.js';

        function sleep(delay: number) {
          return new Promise((resolve) => setTimeout(resolve, delay));
        }

        async function delay(ms: number, content: string) {
          await sleep(ms);
          return content;
        }

        function now() {
          return new Date().toISOString().slice(11, -1);
        }
        /* playground-fold-end */

        @customElement('acme-app')
        export class AcmeApp extends LitElement {
          /* playground-hide */
          static styles = [sheet];
          /* playground-hide-end */
          async loadData() {
            /* playground-hide */
            setTimeout(() => {
              this.requestUpdate();
            }, 5000);
            /* playground-hide-end */
            return sleep(3000).then(() => 'Data');
          }

          render() {
            return html\`
              <p>Current Time: \${now()}</p>
              <input .value=\${until(this.loadData(), /* playground-fold */

                  delay(2500, '...'),
                  delay(2000, '..'),
                  delay(1500, '.'),
                  delay(1000, '...'),
                  /* playground-fold-end */

                  delay(500, '..'), '.')} />\`;
          }
        }
      `,
    },
    'index.html': {
      content:
        globalHead() +
        dedent`
        <body>
          <script type="module" src="./acme-app.js"></script>
          <acme-app></acme-app>
        </body>
      `,
    },
    'acme-app.css': {
      content: dedent`
        :host {
          display: block;
        }

        input {
          display: block;
          font-family: inherit;
          font-size: inherit;
          color: #fff;  
          background-color: #272727;
        }
      `,
    },
    ...globalConfig.files,
  },
} satisfies ProjectManifest;
