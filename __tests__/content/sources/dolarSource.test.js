import 'regenerator-runtime/runtime';
import dolarSource from '../../../content/sources/dolarSource';
import logger from '../../../components/private/common/utils/logger';
import MOCK_API_RESPONSE from '../../../__mocks__/data/apiDolar/apiDolares.json';
import MOCK_DOLAR_FULL_RESPONSE from '../../../__mocks__/data/apiDolar/sourceFullResponse.json';
import MOCK_DOLAR_PARTIAL_RESPONSE from '../../../__mocks__/data/apiDolar/sourcePartialResponse.json';

jest.mock('fusion:environment', () => ({
    LANACION_SERVICES_URL: 'https://arcservices.lanacion.com.ar'
}));

jest.mock('../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});
const loggerPush = jest.spyOn(logger, 'push');

beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = jest.fn(() => {
        return Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(MOCK_API_RESPONSE)
        });
    });
});

describe('Content Sources - Dolar Source', () => {
    const { fetch } = dolarSource;

    const query = {
        'arc-site': 'la-nacion-ar'
    };

    it('Should return data in the correct order when all dolar types are set', async () => {
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

        const response = await fetch(query, {
            cachedCall: jest.fn(() =>
                Promise.resolve({ Termicas: { dolares: termicasDolar } })
            )
        });

        expect(response).toStrictEqual(MOCK_DOLAR_FULL_RESPONSE);
    });

    it('Should return data in the correct order according to termicas order and missing dolars types', async () => {
        const termicasDolar = [
            'dbna',
            'dblue',
            'euro',
            'dmayorista',
            'dturista',
            'dtarjeta'
        ];

        const response = await fetch(query, {
            cachedCall: jest.fn(() =>
                Promise.resolve({ Termicas: { dolares: termicasDolar } })
            )
        });

        expect(response).toStrictEqual(MOCK_DOLAR_PARTIAL_RESPONSE);
    });

    it('Should catch error when cachedCall request for termicas data is rejected', async () => {
        await fetch(query, {
            cachedCall: jest.fn(() => Promise.reject('Mocked Error'))
        });

        expect(loggerPush).toBeCalledTimes(1);
        expect(loggerPush).toBeCalledWith(
            'Mocked Error',
            {
                data: 'navigationTreeSource cachedCall',
                source: 'content/sources/dolarSource'
            },
            'la-nacion-ar'
        );
    });

    it('Should catch error when request for dolar data is rejected', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.reject(new Error('Mocked Error'))
        );

        await fetch(query, {
            cachedCall: jest.fn(() =>
                Promise.resolve({ Termicas: { dolares: ['dbna', 'dblue'] } })
            )
        });

        expect(loggerPush).toBeCalledTimes(1);
        expect(loggerPush).toBeCalledWith(
            new Error('Mocked Error'),
            {
                source: 'content/sources/dolarSource',
                url: 'https://arcservices.lanacion.com.ar/api/v1/quotations'
            },
            'la-nacion-ar'
        );
    });

    it('Should log 504 on AbortError (timeout)', async () => {
        const abortError = new Error('Timeout');
        abortError.name = 'AbortError';

        global.fetch.mockImplementationOnce(() => Promise.reject(abortError));

        await fetch(query, {
            cachedCall: jest.fn(() =>
                Promise.resolve({
                    Termicas: { dolares: ['dbna', 'dblue'] }
                })
            )
        });

        expect(loggerPush).toBeCalledTimes(1);
        expect(loggerPush).toBeCalledWith(
            { ...abortError, statusCode: 504 },
            {
                source: 'content/sources/dolarSource',
                url: 'https://arcservices.lanacion.com.ar/api/v1/quotations'
            },
            'la-nacion-ar'
        );
    });
});
