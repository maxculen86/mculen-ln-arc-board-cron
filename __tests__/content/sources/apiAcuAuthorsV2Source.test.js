import apiAcuAuthorsV2Source from '../../../content/sources/apiAcuAuthorsV2Source';
import acuArticleSourceResponseMock from '../../../__mocks__/data/acuArticleByAuthor/articleSourceAuthor.json';
import acuArticlesSource from '../../../content/sources/acuArticlesSource';
import authorSource from '../../../content/sources/authorSource';
import NotFoundError from '../../../content/sources/utils/notFoundError';
const mockNotFoundError = NotFoundError;

acuArticlesSource.fetch = jest.fn();
acuArticlesSource.fetch.mockReturnValue(acuArticleSourceResponseMock);

jest.mock('fusion:environment', () => ({
    ARC_ACCESS_TOKEN: '1111324234234324',
    CONTENT_BASE: 'https://wwww.lalalal.com'
}));
const { fetch: autorSourceFetch } = authorSource;

const cachedCall = async (nameOfCall, callbackFunc, params) => {
    return callbackFunc(params);
};

beforeEach(() => {
    global.fetch = jest.fn(uri => {
        if (uri.includes('not-exists')) {
            throw new mockNotFoundError();
        }
        const authorDataMock = {
            _id: 'alfredo-leuco-330',
            byline: 'Alfredo Leuco',
            firstName: 'Alfredo',
            lastName: 'Leuco',
            author_type: 'Estándar',
            email: '',
            image: '',
            status: true,
            role: 'PARA LA NACION',
            longBio: '',
            slug: 'alfredo-leuco-330',
            bio_page: '/autor/alfredo-leuco-330/',
            last_updated_date: '2021-02-25T10:53:27.226Z',
            books: [],
            podcasts: [],
            education: [],
            awards: []
        };

        return Promise.resolve({
            ok: true,
            status: 200,
            statusText: 'OK',
            json: () => Promise.resolve(authorDataMock)
        });
    });
    jest.clearAllMocks();
});

describe('content source apiAcuAuthorsV2Source integration test', () => {
    test('should return right output if notes exists', async () => {
        const queryParams = {
            uri: '/api/mobile/v2//byAuthor/slug-example-221/params=size:30;page:1/33/',
            website: 'la-nacion-ar',
            authorId: 'slug-example-221',
            params: 'params=size:30;page:1',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar',
            _id: 'lalallalal'
        };

        await autorSourceFetch(queryParams, {
            cachedCall: jest.fn(() => Promise.resolve('/url'))
        });

        acuArticlesSource.fetch.mockReturnValue(acuArticleSourceResponseMock);

        const result = await apiAcuAuthorsV2Source.fetch(queryParams, {
            cachedCall
        });

        expect(Object.keys(result.metadata).sort()).toEqual(
            ['author', 'paginate', 'title', 'total', 'banners'].sort()
        );

        expect(Object.keys(result.metadata.author).sort()).toEqual(
            ['id', 'slug', 'value', 'role'].sort()
        );
    });

    test('should return 404 if author does not exists', async () => {
        const queryParams = {
            uri: '/api/mobile/v2//byAuthor/slug-example-221/params=size:30;page:1/33/',
            website: 'la-nacion-ar',
            authorId: 'slug-example-221',
            params: 'params=size:30;page:1',
            categoryUri: 'mobile',
            versionUri: '2',
            'arc-site': 'la-nacion-ar'
        };
        try {
            await autorSourceFetch(queryParams, {
                cachedCall: jest.fn(() => Promise.resolve('/not-exists'))
            });
        } catch (err) {
            expect(err.message).toBe(`El id de autor es necesario. `);
        }
    });
});
