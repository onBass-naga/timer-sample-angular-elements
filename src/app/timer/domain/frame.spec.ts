import {Frame} from './frame';
import {Units} from './unit';

describe('Frame', () => {
  describe('任意の単位を指定してインスタンス生成できる', () => {
    it('フレーム指定でインスタンス生成できる', () => {
      const actual = Frame.of(12, Units.Frame).value;
      expect(actual).toBe(12);
    });

    it('秒指定でインスタンス生成できる', () => {
      const actual = Frame.of(2, Units.Second).value;
      expect(actual).toBe(120);
    });

    it('分指定でインスタンス生成できる', () => {
      const actual = Frame.of(2.5, Units.Minute).value;
      expect(actual).toBe(9000);
    });


    it('時間指定でインスタンス生成できる', () => {
      const actual = Frame.of(2.5, Units.Hour).value;
      expect(actual).toBe(540000);
    });
  });
});
