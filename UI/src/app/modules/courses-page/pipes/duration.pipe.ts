import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'appDiration'
})
export class DurationPipe implements PipeTransform {

  constructor(private numberPipe: DecimalPipe){}

  public transform(value: number): string {
    let hours: number = 0;
    const minutesInHour: number = 60;
    while(value >= minutesInHour){
      hours++;
      value -= minutesInHour;
    }
    //console.log("pipe ", this.numberPipe.transform(value, '2.'));
    return hours ? `${hours}h ${value}min` : `${this.numberPipe.transform(value, '2.')}min`;
  }
}