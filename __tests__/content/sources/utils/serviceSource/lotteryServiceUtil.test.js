import 'regenerator-runtime/runtime';
import { LANACION_SERVICES_URL } from 'fusion:environment';
import error404 from '../../../../../__mocks__/data/logger/error404';
import lotteryMock from '../../../../../__mocks__/data/lottery/lotteryMock';
import lottery from '../../../../../content/sources/utils/servicesSource/lottery/lottery';
import inputResultsMock from '../../../../../__mocks__/data/lottery/transformHome/inputResultsMock';
import inputExtraPropsMock from '../../../../../__mocks__/data/lottery/transformHome/inputExtraPropsMock';
import inputFalsyData from '../../../../../__mocks__/data/lottery/transformHome/inputFalsyData';
import inputApiResponse from '../../../../../__mocks__/data/lottery/transformHome/inputApiResponse';
import outputResultsMock from '../../../../../__mocks__/data/lottery/transformHome/outputResultsMock';
import outputExtraPropsMock from '../../../../../__mocks__/data/lottery/transformHome/outputExtraPropsMock';
import outputFalsyData from '../../../../../__mocks__/data/lottery/transformHome/outputFalsyData';
import outputApiResponse from '../../../../../__mocks__/data/lottery/transformHome/outputApiResponse';

import inputQuiniPoceada from '../../../../../__mocks__/data/lottery/transformDetail/inputQuiniPoceada';
import inputQuiniProvincia from '../../../../../__mocks__/data/lottery/transformDetail/inputQuiniProvincia';
import inputTelekino from '../../../../../__mocks__/data/lottery/transformDetail/inputTelekino';
import inputLotoPlus from '../../../../../__mocks__/data/lottery/transformDetail/inputLotoPlus';
import outputQuiniPoceada from '../../../../../__mocks__/data/lottery/transformDetail/outputQuiniPoceada';
import outputQuiniProvincia from '../../../../../__mocks__/data/lottery/transformDetail/outputQuiniProvincia';
import outputTelekino from '../../../../../__mocks__/data/lottery/transformDetail/outputTelekino';
import outputLotoPLus from '../../../../../__mocks__/data/lottery/transformDetail/outputLotoPlus';

const mockResponse = Promise.resolve(lotteryMock);

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
            'https://arcservices.lanacion.com.ar/api/v1/lotteries/Telekino'
        );

        expect(getUri({ service: 'loterias', serviceItem: '' })).toStrictEqual(
            'https://arcservices.lanacion.com.ar/api/v1/lotteries/'
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

describe('Tests transform detail function', () => {
    it('Should check results from Quini Poceada', () => {
        expect(transform(inputQuiniPoceada)).toStrictEqual(outputQuiniPoceada);
    });
    it('Should check results from Quini Provincia', () => {
        expect(transform(inputQuiniProvincia)).toStrictEqual(
            outputQuiniProvincia
        );
    });
    it('Should check results from Telekino', () => {
        expect(transform(inputTelekino)).toStrictEqual(outputTelekino);
    });
    it('Should check results from Loto Plus', () => {
        expect(transform(inputLotoPlus)).toStrictEqual(outputLotoPLus);
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
            response: { dataService: { items: [] }, serviceType: 'home' }
        };
        expect(resolve(res)).toStrictEqual({
            dataService: {},
            serviceType: '',
            dataService: { lotteries: [] },
            serviceType: 'home'
        });
    });
});
