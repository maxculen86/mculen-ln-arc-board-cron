import { renderHook, waitFor } from '@testing-library/react';
import useFetchSearchResults from '../../../../../components/layouts/LN-Buscador/hooks/useFetchSearchResults';

jest.mock('fusion:environment', () => ({
    API_QUERYLY: 'https://api.queryly.com',
    API_KEY_QUERYLY_LN: 'test-key',
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));
jest.mock('fusion:context', () => ({}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

const API_URL = 'https://api.queryly.com/json.aspx';

const makeSuccessResponse = (overrides = {}) => ({
    faceted: { section: [{ key: 'deportes', count: 10 }] },
    items: [{ id: '1', headlines: { basic: 'Test Article' } }],
    topics: [],
    related: [],
    metadata: { total: 1 },
    ...overrides
});

const setupFetchMocks = (apiData, { withTracking = false } = {}) => {
    if (withTracking) {
        mockFetch.mockResolvedValueOnce({});
    }
    mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(apiData)
    });
};

const getApiCallUrl = () => {
    const call = mockFetch.mock.calls.find(([url]) => url.includes(API_URL));
    return call ? call[0] : null;
};

const defaultProps = {
    queryUrl: 'tecnologia',
    filters: '',
    page: 0,
    sort: 'relevance',
    dateRange: { startDate: '', endDate: '' }
};

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    console.error.mockRestore();
});

describe('useFetchSearchResults — state behavior', () => {
    describe('initial loading state', () => {
        it('starts with loading: true', () => {
            setupFetchMocks(makeSuccessResponse(), { withTracking: true });
            const { result } = renderHook(() =>
                useFetchSearchResults(defaultProps)
            );
            expect(result.current.loading).toBe(true);
        });

        it('starts with empty articlesGrid', () => {
            setupFetchMocks(makeSuccessResponse(), { withTracking: true });
            const { result } = renderHook(() =>
                useFetchSearchResults(defaultProps)
            );
            expect(result.current.data.articlesGrid).toEqual([]);
        });
    });

    describe('successful fetch', () => {
        it('sets loading to false', async () => {
            setupFetchMocks(makeSuccessResponse(), { withTracking: true });
            const { result } = renderHook(() =>
                useFetchSearchResults(defaultProps)
            );
            await waitFor(() => expect(result.current.loading).toBe(false));
        });

        it('populates articlesGrid with fetched items', async () => {
            const items = [{ id: '1' }, { id: '2' }];
            setupFetchMocks(makeSuccessResponse({ items }), {
                withTracking: true
            });
            const { result } = renderHook(() =>
                useFetchSearchResults(defaultProps)
            );
            await waitFor(() =>
                expect(result.current.data.articlesGrid).toEqual(items)
            );
        });

        it('sets total from metadata', async () => {
            setupFetchMocks(makeSuccessResponse({ metadata: { total: 42 } }), {
                withTracking: true
            });
            const { result } = renderHook(() =>
                useFetchSearchResults(defaultProps)
            );
            await waitFor(() => expect(result.current.data.total).toBe(42));
        });

        it('sets isFinishPagination to true when items < 24', async () => {
            const items = Array.from({ length: 10 }, (_, i) => ({
                id: `${i}`
            }));
            setupFetchMocks(makeSuccessResponse({ items }), {
                withTracking: true
            });
            const { result } = renderHook(() =>
                useFetchSearchResults(defaultProps)
            );
            await waitFor(() =>
                expect(result.current.data.isFinishPagination).toBe(true)
            );
        });

        it('sets isFinishPagination to false when items = 24', async () => {
            const items = Array.from({ length: 24 }, (_, i) => ({
                id: `${i}`
            }));
            setupFetchMocks(makeSuccessResponse({ items }), {
                withTracking: true
            });
            const { result } = renderHook(() =>
                useFetchSearchResults(defaultProps)
            );
            await waitFor(() =>
                expect(result.current.data.isFinishPagination).toBe(false)
            );
        });

        it('appends items to articlesGrid when page > 0', async () => {
            const firstItems = [{ id: '1' }];
            const secondItems = [{ id: '2' }];

            setupFetchMocks(makeSuccessResponse({ items: firstItems }), {
                withTracking: true
            });
            const { result, rerender } = renderHook(
                props => useFetchSearchResults(props),
                { initialProps: { ...defaultProps, page: 0 } }
            );
            await waitFor(() =>
                expect(result.current.data.articlesGrid).toEqual(firstItems)
            );

            setupFetchMocks(makeSuccessResponse({ items: secondItems }));
            rerender({ ...defaultProps, page: 24 });

            await waitFor(() =>
                expect(result.current.data.articlesGrid).toEqual([
                    ...firstItems,
                    ...secondItems
                ])
            );
        });

        it('replaces articlesGrid when page = 0 (new search)', async () => {
            const firstItems = [{ id: '1' }, { id: '2' }];
            const secondItems = [{ id: '3' }];

            setupFetchMocks(makeSuccessResponse({ items: firstItems }), {
                withTracking: true
            });
            const { result, rerender } = renderHook(
                props => useFetchSearchResults(props),
                { initialProps: { ...defaultProps, queryUrl: 'first' } }
            );
            await waitFor(() =>
                expect(result.current.data.articlesGrid).toEqual(firstItems)
            );

            setupFetchMocks(makeSuccessResponse({ items: secondItems }), {
                withTracking: true
            });
            rerender({ ...defaultProps, queryUrl: 'second', page: 0 });

            await waitFor(() =>
                expect(result.current.data.articlesGrid).toEqual(secondItems)
            );
        });
    });

    describe('error handling', () => {
        it('sets loading: false and empty articlesGrid on fetch error', async () => {
            mockFetch
                .mockResolvedValueOnce({})
                .mockRejectedValueOnce(new Error('Network Error'));

            const { result } = renderHook(() =>
                useFetchSearchResults(defaultProps)
            );
            await waitFor(() => expect(result.current.loading).toBe(false));
            expect(result.current.data.articlesGrid).toEqual([]);
        });

        it('logs error to console on fetch failure', async () => {
            mockFetch
                .mockResolvedValueOnce({})
                .mockRejectedValueOnce(new Error('Network Error'));

            renderHook(() => useFetchSearchResults(defaultProps));
            await waitFor(() =>
                expect(console.error).toHaveBeenCalledWith(
                    'Error fetching LN search results:',
                    expect.any(Error)
                )
            );
        });
    });
});

