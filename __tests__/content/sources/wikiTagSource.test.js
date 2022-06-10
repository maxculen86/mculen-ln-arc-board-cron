import 'regenerator-runtime/runtime';
import { LANACION_SERVICES_URL } from 'fusion:environment';
import logger from '../../../components/private/common/utils/logger';
import wikiTagSource from '../../../content/sources/wikiTagSource';
import mockWikiData from '../../../__mocks__/data/wikiTag/messiDataMock';
import getProperties from 'fusion:properties';

const mockGetReq = jest.fn();

jest.mock('../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

jest.mock('../../../content/sources/utils/getRequest', () => () =>
    mockGetReq()
);

jest.mock('fusion:properties', () => () => ({
    getProperties: () => []
}));

const loggerPush = jest.spyOn(logger, 'push');

describe('Content Sources - Wiki Tag Source', () => {
    const { fetch, resolve, transform } = wikiTagSource;

    const query = { slug: 'lionel-messi-tid1619' };
    const siteProps = { imageConfig: '', 'arc-site': 'la-nacion-ar' };

    it('should test fetch function', done => {
        mockGetReq.mockResolvedValue(mockWikiData);
        fetch(query)
            .then(response => expect(response).toStrictEqual(mockWikiData))
            .then(done);
    });

    it('should get uri data correctly', () => {
        expect(resolve(query)).toStrictEqual(
            'https://arcservices.lanacion.com.ar/api/v1/tags/lionel-messi-tid1619'
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
