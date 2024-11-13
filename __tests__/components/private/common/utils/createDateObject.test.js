import createDateObject from '../../../../../components/private/common/utils/createDateObject';

describe('createDateObject', () => {
    it('should return a valid Date object when a valid date and time are provided', () => {
        const date = '2023-10-05';
        const time = '14:30:00';
        const result = createDateObject(date, time);

        expect(result).toBeInstanceOf(Date);
        expect(result.toISOString()).toBe(
            new Date(`${date}T${time}`).toISOString()
        );
    });

    it('should return a valid Date object when only a valid date is provided', () => {
        const date = '2023-10-05';
        const result = createDateObject(date);

        expect(result).toBeInstanceOf(Date);
        expect(result.toISOString()).toBe(new Date(date).toISOString());
    });

    it('should return an empty string when an invalid date is provided', () => {
        const date = 'invalid-date';
        const result = createDateObject(date);

        expect(result).toBe('');
    });

    it('should return an empty string when an invalid time is provided', () => {
        const date = '2023-10-05';
        const time = 'invalid-time';
        const result = createDateObject(date, time);

        expect(result).toBe('');
    });

    it('should return an empty string when both date and time are empty', () => {
        const result = createDateObject('');

        expect(result).toBe('');
    });
});
