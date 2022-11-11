import React from 'react';
import dateAndTimeUtil, {
    addHoursAndFormat,
    hasFutureDisplayDate,
    isOlderThanXHoursAgo,
    getSpecificDate,
    datesDiffInDays
} from '../../../../../components/private/common/utils/dateAndTimeUtil';
describe('Private - Common - Utils - dateAndTimeUtil', () => {
    it('deberia filtrar notas con display_date a futuro', () => {
        const date = '2021-02-05T17:34:00.624Z';
        const result = hasFutureDisplayDate(date);
        expect(result).toBeFalsy();
    });

    it('deberia filtrar notas con published_date mayor a 24 hs', () => {
        const date = '2021-02-05T17:34:00.624Z';
        const result = isOlderThanXHoursAgo(date, 24);
        expect(result).toBeTruthy();
    });

    it('deberia sumar 3 horas a una fecha en formato SQL', () => {
        const date = '2021-02-05T17:34:00.624Z';
        const result = addHoursAndFormat(6, date);
        expect(result).toBe('2021-02-05T20:34:00');
    });

    it('Test Fecha del articulo dateAndTimeUtil', () => {
        expect(dateAndTimeUtil('2021-02-18T17:34:00.624Z')).toEqual({
            date: '18 de febrero de 2021',
            time: '11:34'
        });
    });

    describe('Private - Common - Utils - dateAndTimeUtil - getSpecificDate', () => {
        it('Should return null when paramethers are wrong', () => {
            expect(getSpecificDate()).toBeNull();
            expect(getSpecificDate('wrong')).toBeNull();
        });

        it('Should return correct date when year, month and days paramethers are correct', () => {
            const result = getSpecificDate(2022, 4, 20);
            expect(result).not.toBeNull();
            expect(result.getFullYear()).toBe(2022);
            expect(result.getMonth()).toBe(3); // <= Date months start from 0
            expect(result.getDate()).toBe(20);
        });
    });

    describe('Private - Common - Utils - dateAndTimeUtil - datesDiffInDays', () => {
        it('Should return null when one of the parameters its NOT a valid date object', () => {
            const firstDate = new Date(2022, 0, 1);
            const secondDate = new Date(2022, 0, 1);
            expect(datesDiffInDays(undefined, secondDate)).toBeNull();
            expect(datesDiffInDays(firstDate, undefined)).toBeNull();
            expect(datesDiffInDays(firstDate, '20/04/2022')).toBeNull();
        });

        it('Should return 365 days in a year', () => {
            const firstDate = new Date(2021, 0, 1);
            const secondDate = new Date(2022, 0, 1);
            const result = datesDiffInDays(firstDate, secondDate);
            expect(result).not.toBeNull();
            expect(result).toBe(365);
        });
        it('Should return 30 days in a november', () => {
            const firstDate = new Date(2022, 10, 1);
            const secondDate = new Date(2022, 11, 1);
            const result = datesDiffInDays(firstDate, secondDate);
            expect(result).not.toBeNull();
            expect(result).toBe(30);
        });
        it('Should return 31 days in a december', () => {
            const firstDate = new Date(2022, 11, 1);
            const secondDate = new Date(2023, 0, 1);
            const result = datesDiffInDays(firstDate, secondDate);
            expect(result).not.toBeNull();
            expect(result).toBe(31);
        });
        it('Should return 1 day in a december', () => {
            const firstDate = new Date(2022, 11, 1);
            const secondDate = new Date(2022, 11, 2);
            const result = datesDiffInDays(firstDate, secondDate);
            expect(result).not.toBeNull();
            expect(result).toBe(1);
        });
    });
});
