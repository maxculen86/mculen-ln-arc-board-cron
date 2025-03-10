import nodeFetch from 'node-fetch';
import { handleHttpError } from '../../../components/private/common/utils/handleHttpError';
import transformData from '../../../content/sources/utils/relatedContentSource/_helper';
import logger from '../../../components/private/common/utils/logger';
import relatedContentSource, {
    fetch
} from '../../../content/sources/relatedContentSource';
import relatedContentData from '../../../__mocks__/data/relatedContentSource/relatedContentSource.json';

jest.mock('node-fetch');
jest.mock('../../../components/private/common/utils/handleHttpError');
jest.mock('../../../content/sources/utils/relatedContentSource/_helper');
jest.mock('../../../components/private/common/utils/logger');
jest.mock('fusion:environment', () => ({
    ARC_ACCESS_TOKEN: '1111324234234324',
    CONTENT_BASE: 'https://wwww.lanacion.com.ar'
}));

describe('fetch function', () => {
    const query = {
        id: 'XL4ECIXVXFDPHMKFC3GBVG5IOQ',
        imageConfig: 'boxArticles',
        'arc-site': 'la-nacion-ar'
    };
    const cachedCall = jest.fn();

    beforeEach(() => {
        nodeFetch.mockReset();
        handleHttpError.mockReset();
        transformData.mockReset();
        logger.push.mockReset();
    });

    it('should fetch data correctly and transform it', async () => {
        const response = {
            json: jest.fn().mockResolvedValue(relatedContentData)
        };

        nodeFetch.mockResolvedValue(response);
        handleHttpError.mockImplementation(() => {});
        transformData.mockResolvedValue(relatedContentData);

        await relatedContentSource.fetch(query, { cachedCall });

        expect(nodeFetch).toHaveBeenCalledWith(
            'https://wwww.lanacion.com.ar/content/v4/related-content/stories/?website=la-nacion-ar&_id=XL4ECIXVXFDPHMKFC3GBVG5IOQ',
            {
                method: 'GET',
                headers: { Authorization: `Bearer 1111324234234324` }
            }
        );
        expect(handleHttpError).toHaveBeenCalledWith(response);
        expect(transformData).toHaveBeenCalledWith(
            relatedContentData,
            query,
            cachedCall
        );
    });

    it('should handle errors correctly and return an empty object', async () => {
        const mockError = new Error('Fetch failed');

        nodeFetch.mockRejectedValue(mockError);

        const result = await relatedContentSource.fetch(query, { cachedCall });

        expect(logger.push).toHaveBeenCalledWith(mockError, {
            source: 'content/sources/relatedContentSource',
            query: query
        });
        expect(result).toEqual({});
    });
});
