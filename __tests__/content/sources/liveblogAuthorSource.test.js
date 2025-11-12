import liveblogAuthorSource from '../../../content/sources/liveblogAuthorSource';
import logger from '../../../components/private/common/utils/logger';
import { resizeImgUrl } from '../../../components/private/common/utils/image/resizer/v2/resizerHelper';
import { signingServiceCachedCall } from '../../../content/sources/utils/signingServiceSource/getImagesAuth';

jest.mock('../../../components/private/common/utils/handleHttpError');
jest.mock('../../../components/private/common/utils/logger');
jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.sandbox.lanacionar.arcpublishing.com'
}));
jest.mock(
    '../../../content/sources/utils/signingServiceSource/getImagesAuth',
    () => ({
        signingServiceCachedCall: jest.fn()
    })
);

jest.mock(
    '../../../components/private/common/utils/image/resizer/v2/resizerHelper',
    () => ({
        resizeImgUrl: jest.fn()
    })
);

global.fetch = jest.fn();

const mockAuthorsResponse = {
    authors: [
        {
            _id: 'micaela-palomo-2022',
            byline: 'Micaela Palomo',
            firstName: 'Micaela',
            lastName: 'Palomo',
            author_type: 'Estándar',
            email: '',
            image: '',
            twitter: '',
            status: true,
            role: 'LA NACION',
            longBio: '',
            slug: 'micaela-palomo-2022',
            bio_page: '/autor/micaela-palomo-2022/',
            last_updated_date: '2019-11-12T19:01:53.687Z',
            books: [],
            podcasts: [],
            education: [],
            awards: []
        },
        {
            _id: 'micaela-urdinez-332',
            byline: 'Micaela Urdinez',
            firstName: 'Micaela',
            lastName: 'Urdinez',
            author_type: 'Estándar',
            email: '',
            image: 'https://bucket.glanacion.com/anexos/fotos/97/2613697.png',
            twitter: '@murdinez',
            status: true,
            role: 'LA NACION',
            longBio: '',
            slug: 'micaela-urdinez-332',
            bio_page: '/autor/micaela-urdinez-332/',
            last_updated_date: '2019-11-12T18:13:47.596Z',
            books: [],
            podcasts: [],
            education: [],
            awards: []
        },
        {
            _id: 'micaela-valentin-9364',
            byline: 'Micaela Valentin',
            firstName: 'Micaela',
            lastName: 'Valentin',
            author_type: 'Estándar',
            email: '',
            image: '',
            twitter: '',
            status: true,
            role: '',
            longBio: '',
            slug: 'micaela-valentin-9364',
            bio_page: '/autor/micaela-valentin-9364/',
            last_updated_date: '2019-11-13T18:02:02.199Z',
            books: [],
            podcasts: [],
            education: [],
            awards: []
        },
        {
            _id: 'micaela-wietz-9349',
            byline: 'Micaela Wietz',
            firstName: 'Micaela',
            lastName: 'Wietz',
            author_type: 'Estándar',
            email: '',
            image: '',
            twitter: '',
            status: true,
            role: 'PARA LA NACION',
            longBio: '',
            slug: 'micaela-wietz-9349',
            bio_page: '/autor/micaela-wietz-9349/',
            last_updated_date: '2019-11-13T18:01:53.803Z',
            books: [],
            podcasts: [],
            education: [],
            awards: []
        }
    ]
};

describe('liveblogAuthorSource.fetch', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => mockAuthorsResponse
        });

        signingServiceCachedCall.mockResolvedValue({ hash: 'mockedHash' });
        resizeImgUrl.mockImplementation(({ arcImage }) => {
            return `https://sandbox-resizer.glanacion.com/resizer/v2/${encodeURIComponent(
                arcImage.url
            )}?auth=${arcImage.auth[1]}&width=280&quality=70&smart=false`;
        });
    });

    it('should return a transformed list of authors', async () => {
        const result = await liveblogAuthorSource.fetch(
            { authorName: 'micaela' },
            { cachedCall: jest.fn() }
        );

        expect(result).toHaveLength(4);
        expect(result[0].byline).toBe('Micaela Palomo');
        expect(result[1].image).toContain(
            'sandbox-resizer.glanacion.com/resizer/v2/'
        );
        expect(resizeImgUrl).toHaveBeenCalled();
    });

    it('should log error and return empty array on failure', async () => {
        global.fetch.mockRejectedValue(new Error('Failed fetch'));

        const result = await liveblogAuthorSource.fetch(
            { authorName: 'micaela' },
            { cachedCall: jest.fn() }
        );

        expect(logger.push).toHaveBeenCalledWith(
            expect.any(Error),
            expect.objectContaining({
                source: 'content/sources/liveblogAuthorSource',
                url: expect.stringContaining(
                    '/author/v2/author-service?byline=micaela'
                )
            }),
            undefined
        );

        expect(result).toEqual([]);
    });
});
