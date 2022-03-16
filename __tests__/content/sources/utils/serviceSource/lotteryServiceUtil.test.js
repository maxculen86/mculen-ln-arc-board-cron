import 'regenerator-runtime/runtime';
import lotteryMock from '../../../../../__mocks__/data/lottery/lotteryMock.json';
import lottery from '../../../../../content/sources/utils/servicesSource/utils/lottery';
import error404 from '../../../../../__mocks__/data/logger/error404.json';

const mockResponse = lotteryMock;

const { getUri, request: lotteryRequest, resolve, reject } = lottery;

jest.mock('request-promise-native', () => {
    return {
        __esModule: true,
        default: () => mockResponse
    };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => [301, 302, 404]
}));

describe('Test getUri function', () => {
    it('Check values from function getUri', () => {
        expect(
            getUri({ service: 'loterias', serviceItem: 'telekino' })
        ).toStrictEqual(
            'https://arcservices.lanacion.com.ar/servicios/loterias/telekino'
        );

        expect(getUri({ service: 'loterias', serviceItem: '' })).toStrictEqual(
            'https://arcservices.lanacion.com.ar/servicios/loterias/'
        );

        expect(() => {
            getUri({});
        }).toThrow('Debe definir un servicio ó servicio e item.');
    });
});

describe('Tests lottery request', () => {
    it('Should return data from the request', () => {
        const queryObj = { service: 'loterias', serviceItem: '' };
        const req = { queryData: queryObj, auth: {} };
        expect(lotteryRequest(req)).toStrictEqual(mockResponse);
    });
});

describe('Tests resolve function', () => {
    it('Should return the transformed response', () => {
        const res = {
            query: {},
            response: [{ name: 'Quini 6', id: 'quini_6' }]
        };
        expect(resolve(res)).toStrictEqual(res.response);
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
