import 'regenerator-runtime/runtime';
import {
    LANACION_SERVICES_URL,
    API_ENV,
    API_KEY_ARC_SERVICES
} from 'fusion:environment';
import horoscope from '../../../../../../content/sources/utils/servicesSource/horoscope/horoscope';
import mockAPI_RESPONSE_ZODIAC from '../../../../../../__mocks__/data/apiHoroscope/horoscoposZodiaco.json';
import mockAPI_RESPONSE_SIGN_ZODIAC from '../../../../../../__mocks__/data/apiHoroscope/signoZodiaco.json';
import mockAPI_RESPONSE_CHINESE from '../../../../../../__mocks__/data/apiHoroscope/horoscoposChinos.json';

const mockHoroscopeResponse = Promise.resolve(
    mockAPI_RESPONSE_ZODIAC.dataService
);

const mockHoroscopeDetail = Promise.resolve(
    mockAPI_RESPONSE_SIGN_ZODIAC.dataService
);

const mockChineseHoroscope = Promise.resolve(
    mockAPI_RESPONSE_CHINESE.dataService
);
const { request: horoscopeRequest, getUri } = horoscope;

const originalFetch = global.fetch;

beforeEach(() => {
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
    global.fetch = originalFetch;
});

describe('Fetch without horoscope parameter', () => {
    it('Should return error', async () => {
        await expect(horoscopeRequest({ queryData: {} })).rejects.toThrow(
            'El tipo de horoscopo es necesario.'
        );
    });
});
describe('Fetch with horoscope parameter, sign and year parameters', () => {
    it('Should return correct data for zodiac horoscope', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => mockHoroscopeResponse
        });
        const response = await horoscopeRequest({
            queryData: { service: 'horoscopo' }
        });
        expect(response).toStrictEqual(mockAPI_RESPONSE_ZODIAC.dataService);
    });
    it('Should return correct data for zodiac tauro sign', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => mockHoroscopeDetail
        });
        const response = await horoscopeRequest({
            queryData: { service: 'horoscopo', serviceItem: 'tauro' }
        });
        expect(response).toStrictEqual(
            mockAPI_RESPONSE_SIGN_ZODIAC.dataService
        );
    });
    it('Should return correct data for chinese horoscope', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => mockChineseHoroscope
        });

        const response = await horoscopeRequest({
            queryData: {
                service: 'horoscopo',
                serviceItem: 'horoscopo-chino-2021'
            }
        });
        expect(response).toStrictEqual(mockAPI_RESPONSE_CHINESE.dataService);
    });
});

describe('Resolve with horoscope, sign and year parameters', () => {
    it('Should generate the zodiac horoscope endpoint', () => {
        expect(getUri({ service: 'horoscopo' })).toEqual(
            'https://arcservices.lanacion.com.ar/api/v2.0/horoscopo/'
        );
    });
    it('Should generate the tauro zodiac sign endpoint', () => {
        expect(getUri({ service: 'horoscopo', serviceItem: 'tauro' })).toEqual(
            'https://arcservices.lanacion.com.ar/api/v2.0/horoscopo/tauro'
        );
    });
});
