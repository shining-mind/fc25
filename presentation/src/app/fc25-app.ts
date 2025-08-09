import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@lit-labs/router';

import 'playground-elements';
import '../components/drawing-overlay.js';

import type { ProjectManifest } from '../config/interface.ts';
import type { DrawingElement } from '../components/drawing-overlay.js';

// Examples
import shadowDomStylesEncapsulation from '../config/shadow-dom-styles-encapsulation.ts';
import shadowDomStyling, {
  drawHistory as shadowDomStylingDrawHistory,
} from '../config/shadow-dom-styling.ts';

// Styles
import theme from '../styles/theme-vscode.css?inline';

const examples: Record<string, ProjectManifest> = {
  'shadow-dom-encapsulation': shadowDomStylesEncapsulation,
  'shadow-dom-styling': shadowDomStyling,
};

@customElement('fc25-app')
export class FC25App extends LitElement {
  static override styles = [
    css`
      :host {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
      }

      ul {
        list-style: square;
        color: var(--yellow);
        font-size: 2rem;
      }

      a {
        color: var(--yellow);
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      playground-ide {
        box-sizing: border-box;
        --playground-preview-width: 40%;
        --playground-code-font-family: 'JetBrains Mono', monospace;
        --playground-code-font-size: 2rem;
        --playground-code-line-padding: 0 1rem;
        border-bottom: var(--playground-border);
        width: 100%;
        height: 100%;
      }

      playground-ide::part(preview) {
        background-color: rgb(27, 27, 27);
      }
    `,
    unsafeCSS(theme),
  ];

  private routes = new Router(this, [
    { path: '/', render: () => this.renderMenu() },
    {
      path: '/:example',
      render: ({ example }) => this.renderExample(example!),
    },
  ]);

  override render() {
    this.routes.routes;
    return this.routes.outlet();
  }

  renderMenu() {
    return html`<ul>
      <li><a href="/shadow-dom-encapsulation">Инкапсуляция Shadow DOM</a></li>
      <li><a href="/shadow-dom-styling">Стилизация Shadow DOM</a></li>
    </ul>`;
  }

  renderExample(example: string) {
    return html`
      <playground-ide
        editable-file-system
        resizable
        .config=${examples[example]}
      >
      </playground-ide>

      <drawing-overlay
        .initialHistory=${shadowDomStylingDrawHistory as DrawingElement[][]}
        initialHistoryIndex="0"
      ></drawing-overlay>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fc25-app': FC25App;
  }
}
