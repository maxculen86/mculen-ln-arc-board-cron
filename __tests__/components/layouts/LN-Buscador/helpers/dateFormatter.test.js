import {
    formatSpanishDate,
    toISODate
} from '../../../../../components/layouts/LN-Buscador/helpers/dateFormatter';

jest.mock('fusion:environment', () => ({}));
jest.mock('fusion:context', () => ({}));

describe('formatSpanishDate', () => {
    it('returns empty string for null input', () => {
        expect(formatSpanishDate(null)).toBe('');
    });

    it('returns empty string for undefined input', () => {
        expect(formatSpanishDate(undefined)).toBe('');
    });

    it('returns empty string for empty string input', () => {
        expect(formatSpanishDate('')).toBe('');
    });

    it('returns empty string for invalid date string', () => {
        expect(formatSpanishDate('not-a-date')).toBe('');
    });

    it('formats a valid ISO date string in Spanish', () => {
        const result = formatSpanishDate('2024-01-15');
        // The formatted result should contain the year 2024
        expect(result).toContain('2024');
        // Should be a non-empty string
        expect(result.length).toBeGreaterThan(0);
    });

    it('formats a valid datetime string', () => {
        const result = formatSpanishDate('2024-06-20T12:00:00Z');
        expect(result).toContain('2024');
        expect(result.length).toBeGreaterThan(0);
    });

    it('returns a string (not a number) for valid dates', () => {
        const result = formatSpanishDate('2024-03-10');
        expect(typeof result).toBe('string');
    });
});

describe('toISODate', () => {
    it('returns empty string for null input', () => {
        expect(toISODate(null)).toBe('');
    });

    it('returns empty string for undefined input', () => {
        expect(toISODate(undefined)).toBe('');
    });

    it('returns empty string for empty string input', () => {
        expect(toISODate('')).toBe('');
    });

    it('returns empty string for invalid date string', () => {
        expect(toISODate('not-a-date')).toBe('');
    });

    it('returns date in YYYY-MM-DD format for valid ISO date', () => {
        // Use a UTC date string to avoid timezone issues
        const result = toISODate('2024-03-15T00:00:00.000Z');
        expect(result).toBe('2024-03-15');
    });

    it('returns only the date portion (no time)', () => {
        const result = toISODate('2024-12-25T10:30:00Z');
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
});
