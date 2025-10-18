import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createStyleSheet } from 'ui/utils.js';

// Импортируем из нашего ui-kit компоненты, которые хотим использовать
import 'ui/components/fc25-accordion.js';

import { normalizeStyleSheet } from 'ui/styles/normalize.js';
import rawCss from './my-app.scss?inline';

@customElement('my-app')
export class MyApp extends LitElement {
  static override styles = [
    // Можно импортировать и подключить глобальные стили к компоненту
    normalizeStyleSheet,
    // Можно задать стили локально
    css`
      :host {
        display: block;
        margin: auto;
        width: 360px;
      }

      span[role='heading'] {
        font-size: 1.5em;
        font-weight: bold;
      }
    `,
    // Можно подключить стили из sass
    createStyleSheet(rawCss),
  ];

  render() {
    // У вас должен быть установлен lit-plugin для нормального DX при работе с веб-компонентами
    return html`
      <slot></slot>

      <!-- Через Cmd/Ctrl + Click можно перейти к исходному коду компонента -->
      <fc25-accordion>
        <!-- Наведите мышку на компонент и увидите документацию.
          Автокомплит для атрибутов тоже работает. -->
        <fc25-accordion-item expanded>
          <span role="heading" aria-level="2" slot="label">Заголовок 1</span>
          <p>Текст 1</p>
        </fc25-accordion-item>

        <fc25-accordion-item>
          <span role="heading" aria-level="2" slot="label">Заголовок 2</span>
          <p>Текст 2</p>
        </fc25-accordion-item>
      </fc25-accordion>

      <a href="https://lit.dev" target="_blank" rel="noopener noreferrer"
        >Документация Lit</a
      >
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyApp;
  }
}
