import { html, type LitElement, type TemplateResult } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { Fc25Accordion } from './fc25-accordion.js';

import './fc25-accordion.js';
import './fc25-accordion-item.js';

type ArgTypes = Omit<Fc25Accordion, keyof LitElement> & {
  items: Array<{
    label: string;
    content: string | TemplateResult;
    expanded?: boolean;
    itemId?: string;
  }>;
};

type Story = StoryObj<ArgTypes>;

const meta: Meta<ArgTypes> = {
  title: 'Accordion',
  component: 'fc25-accordion',
  render: ({ multiple, items }: ArgTypes) => html`
    <fc25-accordion ?multiple=${multiple}>
      ${items.map(
        (item) => html`
          <fc25-accordion-item
            label=${item.label}
            ?expanded=${item.expanded === true}
          >
            ${item.content}
          </fc25-accordion-item>
        `,
      )}
    </fc25-accordion>
  `,
};

export default meta;

export const SingleItem: Story = {
  args: {
    items: [
      {
        label: 'Единственный элемент',
        content:
          'Это содержимое единственного элемента аккордеона. Здесь может быть любой контент.',
      },
    ],
  },
};

export const LongContent: Story = {
  args: {
    items: [
      {
        label: 'Элемент с длинным содержимым',
        content: html`
          <p>Это очень длинное содержимое элемента аккордеона.</p>
          <p>
            Здесь может быть несколько абзацев текста, списки, ссылки и другие
            HTML элементы.
          </p>
          <ul>
            <li>Первый пункт списка</li>
            <li>Второй пункт списка</li>
            <li>Третий пункт списка</li>
          </ul>
          <p>
            А также дополнительная информация, которая помогает пользователю
            лучше понять содержимое.
          </p>
        `,
      },
      {
        label: 'Обычный элемент',
        content: 'Обычное короткое содержимое.',
      },
    ],
  },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    items: Array.from({ length: 8 }, (_, index) => ({
      label: `Элемент ${index + 1}`,
      content: `Содержимое элемента ${index + 1}. Здесь может быть любая информация.`,
    })),
  },
};
