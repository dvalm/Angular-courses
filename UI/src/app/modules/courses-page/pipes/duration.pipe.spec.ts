import { DurationPipe } from './duration.pipe';
import { DecimalPipe } from '@angular/common';

const decimalPipe = new DecimalPipe('en-US');
const durationPipe = new DurationPipe(decimalPipe);

describe('DurationPipe', () => {

    it('transforms "0" to "0min"', () => {
        expect(durationPipe.transform(0)).toBe('0min');
    });

    it('transforms "5" to "05min"', () => {
      expect(durationPipe.transform(5)).toBe('05min');
    });

    it('transforms "35" to "35min"', () => {
        expect(durationPipe.transform(35)).toBe('35min');
    });

    it('transforms "60" to "1h 00min"', () => {
        expect(durationPipe.transform(60)).toBe('1h 0min');
    });

    it('transforms "75" to "1h 15min"', () => {
        expect(durationPipe.transform(75)).toBe('1h 15min');
    });

    it('transforms "180" to "3h 00min"', () => {
        expect(durationPipe.transform(180)).toBe('3h 0min');
    });
});
