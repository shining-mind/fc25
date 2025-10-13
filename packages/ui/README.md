# Демо ui-kit

Пример ui-kit на Lit.

Три-шейкинг достигается за счет точно прописанных `exports` в `package.json`,
это необходимо так как компоненты в Lit имеют side-effect'ы
(регистрация в реестре кастомных элементов).

В данном случае продемонстрирована сборка на базе Vite, этому есть несколько причин:

1. Хорошая интеграция со Storybook.
2. Хороший DX и возможность подебажить компонент через `index.html`.
3. Sass работает из коробки.
4. Возможность собрать библиотеку для использования в других проектах (vite под капотом использует rollup).

**Дисклеймер**

Если вы не хотите использовать Vite, или разбираться в том как всё настроить,
то можно использовать скаффолдинг от `open-wc`.

## Основные скрипты

- `npm run dev` - запустить dev-сервер
- `npm run build` - собрать проект (генерация манифеста, проверка типов в веб-компонентах, сборка vite, генерация типов)
- `npm run storybook` - запустить storybook

## Нюансы данной сборки

- Мы используем `module = nodenext` в `tsconfig`, а значит расширения файлов должны заканчиваться на `.js`, можно включить поддержку расширений `.ts` c помощью опции `allowImportingTsExtensions`, однако это не рекомендуется делать, так как в браузере такое расширение работать не будет.
- В `tsconfig` добавлен плагин `ts-lit-plugin`, который позволяет проверить корректность типов в веб-компонентах через `lit-analyzer`.

## Как создать такой проект с нуля?

1. `npm create vite@latest ui -- --template lit-ts`
2. `npm create storybook@latest`
3. В `package.json` замените скрипты storybook:

```json
"storybook": "concurrently -kr \"cem analyze --watch\" \"storybook dev -p 6006\"",
"build-storybook": "cem analyze && storybook build",
```

4. Установить дополнительные пакеты: `npm i -D @custom-elements-manifest/analyzer sass-embedded autoprefixer glob`

```
- @custom-elements-manifest/analyzer - создает манифест веб-компонентов для улучшения DX в IDE
- sass-embedded - компилятор sass
- autoprefixer - добавляет префиксы к css
- glob - позволяет получать список файлов по шаблону, нужен для сборки
```

5. Создать файл `custom-elements-manifest.config.js` в корне:

```js
// https://custom-elements-manifest.open-wc.org/analyzer/config/#config-file

export default {
  /** Globs to include */
  globs: ['src/**/*.ts'],
  /** Globs to exclude */
  exclude: ['**/*.stories.ts'],
  /** Run in dev mode, provides extra logging */
  dev: false,
  /** Enable special handling for litelement */
  litelement: true,
};
```

6. Выполнить команду `npx cem analyze`
7. В `.storybook/preview.ts` добавить:

```ts
import {
  type Preview,
  setCustomElementsManifest,
} from '@storybook/web-components';

import customElements from '../custom-elements.json' with { type: 'json' };

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

protectMultipleWcRegistration();
setCustomElementsManifest(customElements);

const preview: Preview = {
  /* ... */
};

// ...
```

8. Настроить `vite.config.ts`, создать `tsconfig.build.json` и настроить `build` скрипт аналогично, как в этом проекте.
