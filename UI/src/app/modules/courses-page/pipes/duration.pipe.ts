import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appDiration'
})
export class DurationPipe implements PipeTransform {
  public transform(value: number): string {
    let hours: number = 0;
    let minutesInHour: number = 60;
    while(value >= minutesInHour){
      hours++;
      value -= minutesInHour;
    }
    return hours ? `${hours}h ${value}min` : `${value}min`;
  }
}