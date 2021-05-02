import { SimpleView } from './simple-view';

export class SimpleComponent<T extends SimpleView<any>> {
  private readonly _view: T;

  get view(): T {
    return this._view;
  }

  constructor(elementName: string, view: { new (...args: any[]): T }) {
    this._view = new view();
    this._view.render(elementName);
    this._view.setListener(this);
  }

  public attach($el: HTMLElement, replace: boolean = false): void {
    this.beforeAttach();
    this._view.attach($el, replace);
    this.attached();
  }

  public detach(): void {
    this.beforeDetach();
    this._view.detach();
    this.onDetached();
  }

  public destroy(): void {
    this.detach();
    this.destroyed();
  }

  protected destroyed(): void {}

  protected beforeAttach(): void {}

  protected attached(): void {}

  protected beforeDetach(): void {}

  protected onDetached(): void {}
}
