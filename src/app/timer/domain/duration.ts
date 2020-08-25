import {Frame} from './frame';
import {Units} from './unit';
import Decimal from 'decimal.js-light';

export class Duration {
  private constructor(
    private readonly frame: Frame
  ) {
  }

  get milliseconds(): Decimal {
    return new Decimal(this.frame.value * 1000).dividedBy(60);
  }

  get seconds(): Decimal {
    return new Decimal(this.frame.value).dividedBy(60);
  }

  static of(value: number, unit: Units): Duration {
    return new Duration(Frame.of(value, unit));
  }
}
