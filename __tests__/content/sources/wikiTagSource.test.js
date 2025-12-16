import 'regenerator-runtime/runtime';
import logger from '../../../components/private/common/utils/logger';
import wikiTagSource from '../../../content/sources/wikiTagSource';
import mockWikiData from '../../../__mocks__/data/wikiTag/messiDataMock';

const mockGetReq = jest.fn();

jest.mock('../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

jest.mock(
    '../../../content/sources/utils/getRequestWithJson',
    () => () => mockGetReq()
);

jest.mock('fusion:properties', () => () => ({
    getProperties: () => []
}));

jest.mock('fusion:environment', () => ({
    STRAPI_API_URL: 'https://admin-lanacion.lnapps.com.ar'
}));

const loggerPush = jest.spyOn(logger, 'push');

describe('Content Sources - Wiki Tag Source', () => {
    const { fetch, resolve } = wikiTagSource;

    const query = { slug: 'lionel-messi-tid1619' };

    it('should test fetch function', done => {
        mockGetReq.mockResolvedValue(mockWikiData);
        fetch(query)
            .then(response => expect(response).toStrictEqual(mockWikiData))
            .then(done);
    });

    it('should get uri data correctly', () => {
        expect(resolve(query)).toStrictEqual(
            'https://admin-lanacion.lnapps.com.ar/api/v1/tags/lionel-messi-tid1619'
        );
    });

    it('Should reject request and log error', done => {
        mockGetReq.mockReturnValueOnce(Promise.reject());
        mockGetReq.mockImplementation(() => {
            throw new Error();
        });
        fetch({})
            .then(() => expect(loggerPush).toBeCalledTimes(1))
            .then(done);
    });
});
