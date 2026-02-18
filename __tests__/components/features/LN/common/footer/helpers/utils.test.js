import {
    resolveFooterHref,
    getEditionDetails
} from '../../../../../../../components/features/LN/common/footer/helpers/utils';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar',
    SITIO_SEGURO_REGISTRACION: 'https://micuenta.lanacion.com.ar'
}));

jest.mock(
    '../../../../../../../components/private/common/utils/dateAndTimeUtil',
    () => ({
        datesDiffInDays: jest.fn(() => 10000),
        getArgentinaDateMonthYear: jest.fn(() => '30 de enero de 2026'),
        getArgentinaYear: jest.fn(() => '2026')
    })
);

describe('resolveFooterHref', () => {
    it('should return href unchanged when type is not provided', () => {
        const result = resolveFooterHref({
            href: '/test-path/',
            type: undefined
        });

        expect(result).toBe('/test-path/');
    });

    it('should prepend base URL when type is provided', () => {
        const result = resolveFooterHref({
            href: '/economia/',
            type: 'SITE_LANACION'
        });

        expect(result).toBe('https://www.lanacion.com.ar/economia/');
    });
});

describe('getEditionDetails', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2026-01-30T12:00:00Z'));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should return edition details with mocked values', () => {
        const result = getEditionDetails();

        expect(result.edNumber).toBe(10000);
        expect(result.edDate.date).toBe('30 de enero de 2026');
        expect(result.edDate.year).toBe('2026');
    });
});
