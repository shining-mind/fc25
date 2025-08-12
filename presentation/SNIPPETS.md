# Сниппеты кода для презентации

## 02. Что такое веб-компоненты?

### Custom Elements

```typescript
class MyElement extends HTMLElement {
  static observedAttributes = 'size';

  connectedCallback() {}

  disconnectedCallback() {}

  attributeChangedCallback(name, prev, curr) {}
}

customElements.define('my-element', MyElement);
```

```js
// JavaScript
const el = document.createElement('my-element');
el.setAttribute('size', '1');

document.body.appendChild(el);
```

```html
<!-- html -->
<body>
  <my-element size="1"><my-element>
</body>
```

### HTML Templates

```html
<div>
  <template shadowrootmode="open">
    <p>Абзац «скрыт» внутри Shadow DOM</p>
    <slot></slot>
  </template>

  <p>Абзац находится в Light DOM</p>
</div>
```

## 03. Миграция на Lit

### Инкапсуляция содержимого

```html
<body>
  <style>
    p {
      color: var(--yellow);
    }
  </style>

  <template shadowrootmode="open">
    <p>Абзац «скрыт» внутри Shadow DOM</p>
    <slot></slot>
  </template>

  <p>Абзац находится в Light DOM</p>
</body>
```

```html
<div id="host">
  <template shadowrootmode="open">
    <p></p>
  </template>
</div>

<script>
  document.querySelectorAll('p').length; // 0

  const root = window.host.shadowRoot;
  root.querySelectorAll('p').length; // 1
</script>
```

### Атрибут part, слоты и CSS vars

```html
<body>
  <script type="module" src="./acme-button.js"></script>
  <acme-button>Кнопка</acme-button>
</body>
```

```ts
/**
 * @csspart button - тело кнопки
 * @cssprop [--color] - цвет текста
 * @cssprop [--bg-color] - цвет фона
 */
@customElement('acme-button')
class AcmeButton extends LitElement {
  protected override render() {
    return html`<button part="button">
      <slot name="icon"></slot>
      <slot></slot>
    </button>`;
  }
}
```

### Специальные селекторы

```html
<body>
  <style>
    acme-button::part(button) {
      box-shadow: 4px 4px 4px var(--yellow);
    }
  </style>
  <acme-button> Кнопка </acme-button>
</body>
```

```html
<body>
  <style>
    acme-button::part(button) {
      box-shadow: 4px 4px 4px var(--yellow);
    }
  </style>
  <acme-button>
    <span slot="icon">⭐</span>
    Кнопка
  </acme-button>
</body>
```

```css
::slotted([slot='icon']) {
  margin-right: 1rem;
}
```

### Пишем селекторы по новому

```css
:host([variant='alt']) {
  --color: #000;
  --bg-color: #fff;
}
```

```html
<body>
  <acme-button>Кнопка</acme-button>
</body>
```

```html
<body>
  <acme-button variant="alt">Кнопка</acme-button>
</body>
```

### Чрезмерная изоляция

```html
<body>
  <input type="checkbox" id="checkbox1" />
  <label for="checkbox1">Чекбокс 1</label>
  <div>
    <template shadowrootmode="open">
      <input type="checkbox" id="checkbox2" />
      <slot></slot>
    </template>
    <label for="checkbox2">Чекбокс 2</label>
  </div>
</body>
```

### Глобальные стили не работают

```html
<!doctype html>
<head>
  <link rel="stylesheet" href="./tw.css" />
</head>
<body>
  <template shadowrootmode="open">
    <div class="bg-sky-500 m-8">Hello, world</div>
  </template>
</body>
```

```ts
import sheet from './tw.css' with { type: 'css' };

const root = document.body.shadowRoot;
/* Поддержка с Safari 16.4 */
root.adoptedStyleSheets = [sheet];
```

```html
<!doctype html>
<head>
  <link rel="stylesheet" href="./tw.css" />
</head>
<body>
  <template shadowrootmode="open">
    <div class="bg-sky-500 m-8">Hello, world</div>
  </template>
  <script type="module" src="./index.js"></script>
</body>
```

## 04. Экосистема Lit

### Управление состоянием

```typescript
class StoreController implements ReactiveController {
  /* ... */
  hostConnected(): void {
    this.onNewState(this.store.getState());
    this.storeUnsubscribe = store.subscribe(() => this.host.requestUpdate());
  }

  hostDisconnected(): void {
    this.storeUnsubscribe();
  }
}
```

```typescript
class UserProfile extends LitElement {
  private profileStore = new StoreController(
    this,
    { context: userStoreContext },
    (state) => state.profile,
  );

  render() {
    return html`<p>User name: ${this.profileStore.value.name}</p>`;
  }
}
```

### Управления запросами

```typescript
class MyComponent extends LitElement {
  private query = new LitQuery(this, () => ({
    queryKey: ['todos'],
    queryFn: () => fetchTodos(),
  }));

  render() {
    return this.query.render({
      pending: () => html`Loading...`,
      error: (error) => html`Error: ${error.message}`,
      success: (data) => html`Data: ${data}`,
    });
  }
}
```

### Директивы

```typescript
async function asyncData() {
  await sleep(1000);

  return 'Data';
}

class MyComponent extends LitElement {
  render() {
    return html`
      <input
        .value=${until(asyncData(), 'Loading...')}
      ></input>
      <!-- ... -->
    `;
  }
}
```
