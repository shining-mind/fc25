import { html, type LitElement, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { Fc25AccordionItem } from './fc25-accordion-item.js';

import './fc25-accordion-item.js';

type ArgTypes = Omit<Fc25AccordionItem, keyof LitElement> &
  Record<`--${string}`, string> & {
    content: string | TemplateResult;
  };

type Story = StoryObj<ArgTypes>;

const meta: Meta<ArgTypes> = {
  title: 'Accordion/Accordion Item',
  component: 'fc25-accordion-item',
  render: ({ label, content, ...rest }: ArgTypes) => html`
    <fc25-accordion-item
      label=${label}
      style=${styleMap(
        Object.fromEntries(
          Object.entries(rest).filter(([key]) => key.startsWith('--')),
        ),
      )}
      >${content}</fc25-accordion-item
    >
  `,
  argTypes: {
    '--accordion-background-color': {
      control: 'color',
    },
    '--accordion-content-color': {
      control: 'color',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: 'Заголовок',
    content: html`
      <p>Это очень длинное содержимое элемента аккордеона.</p>
      <p>
        Здесь может быть несколько абзацев текста, списки, ссылки и другие HTML
        элементы.
      </p>
      <ul>
        <li>Первый пункт списка</li>
        <li>Второй пункт списка</li>
        <li>Третий пункт списка</li>
      </ul>
      <p>
        А также дополнительная информация, которая помогает пользователю лучше
        понять содержимое.
      </p>
    `,
  },
};

export const CustomLabelSlot: Story = {
  render: ({ content, label }) => html`
    <fc25-accordion-item>
      <strong slot="label">${label}</strong>
      ${content}
    </fc25-accordion-item>
  `,
  args: {
    label: 'Жирный заголовок',
    content: 'Это очень длинное содержимое элемента аккордеона.',
  },
};

export const CustomIconSlot: Story = {
  render: ({ content, label }) => html`
    <fc25-accordion-item label=${label}>
      ${content}
      <span slot="icon">⤴</span>
    </fc25-accordion-item>
  `,
  args: {
    label: 'Заголовок',
    content: 'Это очень длинное содержимое элемента аккордеона.',
  },
};
