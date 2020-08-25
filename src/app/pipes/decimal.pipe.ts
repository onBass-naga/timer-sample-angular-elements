import { Pipe, PipeTransform } from '@angular/core';
import Decimal from 'decimal.js-light';

@Pipe({
  name: 'decimal'
})
export class DecimalPipe implements PipeTransform {

  transform(value: Decimal): string {
    return value.toDecimalPlaces(2).toString();
  }

}
