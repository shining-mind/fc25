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
