
export class Units {
  static Frame = new Units(0, 'F');
  static Second = new Units(1, '秒');
  static Minute = new Units(2, '分');
  static Hour = new Units(3, '時間');
  static Options = [Units.Frame, Units.Second, Units.Minute, Units.Hour];

  private constructor(
    readonly value: number,
    readonly label: string
  ) {
  }

  static of(value: number): Units {
    const found = Units.Options.find(it => it.value === value);
    if (!found) {
      throw Error(`Not Found: ${value}`);
    }

    return found;
  }
}
