import { formatTimelineTime } from '../../../../../../components/features/common/timezone/utils/timezoneConversion';

describe('formatTimelineTime', () => {
    it('returns empty string for falsy input', () => {
        expect(formatTimelineTime(null)).toBe('');
        expect(formatTimelineTime(undefined)).toBe('');
        expect(formatTimelineTime('')).toBe('');
    });

    it('converts 12:00 UTC to 09:00 GMT-3', () => {
        expect(formatTimelineTime('2023-01-01T12:00:00Z')).toBe('09:00');
    });

    it('converts 15:30 UTC to 12:30 GMT-3', () => {
        expect(formatTimelineTime('2023-01-01T15:30:00Z')).toBe('12:30');
    });

    it('converts 03:15 UTC to 00:15 GMT-3', () => {
        expect(formatTimelineTime('2023-01-01T03:15:00Z')).toBe('00:15');
    });

    it('converts 02:00 UTC to 23:00 GMT-3', () => {
        expect(formatTimelineTime('2023-01-01T02:00:00Z')).toBe('23:00');
    });

    it('converts midnight UTC to 21:00 GMT-3', () => {
        expect(formatTimelineTime('2023-01-01T00:00:00Z')).toBe('21:00');
    });

    it('converts 23:59 UTC to 20:59 GMT-3', () => {
        expect(formatTimelineTime('2023-01-01T23:59:00Z')).toBe('20:59');
    });

    it('handles ISO strings with explicit offsets', () => {
        expect(formatTimelineTime('2023-01-01T23:30:00-05:00')).toBe('01:30');
    });

    it('returns empty string for invalid ISO strings', () => {
        expect(formatTimelineTime('not-a-date')).toBe('');
    });
});
