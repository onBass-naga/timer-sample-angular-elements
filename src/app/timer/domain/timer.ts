import {Duration} from './duration';

type BeepFn = () => void;
type DateFactoryFn = () => Date;

export class Timer {

  needAlarm = false;
  alarmed = false;
  timeScheduled: Date;

  constructor(
    private dateFactoryFn: DateFactoryFn,
    private duration: Duration
  ) {
    this.needAlarm = this.duration.seconds.greaterThanOrEqualTo(90);
    const now = this.dateFactoryFn();
    this.timeScheduled = new Date(now.getTime() + this.duration.milliseconds.toNumber());
  }

  get countSec(): number {
    const now = this.dateFactoryFn();
    const timeMSec = this.timeScheduled.getTime() - now.getTime();
    return timeMSec > 0 ? Math.ceil(timeMSec / 1000) : 0;
  }

  get durationBeforeCountMSec(): number {
    return this.duration.milliseconds.modulo(1000).toNumber();
  }

  beepIfNeed(countdownBeepFn: BeepFn, doneBeepFn: BeepFn, reminderBeepFn: BeepFn): void {

    if (this.countSec === 0) {
      doneBeepFn();
      return;
    }

    if (0 < this.countSec && this.countSec <= 3) {
      countdownBeepFn();
      return;
    }

    if (this.needAlarm && !this.alarmed && this.countSec <= 45) {
      this.alarmed = true;
      reminderBeepFn();
    }
  }
}
