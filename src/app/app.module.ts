import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';

import {AppComponent} from './app.component';
import {TimerComponent} from './timer/timer.component';
import {ReactiveFormsModule} from '@angular/forms';
import { DecimalPipe } from './pipes/decimal.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    DecimalPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  // entryComponents: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    const custom = createCustomElement(AppComponent, {injector});
    customElements.define('my-timer', custom);
  }
}
