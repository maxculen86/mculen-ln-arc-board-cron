import 'regenerator-runtime/runtime';
import error404 from '../../../../../__mocks__/data/logger/error404';
import lotteryMock from '../../../../../__mocks__/data/lottery/lotteryMock';
import lottery from '../../../../../content/sources/utils/servicesSource/lottery/lottery';
import inputResultsMock from '../../../../../__mocks__/data/lottery/transformHome/inputResultsMock';
import inputOrderMock from '../../../../../__mocks__/data/lottery/transformHome/inputOrderMock';
import inputExtraPropsMock from '../../../../../__mocks__/data/lottery/transformHome/inputExtraPropsMock';
import inputFalsyData from '../../../../../__mocks__/data/lottery/transformHome/inputFalsyData';
import inputApiResponse from '../../../../../__mocks__/data/lottery/transformHome/inputApiResponse';
import outputResultsMock from '../../../../../__mocks__/data/lottery/transformHome/outputResultsMock';
import outputOrderMock from '../../../../../__mocks__/data/lottery/transformHome/outputOrderMock';
import outputExtraPropsMock from '../../../../../__mocks__/data/lottery/transformHome/outputExtraPropsMock';
import outputFalsyData from '../../../../../__mocks__/data/lottery/transformHome/outputFalsyData';
import outputApiResponse from '../../../../../__mocks__/data/lottery/transformHome/outputApiResponse';

const mockResponse = lotteryMock;

const { getUri, request: lotteryRequest, resolve, reject, transform } = lottery;

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

describe('Tests transform home function', () => {
    it('Should check that results are being added to the lottery', () => {
        expect(transform(inputResultsMock)).toStrictEqual(outputResultsMock);
    });

    it('Should reorder lotteries based on config order', () => {
        expect(transform(inputOrderMock)).toStrictEqual(outputOrderMock);
    });

    it('Should check extra properties like letters, jackspot and estimated_pot', () => {
        expect(transform(inputExtraPropsMock)).toStrictEqual(
            outputExtraPropsMock
        );
    });
    it('should recieve falsy data', () => {
        expect(transform(inputFalsyData)).toStrictEqual(outputFalsyData);
    });
    it('Should check api response', () => {
        expect(transform(inputApiResponse)).toStrictEqual(outputApiResponse);
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

describe('Tests resolve function', () => {
    it('Should return the transformed response', () => {
        const res = {
            query: {},
            response: { dataService: { items: [] }, serviceType: '' }
        };
        expect(resolve(res)).toStrictEqual([]);
    });
});
