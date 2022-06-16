import React from 'react';
import dateAndTimeUtil, {
    addHoursAndFormat,
    hasFutureDisplayDate,
    isOlderThanXHoursAgo
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
});
