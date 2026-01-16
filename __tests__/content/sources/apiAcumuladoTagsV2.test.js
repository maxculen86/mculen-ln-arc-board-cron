import apiAcumuladoTagsV2 from '../../../content/sources/apiAcumuladoTagsV2';
import {
    getSizeParamFromQuery,
    getPageParamFromQuery
} from '../../../content/sources/apiAcumuladoTagsV2';
import acuArticleSourceResponseMock from '../../../__mocks__/data/acuArticleByAuthor/articleSourceAuthor.json';
import acuArticlesSource from '../../../content/sources/acuArticlesSource';
import tagSource from '../../../content/sources/tagSource';
import NotFoundError from '../../../content/sources/utils/notFoundError';

acuArticlesSource.fetch = jest.fn();

tagSource.fetch = jest.fn();

describe('content source apiAcumuladoTagsV2 integration test', () => {
    test('should return right output if notes exists', async () => {
        const queryParams = {
            uri: '/api/mobile/v2//byTag/slug-example-221/params=size:30;page:1/33/',
            website: 'la-nacion-ar',
            slug: 'slug-example-221',
            params: 'params=size:30;page:1',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };

        tagSource.fetch.mockReturnValue({
            Payload: {
                items: [
                    {
                        slug: 'test-slug',
                        name: 'test name'
                    }
                ]
            }
        });

        acuArticlesSource.fetch.mockReturnValue(acuArticleSourceResponseMock);

        const result = await apiAcumuladoTagsV2.fetch(queryParams, {});

        expect(Object.keys(result.metadata).sort()).toEqual(
            ['paginate', 'title', 'total', 'banners', 'topic'].sort()
        );

        expect(Object.keys(result.metadata.topic).sort()).toEqual(
            [
                'id',
                'slug',
                'value',
                'typeId',
                'formatId',
                'typeDescription'
            ].sort()
        );
    });

    test('should return 404 if tag does not exists', async () => {
        const queryParams = {
            uri: '/api/mobile/v2//byTag/slug-example-221/params=size:30;page:1/33/',
            website: 'la-nacion-ar',
            slug: 'slug-example-221',
            params: 'params=size:30;page:1',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };

        tagSource.fetch.mockImplementation(() => {
            throw new NotFoundError();
        });

        acuArticlesSource.fetch.mockReturnValue(acuArticleSourceResponseMock);

        await expect(apiAcumuladoTagsV2.fetch(queryParams, {})).rejects.toThrow(
            new NotFoundError(`Tag no encontrado: ${queryParams.slug}`)
        );
    });
});

describe('apiAcumuladoTagsV2 utils', () => {
    describe('getSizeParamFromQuery', () => {
        it('should return the correct size from the query when size parameter exists', () => {
            const query = { params: 'size:100' };
            const result = getSizeParamFromQuery(query);

            expect(result).toBe(100);
        });

        it('should return the default size when size parameter does not exist', () => {
            const query = { params: '' };
            const result = getSizeParamFromQuery(query);

            expect(result).toBe(30);
        });

        it('should return the default size when the size parameter has no numeric value', () => {
            const query = { params: 'size:abc' };
            const result = getSizeParamFromQuery(query);

            expect(result).toBe(30);
        });

        it('should return the default size when the size parameter is malformed', () => {
            const query = { params: 'sizex:100' };
            const result = getSizeParamFromQuery(query);

            expect(result).toBe(30);
        });

        it('should return the default size when params is not a string', () => {
            const query = { params: null };
            const result = getSizeParamFromQuery(query);

            expect(result).toBe(30);
        });

        it('should return the correct size when the size parameter is the only one in the query', () => {
            const query = { params: 'size:45' };
            const result = getSizeParamFromQuery(query);

            expect(result).toBe(45);
        });

        it('should return the default size when the regex does not match anything in params', () => {
            const query = { params: 'noSizeParamHere' };
            const result = getSizeParamFromQuery(query);

            expect(result).toBe(30);
        });
    });

    describe('getPageParamFromQuery', () => {
        it('should return the correct page number when page parameter exists', () => {
            const query = { params: 'page:3' };
            const result = getPageParamFromQuery(query);

            expect(result).toBe(3);
        });

        it('should return the default page number (1) when page parameter does not exist', () => {
            const query = { params: '' };
            const result = getPageParamFromQuery(query);

            expect(result).toBe(1);
        });

        it('should return the default page number (1) when page parameter has no numeric value', () => {
            const query = { params: 'page:abc' };
            const result = getPageParamFromQuery(query);

            expect(result).toBe(1);
        });

        it('should throw an error when the page parameter is less than 1', () => {
            const query = { params: 'page:0' };

            expect(() => {
                getPageParamFromQuery(query);
            }).toThrow('Page parameter should be more than 1');
        });

        it('should return the page number as 1 when page parameter is 1', () => {
            const query = { params: 'page:1' };
            const result = getPageParamFromQuery(query);

            expect(result).toBe(1);
        });

        it('should return the page number when page parameter is the only one in the query', () => {
            const query = { params: 'page:45' };
            const result = getPageParamFromQuery(query);

            expect(result).toBe(45);
        });

        it('should return the default page number (1) when params is not a string', () => {
            const query = { params: null };
            const result = getPageParamFromQuery(query);

            expect(result).toBe(1);
        });

        it('should return the default page number (1) when the regex does not match anything in params', () => {
            const query = { params: 'noPageParamHere' };
            const result = getPageParamFromQuery(query);

            expect(result).toBe(1);
        });
    });
});
