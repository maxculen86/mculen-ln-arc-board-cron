import apiAcuAuthorsV2Source from '../../../content/sources/apiAcuAuthorsV2Source';

import acuArticleSourceResponseMock from '../../../__mocks__/data/acuArticleByAuthor/articleSourceAuthor.json';
import acuArticlesSource from '../../../content/sources/acuArticlesSource';
import authorSource from '../../../content/sources/authorSource';
import NotFoundError from '../../../content/sources/utils/notFoundError';

const mockNotFoundError = NotFoundError;

acuArticlesSource.fetch = jest.fn();
acuArticlesSource.fetch.mockReturnValue(acuArticleSourceResponseMock);

authorSource.resolve = jest.fn();

const cachedCall = async (nameOfCall, callbackFunc, params) => {
    return await callbackFunc(params);
};

jest.mock('request-promise-native', () => {
    const mock = {
        __esModule: true,
        default: opt => {
            console.log('oppppt', opt);
            if (opt.uri.includes('not-exists')) {
                throw new mockNotFoundError();
            }
            const authorDataMock = {
                author_type: 'Estándar',
                awards: [],
                bio_page: '/autor/vinciane-smeets-9110/',
                books: [],
                byline: 'Vinciane Smeets',
                canonical_url: '/autor/vinciane-smeets-9110/',
                education: [],
                email: '',
                image: {
                    url:
                        'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/sZs50EMtDoyumsGsL1Hlp6g08S0=/280x0/filters:quality(100)/bucket.glanacion.com/anexos/fotos/33/3121633.png'
                },
                longBio: '',
                name: 'Vinciane Smeets',
                node_type: 'author',
                podcasts: [],
                role: 'PARA LA NACION',
                slug: 'vinciane-smeets-9110',
                twitter: '',
                _id: 'vinciane-smeets-9110',
                expertise: 'Deportes, Fútbol'
            };
            return Promise.resolve({
                body: authorDataMock
            });
        },
        defaults: () => mock.default
    };

    return mock;
});

describe('content source apiAcuAuthorsV2Source integration test', () => {
    test('should return right output if notes exists', async () => {
        const queryParams = {
            uri:
                '/api/mobile/v2//byAuthor/slug-example-221/params=size:30;page:1/33/',
            website: 'la-nacion-ar',
            authorId: 'slug-example-221',
            params: 'params=size:30;page:1',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };

        authorSource.resolve.mockReturnValue('/hardcoded-uri');

        acuArticlesSource.fetch.mockReturnValue(acuArticleSourceResponseMock);

        const result = await apiAcuAuthorsV2Source.fetch(queryParams, {
            cachedCall
        });

        expect(Object.keys(result.metadata).sort()).toEqual(
            ['author', 'paginate', 'title', 'total', 'banners'].sort()
        );

        expect(Object.keys(result.metadata.author).sort()).toEqual(
            [
                'id',
                'slug',
                'value',
                'image',
                'absoluteUrl',
                'twitter',
                'longBio',
                'languages',
                'books',
                'location',
                'affiliations',
                'education',
                'interests',
                'mail',
                'role'
            ].sort()
        );
    });

    test('should return 404 if author does not exists', async () => {
        const queryParams = {
            uri:
                '/api/mobile/v2//byAuthor/slug-example-221/params=size:30;page:1/33/',
            website: 'la-nacion-ar',
            authorId: 'slug-example-221',
            params: 'params=size:30;page:1',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };

        authorSource.resolve.mockReturnValue('/not-exists');

        acuArticlesSource.fetch.mockReturnValue(acuArticleSourceResponseMock);

        await expect(
            apiAcuAuthorsV2Source.fetch(queryParams, { cachedCall })
        ).rejects.toThrow(
            new NotFoundError(`Author not found: ${queryParams.authorId}`)
        );
    });
});
