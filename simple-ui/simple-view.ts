type EventHandler = { selector: string; methodName: string };

export function bindEvent(event: string, selector: string) {
  return function (target: any, methodName: string) {
    target._eventHandlers = target._eventHandlers || {};
    target._eventHandlers[event] = target._eventHandlers[event] || [];
    target._eventHandlers[event].push({ selector, methodName });
  };
}

export function bindElement(selector: string) {
  return function (target: any, propertyKey: string) {
    const getter = function () {
      return this.$dom.querySelector(selector);
    };
    Object.defineProperty(target, propertyKey, { get: getter });
  };
}

export abstract class SimpleView<L> {
  private $dom: HTMLElement;
  private _eventHandlers: { [key: string]: EventHandler[] };
  protected listener: L;

  protected abstract html(): string;

  public render(elementName: string): void {
    this.$dom = document.createElement(elementName);
    this.$dom.innerHTML = this.html();
    this.registerEventHandlers();
  }

  public setListener(listener: L): void {
    this.listener = listener;
  }

  private registerEventHandlers(): void {
    Object.keys(this._eventHandlers).forEach((eventName) => {
      const handlers = this._eventHandlers[eventName];
      this.$dom.addEventListener(eventName, (event: Event) => {
        const $target = event.target as HTMLElement;
        const handler = handlers.find((handler) => $target.closest(handler.selector));
        handler && this[handler.methodName](event);
      });
    });
  }

  public attach($el: HTMLElement, replace: boolean = false): void {
    if (replace) {
      $el.parentElement.replaceChild(this.$dom, $el);
    } else {
      $el.appendChild(this.$dom);
    }
  }

  public detach(): void {
    this.$dom.parentElement.removeChild(this.$dom);
  }
}
