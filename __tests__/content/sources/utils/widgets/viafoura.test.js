import logger from '../../../../../components/private/common/utils/logger';
import viafoura from '../../../../../content/sources/utils/widgets/viafoura';

jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.sandbox.lanacionar.arcpublishing.com'
}));
jest.mock('../../../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

describe('content - sources - utils - widgets - viafoura.js:', () => {
    const { getUri, resolve, reject } = viafoura;
    const queryData = {
        arcSite: 'la-nacion-ar',
        params: ['6QVJ6UJ5ONGZ7KOLBTEWXISGHI', 'SUBSCRIPTION'],
        uri: '/widgets/viafoura/6QVJ6UJ5ONGZ7KOLBTEWXISGHI/SUBSCRIPTION/',
        widget: 'viafoura'
    };
    const loggerPush = jest.spyOn(logger, 'push');

    describe('function getUri', () => {
        it('when query is defined should return expected api uri', () => {
            expect(getUri(queryData)).toBe(
                `https://api.sandbox.lanacionar.arcpublishing.com/content/v4/stories/?website=la-nacion-ar&_id=6QVJ6UJ5ONGZ7KOLBTEWXISGHI&published=true&included_fields=headlines,canonical_url`
            );
        });

        it('when query is undefined should return an Error', () => {
            try {
                getUri();
            } catch (e) {
                expect(e.message).toBe(
                    'Debe definir url o id para obtener la nota'
                );
            }
        });
    });

    describe('function resolve', () => {
        it('when response and query are defined should return expected response', () => {
            const responseFromFetch = {
                canonical_url: 'url-de-la-nota-nid123123',
                headlines: {
                    basic: 'Título largo para desktop',
                    mobile: 'Título corto para mobile'
                }
            };
            const expectedResponse = {
                ...responseFromFetch,
                ...queryData,
                _id: '6QVJ6UJ5ONGZ7KOLBTEWXISGHI',
                messageType: 'SUBSCRIPTION'
            };

            expect(
                resolve({
                    response: responseFromFetch,
                    query: queryData
                })
            ).toStrictEqual(expectedResponse);
        });
        it('when response and query are undefined should return default response', () => {
            expect(resolve()).toStrictEqual({
                _id: '',
                messageType: ''
            });
        });
    });

    describe('function reject', () => {
        it('should call looger 1 time', () => {
            reject({
                error: { message: 'Mensaje de error' }
            });
            expect(loggerPush).toBeCalledTimes(1);
        });
    });
});
