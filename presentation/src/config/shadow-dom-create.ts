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
            <div id="host"></div>
            <script type="module" src="./index.js"></script>
          </body>
        `,
    },
    'index.ts': {
      content: dedent`
        const host = document.getElementById('host');
        const shadow = host.attachShadow({ mode: 'open' });
        const span = document.createElement('span');
        span.textContent = 'Я внутри Shadow DOM';
        shadow.appendChild(span);
      `,
    },
    ...globalConfig.files,
  },
} satisfies ProjectManifest;
