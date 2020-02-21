import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'appDuration'
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
    const minValue = (value === 0 && hours === 0) ? 0 : this.numberPipe.transform(value, '2.');
    return hours ? `${hours}h ${value}min` : `${minValue}min`;
  }
}
