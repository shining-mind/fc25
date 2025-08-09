import { LitElement, svg, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';

interface Point {
  x: number;
  y: number;
}

export interface DrawingElement {
  id: string;
  start: Point;
  end: Point;
  type: 'line' | 'arrow';
}

@customElement('drawing-overlay')
export class DrawingOverlay extends LitElement {
  @property({ type: Boolean })
  disabled = false;

  @property({ type: Array })
  initialHistory: DrawingElement[][] = [];

  @property({ type: Number })
  initialHistoryIndex?: number;

  @state()
  private elements: DrawingElement[] = [];

  @state()
  private elementsHistory: DrawingElement[][] = [[]];

  @state()
  private historyIndex = 0;

  @state()
  private pendingStart: Point | null = null;

  @state()
  private isDrawingMode = false;

  static override styles = css`
    :host {
      --draw-color: rgb(231, 17, 37);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1000;
    }

    :host(.active) {
      pointer-events: auto;
    }

    :host([disabled]) {
      display: none;
    }

    svg {
      width: 100%;
      height: 100%;
    }

    .arrow-line {
      stroke: var(--draw-color);
      stroke-width: 6;
      fill: none;
      marker-end: url(#arrowhead);
    }

    .simple-line {
      stroke: var(--draw-color);
      stroke-width: 6;
      fill: none;
    }

    .arrow-marker {
      fill: var(--draw-color);
    }

    .pending-point {
      fill: var(--draw-color);
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    this.addEventListener('click', this.handleClick);
    this.addEventListener('contextmenu', this.handleRightClick);

    // Загружаем начальную историю если она задана
    if (this.initialHistory.length > 0) {
      this.loadHistory(this.initialHistory);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('contextmenu', this.handleRightClick);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;

    if (
      (event.metaKey || event.ctrlKey) &&
      event.shiftKey &&
      event.key.toLowerCase() === 'z'
    ) {
      // Cmd/Ctrl + Shift + Z - redo
      event.preventDefault();
      this.redo();
      return;
    }

    if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
      // Cmd/Ctrl + Z - undo
      event.preventDefault();
      this.undo();
      return;
    }

    if (
      (event.metaKey || event.ctrlKey) &&
      event.shiftKey &&
      event.key.toLowerCase() === 'x'
    ) {
      // Cmd/Ctrl + Shift + X - clear all
      event.preventDefault();
      this.clearAll();
      return;
    }

    if (event.metaKey || event.ctrlKey) {
      this.isDrawingMode = true;
      this.classList.add('active');
    }
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    if (this.disabled) return;

    if (!event.metaKey && !event.ctrlKey) {
      this.isDrawingMode = false;
      this.pendingStart = null;
      this.classList.remove('active');
    }
  };

  private handleClick = (event: MouseEvent) => {
    if (this.disabled || !this.isDrawingMode) return;

    event.preventDefault();
    event.stopPropagation();

    const rect = this.getBoundingClientRect();
    const point: Point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    // Левый клик - линия
    this.handleDrawing(point, 'line');
  };

  private handleRightClick = (event: MouseEvent) => {
    if (this.disabled || !this.isDrawingMode) return;

    event.preventDefault();
    event.stopPropagation();

    const rect = this.getBoundingClientRect();
    const point: Point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    // Правый клик - стрелка
    this.handleDrawing(point, 'arrow');
  };

  private handleDrawing(point: Point, type: 'line' | 'arrow') {
    if (this.pendingStart === null) {
      // Первый клик - устанавливаем начальную точку
      this.pendingStart = point;
    } else {
      // Второй клик - создаем элемент
      this.addElement(this.pendingStart, point, type);
      this.pendingStart = null;
    }
  }

  private addElement(start: Point, end: Point, type: 'line' | 'arrow') {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length < 10) return; // Слишком короткий элемент

    const element: DrawingElement = {
      id: `${type}-${Date.now()}-${Math.random()}`,
      start,
      end,
      type,
    };

    const newElements = [...this.elements, element];
    this.elements = newElements;
    this.saveToHistory(newElements);
  }

  private saveToHistory(elements: DrawingElement[]) {
    // Удаляем все состояния после текущего индекса (для случая когда делали undo, а потом новое действие)
    this.elementsHistory = this.elementsHistory.slice(0, this.historyIndex + 1);

    // Добавляем новое состояние
    this.elementsHistory.push([...elements]);
    this.historyIndex = this.elementsHistory.length - 1;

    // Ограничиваем историю (например, 50 действий)
    if (this.elementsHistory.length > 50) {
      this.elementsHistory = this.elementsHistory.slice(-50);
      this.historyIndex = this.elementsHistory.length - 1;
    }
  }

  private undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.elements = [...this.elementsHistory[this.historyIndex]];
      this.pendingStart = null;
    }
  }

  private redo() {
    if (this.historyIndex < this.elementsHistory.length - 1) {
      this.historyIndex++;
      this.elements = [...this.elementsHistory[this.historyIndex]];
      this.pendingStart = null;
    }
  }

  public clearAll() {
    this.elements = [];
    this.elementsHistory = [[]];
    this.historyIndex = 0;
    this.pendingStart = null;
  }

  public getElements(): DrawingElement[] {
    return [...this.elements];
  }

  public getHistory(): DrawingElement[][] {
    return [...this.elementsHistory];
  }

  public loadHistory(history: DrawingElement[][]) {
    this.elementsHistory = history.map((state) => [...state]);
    this.historyIndex =
      this.initialHistoryIndex ?? this.elementsHistory.length - 1;
    this.elements =
      this.historyIndex >= 0
        ? [...this.elementsHistory[this.historyIndex]]
        : [];
    this.pendingStart = null;
  }

  public exportState(): string {
    return JSON.stringify({
      elements: this.elements,
      history: this.elementsHistory,
      historyIndex: this.historyIndex,
    });
  }

  public importState(jsonState: string) {
    try {
      const state = JSON.parse(jsonState);
      this.elements = state.elements || [];
      this.elementsHistory = state.history || [[]];
      this.historyIndex = state.historyIndex || 0;
      this.pendingStart = null;
    } catch (error) {
      console.error('Failed to import state:', error);
    }
  }

  private renderElement(element: DrawingElement) {
    const className = element.type === 'arrow' ? 'arrow-line' : 'simple-line';

    return svg`
      <line
        class="${className}"
        stroke-linecap="round"
        x1="${element.start.x}"
        y1="${element.start.y}"
        x2="${element.end.x}"
        y2="${element.end.y}"
      />
    `;
  }

  override render() {
    return svg`
      <svg>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="3.5"
            orient="auto"
          >
            <polygon class="arrow-marker" points="0 0, 7 3.5, 0 7" />
          </marker>
        </defs>

        ${this.elements.map((element) => this.renderElement(element))}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'drawing-overlay': DrawingOverlay;
  }
}
