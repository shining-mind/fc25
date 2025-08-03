import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import theme from '../styles/theme-vscode.css?inline';

import 'playground-elements';
import '../components/drawing-overlay.js';

import type { DrawingElement } from '../components/drawing-overlay.js';

import shadowDomStylesEncapsulation from '../config/shadow-dom-styles-encapsulation.ts';
import shadowDomStyling, {
  drawHistory as shadowDomStylingDrawHistory,
} from '../config/shadow-dom-styling.ts';

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

      playground-ide {
        --playground-preview-width: 40%;
        --playground-code-font-family: 'JetBrains Mono', monospace;
        --playground-code-font-size: 2rem;
        --playground-code-line-padding: 0 1rem;
        width: 100%;
        height: 100%;
      }

      playground-ide::part(preview) {
        background-color: rgb(27, 27, 27);
      }
    `,
    unsafeCSS(theme),
  ];

  override render() {
    return html`
      <playground-ide
        editable-file-system
        resizable
        .config=${shadowDomStyling}
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
