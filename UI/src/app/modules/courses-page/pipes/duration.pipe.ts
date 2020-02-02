import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'appDiration'
})
export class DurationPipe implements PipeTransform {

  constructor(private numberPipe: DecimalPipe) {}

  public transform(value: number): string {
    let hours = 0;
    const minutesInHour = 60;
    while (value >= minutesInHour) {
      hours++;
      value -= minutesInHour;
    }
    return hours ? `${hours}h ${value}min` : `${this.numberPipe.transform(value, '2.')}min`;
  }
}
