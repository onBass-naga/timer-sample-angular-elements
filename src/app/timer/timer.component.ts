import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {beep1, beep2, beep3} from './audio/beep';
import {Units} from './domain/unit';
import {Duration} from './domain/duration';
import {Timer} from './domain/timer';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

  @ViewChild('startButton')
  public startButtonElement;

  UnitOptions = Units.Options;
  UnitFrameValue = Units.Frame.value;

  soundOnControl = new FormControl(true);

  form = this.fb.group({
    duration: [0, [Validators.required, Validators.min(1)]],
    unit: [Units.Second.value],
    soundControl: this.soundOnControl,
  });

  duration: Duration | undefined;
  timer: Timer | undefined;

  countSec = 0;
  nowCounting = false;
  timerInterval = -1;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  get durationInputValue(): number {
    const value = this.form.get('duration').value;
    return parseInt(value, 10);
  }

  get selectedUnitValue(): number {
    const value = this.form.get('unit').value;
    return parseInt(value, 10);
  }

  get soundOn(): boolean {
    return this.soundOnControl.value;
  }

  ngOnInit(): void {
    this.form.get('duration').valueChanges.subscribe(value => {
      this.duration = Duration.of(value, Units.of(this.selectedUnitValue));
      this.initializeCountSec();
    });
    this.form.get('unit').valueChanges.subscribe(() => {
      this.duration = Duration.of(this.durationInputValue, Units.of(this.selectedUnitValue));
      this.initializeCountSec();
    });

    fromEvent(document, 'keydown')
      .subscribe((e: KeyboardEvent) => {
        if (e.code === 'Space' && !this.nowCounting) {
          this.startButtonElement.nativeElement.click();
        }
      });
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  initializeCountSec(): void {
    this.countSec = Math.floor(this.duration.seconds.toNumber());
  }

  startCountdown(): void {

    this.initializeCountSec();
    this.timer = new Timer(() => new Date(), this.duration, this.soundOn);

    setTimeout(() => {
      this.timerInterval = setInterval(() => {
        this.updateCountSec();
        this.stopCountIfEnded();
      }, 1000);
    }, this.timer.durationBeforeCountMSec);

    if (this.soundOn) {
      beep1();
    }
    this.nowCounting = true;
  }

  updateCountSec(): void {
    this.timer.beepIfNeed(beep1, beep2, beep3);
    this.countSec = this.timer.countSec;
  }

  stopCountIfEnded(): void {
    if (this.countSec === 0) {
      setTimeout(() => this.pause(), 1500);
    }
  }

  pause(): void {
    clearInterval(this.timerInterval);
    this.nowCounting = false;
  }

}
