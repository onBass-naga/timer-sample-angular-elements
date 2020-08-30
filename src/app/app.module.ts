import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';

import {AppComponent} from './app.component';
import {TimerComponent} from './timer/timer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DecimalPipe} from './pipes/decimal.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {IndicatorComponent} from './timer/indicator/indicator.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const MaterialModules = [
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    DecimalPipe,
    IndicatorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ...MaterialModules,
    MatTabsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    const custom = createCustomElement(AppComponent, {injector});
    customElements.define('my-timer', custom);
  }
}
