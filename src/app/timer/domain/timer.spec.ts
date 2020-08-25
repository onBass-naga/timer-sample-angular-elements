import {Units} from './unit';
import {Duration} from './duration';
import Decimal from 'decimal.js-light';
import {Timer} from './timer';

describe('Timer', () => {
  it('終了予定時刻を算出できる', () => {
    const duration = Duration.of(132, Units.Frame);
    const dateFactoryFn = () => new Date('2021-09-01 00:00:00.000');
    const actual = new Timer(dateFactoryFn, duration).timeScheduled;
    expect(actual).toEqual(new Date('2021-09-01 00:00:02.200'));
  });

  it('カウントダウン前の間隔ミリ秒を取得できる', () => {
    const duration = Duration.of(132, Units.Frame);
    const dateFactoryFn = () => new Date('2021-09-01 00:00:00.000');
    const actual = new Timer(dateFactoryFn, duration).durationBeforeCountMSec;
    expect(actual).toEqual(200);
  });


  it('カウント表示する値が取得できる', () => {
    const spyFn = jasmine.createSpy('StubDateFactory');
    spyFn.and.returnValues(new Date('2021-09-01 00:00:00.000'),
      new Date('2021-09-01 00:00:00.501'),
      new Date('2021-09-01 00:00:01.501'),
      new Date('2021-09-01 00:00:02.501'));

    const duration = Duration.of(2.5, Units.Second);
    const timer = new Timer(spyFn, duration);
    expect(timer.countSec).toEqual(2);
    expect(timer.countSec).toEqual(1);
    expect(timer.countSec).toEqual(0);
  });
});
