import 'regenerator-runtime/runtime';
import { LANACION_SERVICES_URL } from 'fusion:environment';
import error404 from '../../../../../__mocks__/data/logger/error404';
import weather from '../../../../../content/sources/utils/servicesSource/weather/weather';
import homeSections from '../../../../../__mocks__/data/weather/homeSections';

const {
    getUri,
    request: weatherRequest,
    resolve,
    reject,
    transform,
    getTemplates
} = weather;

// jest.mock('request-promise-native', () => {
//     return {
//         __esModule: true,
//         default: () => mockResponse
//     };
// });

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
