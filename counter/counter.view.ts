import { bindElement, bindEvent, SimpleView } from '../simple-ui/simple-view';

export enum ButtonType {
  INCREASE = 'increase',
  DECREASE = 'decrease',
}

export interface CounterViewListener {
  onButtonClicked(type: ButtonType): void;
  onSelectionChanged(option: string): void;
}

export class CounterView extends SimpleView<CounterViewListener> {
  protected html(): string {
    //language=HTML
    return `
            <select></select>
            <button class="increase">Increase</button>
            <button class="decrease">Decrease</button>
            <span></span>    
        `;
  }

  @bindElement('span')
  private $result: HTMLSpanElement;

  @bindElement('select')
  private $select: HTMLSelectElement;

  @bindEvent('click', 'button')
  private buttonClicked(event: Event): void {
    this.listener.onButtonClicked((event.target as HTMLElement).classList[0] as ButtonType);
  }

  @bindEvent('change', 'select')
  private onSelectionChanged(event: Event): void {
    this.listener.onSelectionChanged((event.target as HTMLSelectElement).value);
  }

  set options(options: string[]) {
    this.$select.innerHTML = options.reduce((html, option) => (html += `<option value="${option}">${option}</option>`), '');
  }

  set result(result) {
    this.$result.innerText = 'Result: ' + result;
  }
}
