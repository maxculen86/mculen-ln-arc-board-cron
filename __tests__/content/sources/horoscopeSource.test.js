import 'regenerator-runtime/runtime';
import logger from '../../../components/private/common/utils/logger';
import horoscopeSource, {
    resolve
} from '../../../content/sources/horoscopeSource';
import mockAPI_RESPONSE_ZODIAC from '../../../__mocks__/data/apiHoroscope/horoscoposZodiaco.json';
import mockAPI_RESPONSE_SIGN_ZODIAC from '../../../__mocks__/data/apiHoroscope/signoZodiaco.json';
import mockAPI_RESPONSE_CHINESE from '../../../__mocks__/data/apiHoroscope/horoscoposChinos.json';
import mockAPI_RESPONSE_SIGN_CHINESE from '../../../__mocks__/data/apiHoroscope/signoChino.json';

jest.mock('request-promise-native', () => {
    return {
        __esModule: true,
        default: method => {
            const path = method.uri.split('/');
            path.splice(0, 5);

            if (path.includes('tauro')) {
                return Promise.resolve({
                    ...mockAPI_RESPONSE_SIGN_ZODIAC.data
                });
            }
            if (path.includes('cabra')) {
                return Promise.resolve({
                    ...mockAPI_RESPONSE_SIGN_CHINESE.data
                });
            }
            if (path.includes('horoscopo-chino-2021')) {
                return Promise.resolve({
                    ...mockAPI_RESPONSE_CHINESE.data
                });
            }
            if (path.includes('horoscopo')) {
                return Promise.resolve({
                    ...mockAPI_RESPONSE_ZODIAC.data
                });
            }
            throw new Error('Catch test');
        }
    };
});

jest.mock('../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

const loggerPush = jest.spyOn(logger, 'push');

describe('Content Sources - Horoscope Source =>', () => {
    const { fetch: fetchHoroscope } = horoscopeSource;
    describe('Fetch without horoscope parameter', () => {
        it('Should return error', () => {
            expect(() => {
                fetchHoroscope({});
            }).toThrow('El tipo de horoscopo es necesario.');
        });
    });
    describe('Fetch with horoscope parameter, sign and year parameters', () => {
        it('Should return correct data for zodiac horoscope', done => {
            fetchHoroscope({ arcSite: 'la-nacion-ar', horoscope: 'horoscopo' })
                .then(response =>
                    expect(response).toStrictEqual(mockAPI_RESPONSE_ZODIAC)
                )
                .then(done);
        });
        it('Should return correct data for zodiac tauro sign', done => {
            fetchHoroscope({
                arcSite: 'la-nacion-ar',
                horoscope: 'horoscopo',
                sign: 'tauro'
            })
                .then(response =>
                    expect(response).toStrictEqual(mockAPI_RESPONSE_SIGN_ZODIAC)
                )
                .then(done);
        });
        it('Should return correct data for chinese horoscope', done => {
            fetchHoroscope({
                arcSite: 'la-nacion-ar',
                horoscope: 'horoscopo-chino',
                year: '2021'
            })
                .then(response =>
                    expect(response).toStrictEqual(mockAPI_RESPONSE_CHINESE)
                )
                .then(done);
        });
        it('Should return correct data for chinese goat sign', done => {
            fetchHoroscope({
                arcSite: 'la-nacion-ar',
                horoscope: 'horoscopo-chino',
                sign: 'cabra',
                year: '2021'
            })
                .then(response =>
                    expect(response).toStrictEqual(
                        mockAPI_RESPONSE_SIGN_CHINESE
                    )
                )
                .then(done);
        });
        it('Should work catch properly', done => {
            fetchHoroscope({
                arcSite: 'la-nacion-ar',
                horoscope: 'to-execute-catch'
            })
                .then(response => expect(loggerPush).toBeCalledTimes(1))
                .then(done);
        });
    });

    describe('Resolve with horoscope, sign and year parameters', () => {
        it('Should generate the zodiac horoscope endpoint', () => {
            expect(resolve('horoscopo')).toStrictEqual(
                'https://api-contenidos.lanacion.com.ar/json/v2/horoscopo'
            );
        });
        it('Should generate the tauro zodiac sign endpoint', () => {
            expect(resolve('horoscopo', 'tauro')).toStrictEqual(
                'https://api-contenidos.lanacion.com.ar/json/v2/horoscopo/tauro'
            );
        });
        it('Should generate the chinese horoscope endpoint', () => {
            expect(resolve('horoscopo-chino', '', '2021')).toStrictEqual(
                'https://api-contenidos.lanacion.com.ar/json/v2/horoscopo-chino-2021'
            );
        });
        it('Should generate the chinese cabra sign endpoint', () => {
            expect(resolve('horoscopo-chino', 'cabra', '2021')).toStrictEqual(
                'https://api-contenidos.lanacion.com.ar/json/v2/horoscopo-chino-2021/cabra'
            );
        });
    });
});
