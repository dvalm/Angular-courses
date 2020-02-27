import { DurationPipe } from './duration.pipe';
import { DecimalPipe } from '@angular/common';

const decimalPipe = new DecimalPipe('en-US');
const durationPipe = new DurationPipe(decimalPipe);

describe('DurationPipe', () => {

    it('transforms "0" to "0min"', () => {
        expect(durationPipe.transform(0)).toBe('0min');
    });

    it('transforms "5" to "05min"', () => {
/* tslint:disable */
    // 5 min < one hour and have one number
      expect(durationPipe.transform(5)).toBe('05min');
/* tslint:enable */
    });

    it('transforms "35" to "35min"', () => {
/* tslint:disable */
    // 35 min < one hour and have two number
        expect(durationPipe.transform(35)).toBe('35min');
/* tslint:enable */
    });

    it('transforms "60" to "1h 00min"', () => {
/* tslint:disable */
    // 60 min = one hour 
        expect(durationPipe.transform(60)).toBe('1h 0min');
/* tslint:enable */
    });

    it('transforms "75" to "1h 15min"', () => {
/* tslint:disable */
    // 75 min > one hour
        expect(durationPipe.transform(75)).toBe('1h 15min');
/* tslint:enable */
    });

    it('transforms "180" to "3h 00min"', () => {
/* tslint:disable */
    // 180 min = three hout
        expect(durationPipe.transform(180)).toBe('3h 0min');
/* tslint:enable */
    });
});
