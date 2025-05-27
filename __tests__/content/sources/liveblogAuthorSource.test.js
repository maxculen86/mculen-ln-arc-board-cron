import nodeFetch from 'node-fetch';
import liveblogAuthorSource from '../../../content/sources/liveblogAuthorSource';
import { handleHttpError } from '../../../components/private/common/utils/handleHttpError';
import logger from '../../../components/private/common/utils/logger';

jest.mock('node-fetch');
jest.mock('../../../components/private/common/utils/handleHttpError');
jest.mock('../../../components/private/common/utils/logger');
jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.sandbox.lanacionar.arcpublishing.com'
}));

const mockResponse = {
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
    ],
    more: false,
    _id: '29f788a5ec20aa3c54cfcf2364417bd95967c5e4db59028b9ce3af918b4adc1d'
};

describe('liveblogAuthorSource.fetch', () => {
    it('should return authors when authorName is "micaela"', async () => {
        nodeFetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const result = await liveblogAuthorSource.fetch({
            authorName: 'micaela'
        });

        expect(handleHttpError).toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
    });

    it('should log an error and return undefined on fetch failure', async () => {
        const error = new Error('Network error');
        nodeFetch.mockRejectedValue(error);

        const result = await liveblogAuthorSource.fetch({
            authorName: 'micaela'
        });

        expect(logger.push).toHaveBeenCalledWith(
            error,
            expect.objectContaining({
                source: expect.stringContaining('liveblogAuthorSource')
            })
        );
        expect(result).toBeUndefined();
    });
});
