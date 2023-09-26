import apiAcumuladoTagsV2 from '../../../content/sources/apiAcumuladoTagsV2';

import acuArticleSourceResponseMock from '../../../__mocks__/data/acuArticleByAuthor/articleSourceAuthor.json';
import acuArticlesSource from '../../../content/sources/acuArticlesSource';
import tagSource from '../../../content/sources/tagSource';
import NotFoundError from '../../../content/sources/utils/notFoundError';

acuArticlesSource.fetch = jest.fn();

tagSource.fetch = jest.fn();

describe('content source apiAcumuladoTagsV2 integration test', () => {
    test('should return right output if notes exists', async () => {
        const queryParams = {
            uri:
                '/api/mobile/v2//byTag/slug-example-221/params=size:30;page:1/33/',
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
            uri:
                '/api/mobile/v2//byTag/slug-example-221/params=size:30;page:1/33/',
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
