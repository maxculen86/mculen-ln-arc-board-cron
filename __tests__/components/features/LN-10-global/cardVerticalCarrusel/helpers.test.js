import { secondsToMinutes } from '../../../../../components/features/LN-10-global/cardCarrusel/helpers';

describe('components - features - LN-10-global - cardCarrusel - helpers', () => {
    it('should convert seconds to minutes and seconds format', () => {
        expect(secondsToMinutes(125)).toBe('02:05');
        expect(secondsToMinutes(3600)).toBe('60:00');
        expect(secondsToMinutes(59)).toBe('00:59');
    });

    it('should return empty string for invalid input', () => {
        expect(secondsToMinutes(-1)).toBe('');
        expect(secondsToMinutes('string')).toBe('');
        expect(secondsToMinutes(null)).toBe('');
        expect(secondsToMinutes(undefined)).toBe('');
    });
});