describe('useFetchSearchResults — URL construction', () => {
    describe('query parameters', () => {
        it('includes the search query in the URL', async () => {
            setupFetchMocks(makeSuccessResponse());
            renderHook(() =>
                useFetchSearchResults({
                    ...defaultProps,
                    page: 24,
                    queryUrl: 'futbol'
                })
            );
            await waitFor(() => expect(mockFetch).toHaveBeenCalled());
            expect(getApiCallUrl()).toContain('query=futbol');
        });

        it('includes sort param in the URL', async () => {
            setupFetchMocks(makeSuccessResponse());
            renderHook(() =>
                useFetchSearchResults({
                    ...defaultProps,
                    page: 24,
                    sort: 'date'
                })
            );
            await waitFor(() => expect(mockFetch).toHaveBeenCalled());
            expect(getApiCallUrl()).toContain('sort=date');
        });

        it('includes endindex matching the page', async () => {
            setupFetchMocks(makeSuccessResponse());
            renderHook(() =>
                useFetchSearchResults({ ...defaultProps, page: 24 })
            );
            await waitFor(() => expect(mockFetch).toHaveBeenCalled());
            expect(getApiCallUrl()).toContain('endindex=24');
        });
    });

    describe('date range parameters', () => {
        it('includes daterange param when both dates provided', async () => {
            setupFetchMocks(makeSuccessResponse());
            renderHook(() =>
                useFetchSearchResults({
                    ...defaultProps,
                    page: 24,
                    dateRange: {
                        startDate: '2024-01-01',
                        endDate: '2024-12-31'
                    }
                })
            );
            await waitFor(() => expect(mockFetch).toHaveBeenCalled());
            expect(getApiCallUrl()).toContain(
                '&daterange=01/01/2024,12/31/2024'
            );
        });

        it('includes partial daterange when only startDate provided', async () => {
            setupFetchMocks(makeSuccessResponse());
            renderHook(() =>
                useFetchSearchResults({
                    ...defaultProps,
                    page: 24,
                    dateRange: { startDate: '2024-06-15', endDate: '' }
                })
            );
            await waitFor(() => expect(mockFetch).toHaveBeenCalled());
            expect(getApiCallUrl()).toContain('&daterange=06/15/2024,');
        });

        it('omits daterange param when dates are empty', async () => {
            setupFetchMocks(makeSuccessResponse());
            renderHook(() =>
                useFetchSearchResults({
                    ...defaultProps,
                    page: 24,
                    dateRange: { startDate: '', endDate: '' }
                })
            );
            await waitFor(() => expect(mockFetch).toHaveBeenCalled());
            expect(getApiCallUrl()).not.toContain('&daterange=');
        });
    });
});
