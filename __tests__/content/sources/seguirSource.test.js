import 'regenerator-runtime/runtime';
import seguir, { resolveUri } from '../../../content/sources/seguirSource.js';
import tokenOk from '../../../__mocks__/data/personalizacion/token_ok.json';
import responseCase1 from '../../../__mocks__/data/personalizacion/response_case1.json';

jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.sandbox.lanacionar.arcpublishing.com'
}));
const mockRequestResponse = jest
    .fn()
    .mockImplementation(() => Promise.resolve(tokenOk));
const mockRequestResponseNoData = jest
    .fn()
    .mockImplementation(() => Promise.resolve());

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(tokenOk)
    })
);

beforeEach(() => {
    fetch.mockClear();
});

jest.mock('request-promise-native', () => {
    let result = {
        __esModule: true,
        default: x => {
            if (x.headers.Authorization === 'bad') {
                throw new Error(
                    'User is not authorized to access this resource with an explicit deny'
                );
            }
            if (x.headers.Authorization === 'nodata') {
                return mockRequestResponseNoData();
            }
            return mockRequestResponse();
        }
    };

    return result;
});
const { fetch: seguirFetch } = seguir;
describe('Content - Sources - seguirSource', () => {
    let responseCase = responseCase1;
    let query = {
        page: '1',
        size: '5',
        days: '5',
        token: '1F8794A8-BE03-48F9-B023-74356CE9C9F5',
        autor: null,
        seccion: null,
        tags: null,
        api: true,
        sizeFollow: 40
    };
    it('Validate Results Personalization', async () => {
        query.token = '1F8794A8-BE03-48F9-B023-74356CE9C9F5';
        const result = await seguirFetch(query, {
            cachedCall: jest.fn(() => Promise.resolve(responseCase1))
        });
        expect(result).toBeTruthy();
        expect(result).toHaveProperty('content_elements');
        expect(result).toHaveProperty('followedItems');
        expect(result.followedItems[0]).toMatchObject({
            type: 'autor',
            slug: 'claudio-cervino-205'
        });
        expect(result.followedItems[1]).toMatchObject({
            type: 'autor',
            slug: 'cristian-mira-230'
        });
        expect(result.followedItems[2]).toMatchObject({
            type: 'autor',
            slug: 'graciela-guadalupe-137'
        });
        expect(result.followedItems[3]).toMatchObject({
            type: 'autor',
            slug: 'orlando-j-ferreres-84'
        });
    });

    it('Validate Results No Elements Personalization', async () => {
        responseCase.content_elements = [];
        query.token = 'nodata';

        const result = await seguirFetch(query, {
            cachedCall: jest.fn(() => Promise.resolve(responseCase))
        });
        expect(result).toBeTruthy();
        expect(result).toHaveProperty('content_elements');
        expect(result).toHaveProperty('followedItems');
        expect(result.followedItems).toHaveLength(0);
    });

    it('Validate Results token Bad to Personalization', async () => {
        responseCase.content_elements = [];
        query.token = 'bad';
        try {
            const result = await seguirFetch(query, {
                cachedCall: jest.fn(() => Promise.resolve(responseCase))
            });
            expect(result).toBeTruthy();
            expect(result).toHaveProperty('content_elements');
            expect(result).toHaveProperty('followedItems');
            expect(result.followedItems).toHaveLength(0);
        } catch (err) {
            expect(err.message).toBe(
                'User is not authorized to access this resource with an explicit deny'
            );
        }
    });

    it('Validate Results No Elements', async () => {
        responseCase.content_elements = [];
        query.token = '1F8794A8-BE03-48F9-B023-74356CE9C9F5';
        const result = await seguirFetch(query, {
            cachedCall: jest.fn(() => Promise.resolve(responseCase))
        });
        expect(result).toBeTruthy();
        expect(result).toHaveProperty('content_elements');
        expect(result).toHaveProperty('followedItems');
        expect(result.content_elements).toHaveLength(0);
    });

    it('Validate required parameters', async () => {
        query.token = null;

        try {
            await seguirFetch(query, {
                cachedCall: jest.fn()
            });
        } catch (err) {
            expect(err.message).toBe('Cantidad de parámetros inválidos');
        }
    });
});

describe('Content - Sources - seguirSource - resolveUri', () => {
    let query = {
        size: '5',
        days: '5',
        followedItems: [],
        'arc-site': 'la-nacion-ar'
    };
    it('should return correct Uri', () => {
        expect(resolveUri(query)).toBe(
            'https://api.sandbox.lanacionar.arcpublishing.com/content/v4/search/published?website=la-nacion-ar&size=5&from=0&_sourceExclude=geo,related_content,content_elements&sort=display_date:desc&body=%7B%22query%22:%7B%22bool%22:%7B%22must%22:%5B%7B%22range%22:%7B%22first_publish_date%22:%7B%22gte%22:%22now-6d%22,%22lte%22:%22now%22%7D%7D%7D,%7B%22term%22:%7B%22type%22:%22story%22%7D%7D,%7B%22term%22:%7B%22revision.published%22:true%7D%7D%5D,%22minimum_should_match%22:1,%22should%22:%5B%5D%7D%7D%7D'
        );
    });
});
