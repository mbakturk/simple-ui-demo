import { SimpleComponent } from '../simple-ui/simple-component';
import { ButtonType, CounterView, CounterViewListener } from './counter.view';

export class CounterComponent extends SimpleComponent<CounterView> implements CounterViewListener {
  private counters = {
    'Counter - 1': 0,
    'Counter - 2': 0,
    'Counter - 3': 0,
  };

  private currentCounter: string = 'Counter - 1';

  constructor() {
    super('my-counter', CounterView);
  }

  protected beforeAttach(): void {
    this.view.options = Object.keys(this.counters);
    this.view.result = this.counters[this.currentCounter];
  }

  public onSelectionChanged(value: string): void {
    this.currentCounter = value;
    this.view.result = this.counters[value];
  }

  public onButtonClicked(type: ButtonType): void {
    let result = this.counters[this.currentCounter];
    result += type === ButtonType.INCREASE ? +1 : -1;
    this.view.result = this.counters[this.currentCounter] = result;
  }
}
