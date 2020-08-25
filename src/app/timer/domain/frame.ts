import {Units} from './unit';

export class Frame {
  private constructor(
    readonly value: number
  ) {
  }

  static of(value: number, unit: Units): Frame {
    const times = unit === Units.Hour ? 60 * 60 * 60
      : unit === Units.Minute ? 60 * 60
        : unit === Units.Second ? 60 : 1;
    return new Frame(value * times);
  }
}
