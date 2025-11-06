import 'regenerator-runtime/runtime';
import navigationTreeSource from '../../../content/sources/navigationTreeSource';
import logger from '../../../components/private/common/utils/logger';

jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://arc-api.com',
    ARC_ACCESS_TOKEN: 'test-token'
}));

jest.mock('../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

const loggerPush = jest.spyOn(logger, 'push');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Content Sources - Navigation Tree Source', () => {
    const mockNavigationResponse = {
        _id: '/test',
        name: 'Test Site',
        children: [
            {
                _id: '/test/section1',
                name: 'Section 1',
                children: []
            }
        ],
        Termicas: {
            dolares: ['dolar_oficial', 'dolar_blue']
        }
    };

    beforeEach(() => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockNavigationResponse)
            });
        });
    });

    it('should fetch navigation tree successfully with global.fetch', async () => {
        const query = { website: 'test-site' };
        const result = await navigationTreeSource.fetch(query);

        expect(global.fetch).toHaveBeenCalledWith(
            'https://arc-api.com/site/v3/navigation/test-site/',
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer test-token'
                }
            }
        );

        expect(result).toEqual({
            _id: '/test',
            name: 'Test Site',
            children: [],
            Termicas: {
                dolares: ['dolar_oficial', 'dolar_blue']
            }
        });
    });

    it('should fetch navigation tree with sectionId and return sections and Termicas', async () => {
        const query = { website: 'test-site', sectionId: '/test/section1' };
        const result = await navigationTreeSource.fetch(query);

        expect(result).toEqual({
            sections: [
                {
                    id: '/test',
                    name: 'Test Site',
                    path: '/test'
                }
            ],
            Termicas: {
                dolares: ['dolar_oficial', 'dolar_blue']
            }
        });
    });

    it('should handle missing website parameter', async () => {
        const query = {};

        await expect(navigationTreeSource.fetch(query)).rejects.toThrow(
            'Debe definir un website para obtener el arbol de navigation'
        );
    });

    it('should handle fetch errors and log them', async () => {
        const query = { website: 'test-site' };
        const fetchError = new Error('Network error');

        global.fetch = jest.fn(() => Promise.reject(fetchError));

        const result = await navigationTreeSource.fetch(query);

        expect(loggerPush).toHaveBeenCalledWith(
            fetchError,
            { source: 'content/source/navigationTreeSource', query },
            query
        );
        expect(result).toBeUndefined();
    });

    it('should handle JSON parsing errors', async () => {
        const query = { website: 'test-site' };
        const jsonError = new Error('JSON parse error');

        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.reject(jsonError)
            });
        });

        const result = await navigationTreeSource.fetch(query);

        expect(loggerPush).toHaveBeenCalledWith(
            jsonError,
            { source: 'content/source/navigationTreeSource', query },
            query
        );
        expect(result).toBeUndefined();
    });

    it('should maintain transform logic for sections correctly', async () => {
        const complexResponse = {
            _id: '/root',
            name: 'Root',
            children: [
                {
                    _id: '/sports',
                    name: 'Sports',
                    children: [
                        {
                            _id: '/sports/football',
                            name: 'Football',
                            children: []
                        }
                    ]
                }
            ],
            Termicas: { test: 'data' }
        };

        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(complexResponse)
            });
        });

        const query = { website: 'test-site', sectionId: '/sports/football' };
        const result = await navigationTreeSource.fetch(query);

        expect(result.sections).toEqual([
            { id: '/root', name: 'Root', path: '/root' },
            { id: '/sports', name: 'Sports', path: '/sports' },
            {
                id: '/sports/football',
                name: 'Football',
                path: '/sports/football'
            }
        ]);
        expect(result.Termicas).toEqual({ test: 'data' });
    });

    it('should use correct headers format with Authorization Bearer', async () => {
        const query = { website: 'test-site' };
        await navigationTreeSource.fetch(query);

        expect(global.fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                headers: {
                    Authorization: 'Bearer test-token'
                }
            })
        );
    });
});
