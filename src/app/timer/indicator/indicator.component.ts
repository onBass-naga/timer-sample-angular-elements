import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss']
})
export class IndicatorComponent implements OnChanges {

  indicators = [false, false, false, false, false, false];

  @Input() count = 0;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes.count;
    this.updateIndicator(change.currentValue);
  }

  updateIndicator(count: number): void {

    if (count > 5) {
      return;
    }

    const base = [true, true, true, true, true, true];
    this.indicators = base.fill(false, 5 - count + 1);
  }
}
