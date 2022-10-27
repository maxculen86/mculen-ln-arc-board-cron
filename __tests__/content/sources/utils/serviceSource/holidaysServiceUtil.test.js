import 'regenerator-runtime/runtime';
import { LANACION_SERVICES_URL } from 'fusion:environment';
import mockData from '../../../../../__mocks__/data/holidays/mockHolidays.json';
import error404 from '../../../../../__mocks__/data/logger/error404.json';
import holidays from '../../../../../content/sources/utils/servicesSource/holidays/holidays';
import getMonthNumber from '../../../../../content/sources/utils/servicesSource/holidays/holidaysHelper';

const mockResponse = Promise.resolve(mockData);

const { getUri, request: holidayRequest, reject, getTemplates } = holidays;

jest.mock('request-promise-native', () => {
    return {
        __esModule: true,
        default: () => mockResponse
    };
});

describe('Test getUri function', () => {
    it('Should return endpoint with the year', () => {
        expect(
            getUri({ service: 'feriados', serviceItem: '2022' })
        ).toStrictEqual(
            'https://arcservices.lanacion.com.ar/api/v1/feriados/mock/2022'
        );
    });
    it('Should return endpoint with the current year', () => {
        expect(getUri({ service: 'feriados' })).toStrictEqual(
            'https://arcservices.lanacion.com.ar/api/v1/feriados/mock/2022'
        );
    });

    it('Should return endpoint with the month detail', () => {
        expect(
            getUri({
                service: 'feriados',
                serviceItem: '2022',
                serviceSubItem: 'mayo'
            })
        ).toStrictEqual(
            'https://arcservices.lanacion.com.ar/api/v1/feriados/mock/2022/5'
        );
    });
    it('Should return error', () => {
        expect(() => {
            getUri({});
        }).toThrow(
            'No está solicitado ningún feriado o el feriado que desea solicitar no existe.'
        );
    });
});

describe('Tests holidays request', () => {
    it('Should return data from the request', () => {
        const queryObj = { service: 'feriados' };
        const req = { queryData: queryObj, auth: {} };

        expect(holidayRequest(req)).toStrictEqual(mockResponse);
    });
});

describe('Tests reject function', () => {
    it('Should reject request', () => {
        const error = { error: error404, uri: '', arcSite: '' };
        expect(() => {
            reject(error);
        }).toThrow();
    });
});

describe('Tests getTemplates function', () => {
    it('Should return string "feriados-mes" as serviceType', () => {
        expect(getTemplates('2022', 'mayo')).toStrictEqual('feriados-mes');
    });
    it('Should return string "feriados-año" as serviceType', () => {
        expect(getTemplates('2022')).toStrictEqual('feriados-año');
        expect(getTemplates('')).toStrictEqual('feriados-año');
        expect(getTemplates()).toStrictEqual('feriados-año');
    });
});

describe('Tests getMonthNumber helperFunction', () => {
    it('Should return number', () => {
        expect(getMonthNumber('diciembre')).toBe(12);
    });
    it('Should return string', () => {
        expect(getMonthNumber('hola')).toBe('');
        expect(getMonthNumber('')).toBe('');
        expect(getMonthNumber('2')).toBe('');
        expect(getMonthNumber()).toBe('');
    });
});
