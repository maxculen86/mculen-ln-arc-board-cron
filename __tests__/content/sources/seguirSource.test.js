import 'regenerator-runtime/runtime';
import env from '../../../__mocks__/fusion:environment';
import properties from '../../../__mocks__/fusion:properties';
import seguir from '../../../content/sources/seguirSource.js';
import tokenOk from '../../../__mocks__/data/personalizacion/token_ok.json';
import responseCase1 from '../../../__mocks__/data/personalizacion/response_case1.json';

const mockRequestResponse = jest
    .fn()
    .mockImplementation(() => Promise.resolve(tokenOk));

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } })
    })
);

beforeEach(() => {
    fetch.mockClear();
});

jest.mock('request-promise-native', () => {
    return {
        __esModule: true,
        default: () => mockRequestResponse()
    };
});
const { fetch: seguirFetch } = seguir;

describe('Content - Sources - seguirSource', () => {
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
        const result = await seguirFetch(query, {
            cachedCall: jest.fn()
        });
        expect(result).toBeTruthy();
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
