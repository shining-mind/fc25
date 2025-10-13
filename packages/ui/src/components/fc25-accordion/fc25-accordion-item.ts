/* eslint-disable jsdoc/no-undefined-types */
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createStyleSheet } from '../../utils/create-style-sheet.js';

import { normalizeStyleSheet } from '../../styles/normalize/index.js';
import css from './fc25-accordion-item.scss?inline';

/**
 * Элемент аккордеона с возможностью раскрытия и сворачивания содержимого.
 *
 * Содержит заголовок (через атрибут label или слот) и основное содержимое.
 * При клике на заголовок переключается состояние раскрытия.
 *
 * @slot default - основное содержимое элемента аккордеона
 * @slot label - кастомный заголовок элемента (альтернатива атрибуту label)
 *
 * @fires {CustomEvent<AccordionItemToggleEvent>} accordion-item-toggle - испускается при переключении состояния
 *
 * @attr {boolean} expanded - состояние раскрытия элемента
 *
 * @cssprop [--accordion-background-color] - цвет фона элемента аккордеона
 * @cssprop [--accordion-content-color] - цвет текста содержимого элемента
 *
 * @example
 * ```html
 * <fc25-accordion-item label="Заголовок">
 *   Содержимое элемента
 * </fc25-accordion-item>
 * ```
 *
 * @example С кастомным заголовком
 * ```html
 * <fc25-accordion-item>
 *   <strong slot="label">Кастомный заголовок</strong>
 *   Содержимое элемента
 * </fc25-accordion-item>
 * ```
 *
 * @example Предварительно раскрытый
 * ```html
 * <fc25-accordion-item label="Заголовок" expanded>
 *   Этот элемент будет раскрыт по умолчанию
 * </fc25-accordion-item>
 * ```
 */
@customElement('fc25-accordion-item')
export class Fc25AccordionItem extends LitElement {
  static override styles = [normalizeStyleSheet, createStyleSheet(css)];

  /**
   * Заголовок элемента аккордеона
   */
  @property({ type: String })
  label = '';

  protected override render() {
    return html`
      <button @click=${this.handleToggle}>
        <slot name="label">${this.label}</slot>

        <span class="icon">
          <slot name="icon">${this.defaultIcon}</slot>
        </span>
      </button>

      <div class="content">
        <slot></slot>
      </div>
    `;
  }

  private get defaultIcon() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path
          fill="currentColor"
          d="m12 14.586 6.293-6.293a1 1 0 1 1 1.414 1.414l-6.646 6.647a1.5 1.5 0 0 1-2.122 0L4.293 9.707a1 1 0 0 1 1.414-1.414z"
        />
      </svg>
    `;
  }

  private readonly handleToggle = () => {
    this.toggleAttribute('expanded');

    // Рекомендуется сделать базовый класс для своих компонентов, чтобы события было испускать проще
    this.dispatchEvent(
      new CustomEvent('accordion-item-toggle', {
        composed: true,
        bubbles: true,
        cancelable: true,
      }),
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'fc25-accordion-item': Fc25AccordionItem;
  }
}
