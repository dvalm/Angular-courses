import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appHoursAndMinutes'
})
export class HoursAndMinutesPipe implements PipeTransform {
  public transform(value: number): string {
    let hours: number = 0;
    while(value >= 60){
      hours++;
      value -= 60;
    }
    return hours ? hours+"h "+value+"min" : value+"min";
  }
}