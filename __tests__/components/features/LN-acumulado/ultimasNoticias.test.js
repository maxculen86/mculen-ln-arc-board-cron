import React from 'react';
import PropTypes from 'fusion:prop-types';
import { shallow } from 'enzyme';
import {
    addHoursAndFormat,
    hasFutureDisplayDate,
    isOlderThan24HourAgo
} from '../../../../components/private/common/utils/dateAndTimeUtil';
// import UltimasNoticias from '../../../../components/features/LN-acumulado/ultimasNoticias';

describe('Features - LN-acumulado - Ultimas Noticias =>', () => {
    describe('Filtrado de articulos por varios criterios', () => {
        it('deberia filtrar notas con display_date a futuro', () => {
            const date1 = '2021-02-05T17:34:00.624Z';
            const result1 = hasFutureDisplayDate(date1);
            expect(result1).toBeFalsy();
            /*
            const date2 = '2021-02-18T17:34:00.624Z';
            const result2 = hasFutureDisplayDate(date2);
            expect(result2).toBeTruthy();

            const date3 = '2021-02-17T13:34:00.624Z';
            const result3 = hasFutureDisplayDate(date3);
            expect(result3).toBeTruthy();
            */
        });

        it('deberia filtrar notas con published_date mayor a 24 hs', () => {
            const date1 = '2021-02-05T17:34:00.624Z';
            const result1 = isOlderThan24HourAgo(date1);
            expect(result1).toBeTruthy();
            /*
            const date2 = '2021-02-16T19:34:00.624Z';
            const result2 = isOlderThan24HourAgo(date2);
            expect(result2).toBeFalsy();

            const date3 = '2021-02-16T14:34:00.624Z';
            const result3 = isOlderThan24HourAgo(date3);
            expect(result3).toBeFalsy();
            */
        });

        it('deberia sumar 3 horas a una fecha en formato SQL', () => {
            const date1 = '2021-02-05T17:34:00.624Z';
            const result1 = addHoursAndFormat(6, date1);
            expect(result1).toBe('2021-02-05T20:34:00');
        });
    });
});
