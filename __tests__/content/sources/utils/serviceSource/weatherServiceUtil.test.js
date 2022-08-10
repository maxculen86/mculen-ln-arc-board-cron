import 'regenerator-runtime/runtime';
import { LANACION_SERVICES_URL } from 'fusion:environment';
import error404 from '../../../../../__mocks__/data/logger/error404';
import weather from '../../../../../content/sources/utils/servicesSource/weather/weather';
import homeSections from '../../../../../__mocks__/data/weather/homeSections';
import mockHome from '../../../../../__mocks__/data/weather/weatherHome.json';

// Transform home template inputs & output
import inputHomeTemplate from '../../../../../__mocks__/data/weather/responseWeather.json';
import outHomeTemplate from '../../../../../__mocks__/data/weather/outputweatherHome.json';

// Transform detail template inputs & output
import inputDetailTemplate from '../../../../../__mocks__/data/weather/responseWeatherDetail.json';
import outputDetailTemplate from '../../../../../__mocks__/data/weather/outputWeatherDetail.json';

const mockResponse = Promise.resolve(mockHome);

const {
    getUri,
    request: weatherRequest,
    resolve,
    reject,
    transform,
    getTemplates
} = weather;

jest.mock('request-promise-native', () => {
    return {
        __esModule: true,
        default: () => mockResponse
    };
});

describe('Test getUri function', () => {
    it('Check values from function getUri', () => {
        expect(
            getUri({ service: 'clima', serviceItem: 'mendoza' })
        ).toStrictEqual(
            'https://arcservices.lanacion.com.ar/api/v1/forecast/mendoza'
        );

        expect(getUri({ service: 'clima' })).toStrictEqual(
            'https://arcservices.lanacion.com.ar/api/v1/forecast/'
        );

        expect(
            getUri({
                service: 'loterias',
                serviceItem: 'mendoza',
                serviceSubItem: 'san-rafael'
            })
        ).toStrictEqual(
            'https://arcservices.lanacion.com.ar/api/v1/forecast/mendoza/san-rafael'
        );

        expect(() => {
            getUri({});
        }).toThrow(
            'No esta solicitado ningun clima o el clima que desea solicitar no existe.'
        );
    });
});

describe('Tests weather request', () => {
    it('Should return data from the request', () => {
        const queryObj = { service: 'clima' };
        const req = { queryData: queryObj, auth: {} };

        expect(weatherRequest(req)).toStrictEqual(mockResponse);
    });
});

describe('Tests resolve function', () => {
    it('Should return the transformed response', () => {
        const res = {
            response: {
                dataService: {
                    forecast: []
                },
                sectionSourceData: {},
                serviceType: 'detalle-clima'
            }
        };
        expect(resolve(res)).toStrictEqual({
            dataService: {
                created_date: undefined,
                forecast: []
            },
            metaData: {
                description:
                    'Encontrá el pronóstico del tiempo en Argentina, condiciones climáticas, temperatura actual y pronóstico extendido del clima en Capital Federal, Buenos Aires y todo el país por el Servicio Meteorológico Nacional - LA NACION',
                headline: 'Clima de hoy en Argentina',
                title:
                    'Clima de hoy en Argentina, el pronóstico del tiempo en LA NACION'
            },
            serviceType: 'detalle-clima'
        });
    });
});

describe('Test transform function', () => {
    it('Check transform function for weather home template', () => {
        expect(transform(inputHomeTemplate)).toStrictEqual(outHomeTemplate);
    }),
        it('Check transform function for weather detail template', () => {
            expect(transform(inputDetailTemplate)).toStrictEqual(
                outputDetailTemplate
            );
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
    it('For weather home => should return string "home-clima" as serviceType', () => {
        expect(getTemplates('', '', homeSections)).toStrictEqual('home-clima');
    });
    it('For province with cities => should return string "home-clima" as serviceType', () => {
        expect(
            getTemplates('Mendoza', '', homeSections[0].children)
        ).toStrictEqual('home-clima');
    });
    it('For province without cities => should return string "detalle-clima" as serviceType', () => {
        expect(getTemplates('Mendoza', '', [])).toStrictEqual('detalle-clima');
    });
    it('For province cities => should return string "detalle-clima" as serviceType', () => {
        expect(getTemplates('Mendoza', 'Malargue', [])).toStrictEqual(
            'detalle-clima'
        );
    });
});
