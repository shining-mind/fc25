import { html, LitElement } from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';

import { createStyleSheet } from '../../utils/create-style-sheet.js';
import type { Fc25AccordionItem } from './fc25-accordion-item.js';

import { normalizeStylesheet } from '../../styles/normalize/index.js';
import css from './fc25-accordion.scss?inline';

/**
 * Компонент аккордеона для отображения сворачиваемого контента с возможностью раскрытия и сворачивания элементов.
 *
 * Поддерживает как одиночное, так и множественное раскрытие элементов.
 *
 * @cssprop [--accordion-background-color] - цвет фона аккордеона
 *
 * @example
 * ```html
 * <fc25-accordion>
 *   <fc25-accordion-item label="Первый элемент">
 *     Содержимое первого элемента
 *   </fc25-accordion-item>
 * </fc25-accordion>
 * ```
 *
 * @example Множественное раскрытие
 * ```html
 * <fc25-accordion multiple>
 *   <fc25-accordion-item label="Элемент 1">Содержимое 1</fc25-accordion-item>
 *   <fc25-accordion-item label="Элемент 2">Содержимое 2</fc25-accordion-item>
 * </fc25-accordion>
 * ```
 */
@customElement('fc25-accordion')
export class Fc25Accordion extends LitElement {
  static override styles = [normalizeStylesheet, createStyleSheet(css)];

  /**
   * Разрешить раскрытие нескольких элементов одновременно
   */
  @property({ type: Boolean })
  multiple = false;

  @queryAssignedElements({ selector: 'fc25-accordion-item' })
  private readonly items?: Fc25AccordionItem[];

  constructor() {
    super();
    this.addEventListener(
      'accordion-item-toggle',
      this.handleItemToggle as EventListener,
    );
  }

  protected override render() {
    return html`<slot></slot>`;
  }

  private readonly handleItemToggle = (event: CustomEvent) => {
    const item = event.target as Fc25AccordionItem;
    event.stopPropagation();

    if (!this.multiple && item.hasAttribute('expanded')) {
      this.items?.forEach((prev) => {
        if (prev.hasAttribute('expanded') && prev !== item) {
          prev.removeAttribute('expanded');
        }
      });
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'fc25-accordion': Fc25Accordion;
  }
}
