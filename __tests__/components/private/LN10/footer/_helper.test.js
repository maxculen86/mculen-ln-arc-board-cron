import commonPropsFooter from '../../../../../components/private/LN10/footer/_helper';
import { getEditionDetails } from '../../../../../components/private/LN10/footer/_helper';
import {
    datesDiffInDays,
    getArgentinaDateMonthYear,
    getArgentinaYear
} from '../../../../../components/private/common/utils/dateAndTimeUtil';

jest.mock(
    '../../../../../components/private/common/utils/dateAndTimeUtil',
    () => ({
        datesDiffInDays: jest.fn(() => 100),
        getArgentinaDateMonthYear: jest.fn(() => '01/07/2024'),
        getArgentinaYear: jest.fn(() => 2024)
    })
);

describe('Tests commonPropsFooter function', () => {
    const dinamycParameters = ['Economia', 'https://lanacion.com.ar/economia/'];
    test('Should return an object with the specified parameters and default target. (href and text)', () => {
        expect(
            commonPropsFooter('Economia', 'https://lanacion.com.ar/economia/')
        ).toStrictEqual({
            href: 'https://lanacion.com.ar/economia/',
            text: 'Economia',
            target: '_self'
        });
    });

    test('Should return an object with the specified parameters including target. (href, text and target)', () => {
        expect(
            commonPropsFooter(
                'Economia',
                'https://lanacion.com.ar/economia/',
                '_blank'
            )
        ).toStrictEqual({
            href: 'https://lanacion.com.ar/economia/',
            text: 'Economia',
            target: '_blank'
        });
    });

    test('It should return an empty object when the parameters are not defined.', () => {
        expect(commonPropsFooter(undefined)).toStrictEqual({
            target: '_self'
        });
    });
});

describe('Tests getEditionDetails function', () => {
    it('should return the expected data structure', () => {
        const result = getEditionDetails();

        expect(result).toEqual({
            edDate: {
                date: '01/07/2024',
                year: 2024
            },
            edNumber: 100
        });

        expect(datesDiffInDays).toHaveBeenCalled();
        expect(getArgentinaDateMonthYear).toHaveBeenCalled();
        expect(getArgentinaYear).toHaveBeenCalled();
    });
});
