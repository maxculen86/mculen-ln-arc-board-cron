import lotteryMock from '../../../../../__mocks__/data/lottery/lotteryMock.json';
import lottery from '../../../../../content/sources/utils/servicesSource/utils/lottery';

const mockRequestResponse = jest.fn();

const mockResponse = Promise.resolve(lotteryMock);

const { getUri, request: lotteryRequest, resolve, reject } = lottery;

jest.mock('request-promise-native', () => {
    return {
        __esModule: true,
        default: () => mockRequestResponse()
    };
});

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
