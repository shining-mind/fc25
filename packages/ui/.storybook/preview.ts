import {
  type Preview,
  setCustomElementsManifest,
} from '@storybook/web-components';

import customElements from '../custom-elements.json' with { type: 'json' };

protectMultipleWcRegistration();
setCustomElementsManifest(customElements);

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;

/**
 * Овверайд define на случай если сторибук пытается
 * зарегистрировать компонент дважды
 */
export function protectMultipleWcRegistration() {
  const originalDefine = globalThis.customElements.define.bind(
    globalThis.customElements,
  );

  globalThis.customElements.define = (name, constructor, options) => {
    if (globalThis.customElements.get(name)) {
      return;
    }

    originalDefine(name, constructor, options);
  };
}
