import { unsafeCSS } from 'lit';

/**
 * Позволяет создать CSSResult из строки CSS кода.
 * Важно: сюда можно подставлять код только из доверенных источников.
 *
 * CSSResult - это специальный класс, который либо создаст CSSStyleSheet либо
 * заинлайнит ваши стили в тег <style>.
 *
 * @param cssSource
 */
export function createStyleSheet(cssSource: string) {
  return unsafeCSS(cssSource);
}
