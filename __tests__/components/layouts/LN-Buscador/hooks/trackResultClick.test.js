import { trackResultClick } from '../../../../../components/layouts/LN-Buscador/hooks/useFetchSearchResults';

jest.mock('fusion:environment', () => ({
    API_QUERYLY: 'https://api.queryly.com',
    API_KEY_QUERYLY_LN: 'test-key'
}));
jest.mock('fusion:context', () => ({}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

const TRACKING_URL = 'https://data.queryly.com/track.aspx';

beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockResolvedValue({});
});

describe('trackResultClick', () => {
    it('does not call fetch when query is missing', () => {
        trackResultClick({ target: '/article/1' });
        expect(mockFetch).not.toHaveBeenCalled();
    });

    it('does not call fetch when target is missing', () => {
        trackResultClick({ query: 'futbol' });
        expect(mockFetch).not.toHaveBeenCalled();
    });

    it('does not call fetch when both query and target are missing', () => {
        trackResultClick({});
        expect(mockFetch).not.toHaveBeenCalled();
    });

    it('calls fetch with no-cors tracking URL when query and target are provided', () => {
        trackResultClick({ query: 'futbol', target: '/article/1' });
        expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining(TRACKING_URL),
            expect.objectContaining({ mode: 'no-cors' })
        );
    });

    it('encodes spaces in the query', () => {
        trackResultClick({ query: 'real madrid', target: '/article/1' });
        const [url] = mockFetch.mock.calls[0];
        expect(url).toContain('real%20madrid');
    });

    it('encodes the target in the URL', () => {
        trackResultClick({ query: 'futbol', target: '/article/test page' });
        const [url] = mockFetch.mock.calls[0];
        expect(url).toContain(encodeURIComponent('/article/test page'));
    });
});
