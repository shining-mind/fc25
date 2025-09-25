# FC25 | Веб-компоненты — да это ж круто!

## Полезные ссылки

- [Документация Lit](https://lit.dev/docs/)
- [Веб-компоненты (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
- [Как работает рендер в Lit [deep dive]](https://github.com/lit/lit/blob/main/dev-docs/design/how-lit-html-works.md)

Developer Experience:

- [Открытый консорциум по веб-компонентам](https://open-wc.org/).
  Тут можно найти множество полезных рекомендаций, библиотек и инструментов, начиная от плагинов для IDE, заканчивая инструментами для тестирования веб-компонентов.
- [VSCode плагин для Lit](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin)
- [Манифест для веб-компонентов для поддержки в IDE](https://custom-elements-manifest.open-wc.org/blog/intro/)

UI-kit, разработанные на Lit:

- [Material 3](https://github.com/material-components/material-web)
- [Adobe Spectrum](https://github.com/adobe/spectrum-web-components)
- [Carbon (IBM)](https://github.com/carbon-design-system/carbon)
- [Red Hat's Design System](https://github.com/RedHat-UX/red-hat-design-system)

Shadow DOM:

- [Документация](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
- [Декларативный Shadow DOM](https://web.dev/articles/declarative-shadow-dom)
- [Form Associated Custom Elements - как подружить кастомные элементы с формами](https://webkit.org/blog/13711/elementinternals-and-form-associated-custom-elements/).
  Можно посмотреть [реализацию в Material 3](https://github.com/material-components/material-web/blob/cd7512ff90cf25ad98c6caa9842bf86d284146c7/labs/behaviors/form-associated.ts#L204).
- [Вебвизор не работает с Shadow DOM](https://yandex.ru/support/metrica/ru/webvisor/requirements)

Поддержка веб-компонентов в фреймворках:

- [Сравнение всех фреймворков](https://custom-elements-everywhere.com/). **Обязательно посмотрите, если планируете разрабатывать универсальный ui-kit!**
- [React](https://react.dev/reference/react-dom/components#custom-html-elements)
- [Vue](https://vuejs.org/guide/extras/web-components.html)
- [Angular](https://angular.dev/guide/elements)

Статистика:

- [State of HTML 2024, Web Components](https://2024.stateofhtml.com/en-US/features/web_components/)
- [Web Almanac 2024, Custom Elements](https://almanac.httparchive.org/en/2024/markup#custom-elements)
- [Chrome page loads, CustomElementRegistryDefine](https://chromestatus.com/metrics/feature/timeline/popularity/1689)

Полезные веб-компоненты:

- [Компонент для просмотра 3D моделей &lt;model-viewer&gt;](https://modelviewer.dev/)

Иное:

- История развития веб-компонентов [[1]](https://dev.to/besworks/the-past-present-and-future-of-web-components-2g43), [[2]](https://dev.to/coderpad/web-components-101-history-2p24)
- Как ESM влияет на тришейкинг [[1]](https://rollupjs.org/faqs/#why-are-es-modules-better-than-commonjs-modules), [[2]](https://web.dev/articles/reduce-javascript-payloads-with-tree-shaking?hl=ru#keeping_babel_from_transpiling_es6_modules_to_commonjs_modules)

## Примеры из доклада

Перед началом выполнить: `yarn`

- Live примеры: `yarn presentation`
- Статичные примеры с пояснениями: `yarn examples`
