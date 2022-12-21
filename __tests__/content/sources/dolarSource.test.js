import 'regenerator-runtime/runtime';
import { LANACION_SERVICES_URL } from 'fusion:environment';
import dolarSource from '../../../content/sources/dolarSource';
import logger from '../../../components/private/common/utils/logger';
import MOCK_API_RESPONSE from '../../../__mocks__/data/apiDolar/apiDolares.json';
import MOCK_DOLAR_FULL_RESPONSE from '../../../__mocks__/data/apiDolar/sourceFullResponse.json';
import MOCK_DOLAR_PARTIAL_RESPONSE from '../../../__mocks__/data/apiDolar/sourcePartialResponse.json';

jest.mock('../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});
const loggerPush = jest.spyOn(logger, 'push');

const mockRequestResponse = jest.fn().mockReturnValue(MOCK_API_RESPONSE);
jest.mock('request-promise-native', () => {
    return {
        __esModule: true,
        default: async () => mockRequestResponse()
    };
});

jest.mock('../../../components/private/common/utils/image/resizer', () => {
    const resizeUrl = jest.fn(() => {
        return 'https://resizer.glanacion.com/resizer/0GdxpO9hiHgenNwsaSPj7ljMCRU=/314x0/filters:format(webp):quality(80)/especialess3.lanacion.com.ar/LN/svg/logo-iol.svg';
    });
    return {
        createResizer: jest.fn(() => ({
            resizeUrl
        }))
    };
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Content Sources - Dolar Source', () => {
    const { fetch } = dolarSource;

    const query = {
        'arc-site': 'la-nacion-ar'
    };
    it('Should return data in the correct order when all dolar types are set', async done => {
        const termicasDolar = [
            'dbna',
            'dblue',
            'dmep',
            'dccl',
            'dtarjeta',
            'dturista',
            'dmayorista',
            'euro'
        ];

        fetch(query, {
            cachedCall: jest.fn(async () => ({
                Termicas: {
                    dolares: termicasDolar
                }
            }))
        })
            .then(response => {
                const { data: dolaresData } = response;
                expect(response).toStrictEqual(MOCK_DOLAR_FULL_RESPONSE);

                dolaresData.forEach((dolar, index) => {
                    expect(dolar.sourceName).toStrictEqual(
                        termicasDolar[index]
                    );
                });
            })
            .then(done);
    });

    it('Should return data in the correct order acording to termicas order and missing dolars types', async done => {
        const termicasDolar = [
            'dbna',
            'dblue',
            'euro',
            'dmayorista',
            'dturista',
            'dtarjeta'
        ];
        fetch(query, {
            cachedCall: jest.fn(async () => ({
                Termicas: {
                    dolares: termicasDolar
                }
            }))
        })
            .then(response => {
                const { data: dolaresData } = response;

                expect(response).toStrictEqual(MOCK_DOLAR_PARTIAL_RESPONSE);

                dolaresData.forEach((dolar, index) => {
                    expect(dolar.sourceName).toStrictEqual(
                        termicasDolar[index]
                    );
                });
            })
            .then(done);
    });

    it('Should catch error when cachedCall request for termicas data is rejected', done => {
        fetch(query, {
            cachedCall: jest.fn(async () => Promise.reject('Mocked Error'))
        })
            .then(() => {
                expect(loggerPush).toBeCalledTimes(1);
                expect(loggerPush).toBeCalledWith(
                    'Mocked Error',
                    {
                        data: 'navigationTreeSource cachedCall',
                        source: 'content/sources/dolarSource'
                    },
                    'la-nacion-ar'
                );
            })
            .then(done);
    });
    it('Should catch error when request for dolar data is rejected', done => {
        mockRequestResponse.mockReturnValueOnce(Promise.reject('Mocked Error'));

        fetch(query, {
            cachedCall: jest.fn(async () => ({
                Termicas: {
                    dolares: ['dbna', 'dblue']
                }
            }))
        })
            .then(() => {
                expect(loggerPush).toBeCalledTimes(1);
                expect(loggerPush).toBeCalledWith(
                    'Mocked Error',
                    {
                        source: 'content/sources/dolarSource',
                        url:
                            'https://arcservices.lanacion.com.ar/api/v1/quotations'
                    },
                    'la-nacion-ar'
                );
            })
            .then(done);
    });
});
