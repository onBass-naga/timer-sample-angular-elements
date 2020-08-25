import {Units} from './unit';
import {Duration} from './duration';
import Decimal from 'decimal.js-light';

describe('Duration', () => {
  it('秒単位に変換した値を取得できる', () => {
    const actual = Duration.of(132, Units.Frame).seconds;
    expect(actual).toEqual(new Decimal(2.2));
  });

  it('ミリ秒単位に変換した値を取得できる', () => {
    const actual = Duration.of(120, Units.Frame).milliseconds;
    expect(actual).toEqual(new Decimal(2000));
  });
});
