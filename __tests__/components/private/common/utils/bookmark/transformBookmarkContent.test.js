import trasformBookmarkContent, {
    buildBookmarkResizedImageUrl
} from '../../../../../../components/private/common/utils/bookmark/trasformBookmarkContent';
import responseApiBookmark from '../../../../../../__mocks__/data/bookmark/responseApiBookmark.json';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

describe('trasformBookmarkContent', () => {
    test('Return transformed data when data exists', () => {
        const result = trasformBookmarkContent(responseApiBookmark);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);

        const first = result[0];
        expect(first).toHaveProperty('_id');
        expect(first).toHaveProperty('headlines.basic');
        expect(first).toHaveProperty('promo_items.basic');

        const img = first.promo_items.basic;

        expect(img).toHaveProperty('type', 'image');
        expect(img).toHaveProperty('width', 150);
        expect(img).toHaveProperty('height', 100);
        expect(typeof img.url).toBe('string');
        expect(img.url.length).toBeGreaterThan(0);

        const url = new URL(img.url);
        expect(url.searchParams.get('width')).toBe('150');
        expect(url.searchParams.get('height')).toBe('100');
    });

    test('Return empty array when data not defined', () => {
        expect(trasformBookmarkContent()).toStrictEqual([]);
    });

    test('Return empty array when receiving a data type other than an array', () => {
        expect(trasformBookmarkContent({})).toStrictEqual([]);
    });
});

describe('buildBookmarkResizedImageUrl', () => {
    test('should return empty string when rawUrl is empty', () => {
        expect(buildBookmarkResizedImageUrl('')).toBe('');
    });

    test('should return empty string when rawUrl is undefined', () => {
        expect(buildBookmarkResizedImageUrl(undefined)).toBe('');
    });

    test('should keep /resizer/v2/ and overwrite width/height, preserving other params', () => {
        const rawUrl =
            'https://sandbox-resizer.glanacion.com/resizer/v2/el-diputado-nacional-german-FUOVF3J6WFEXRODLRDBCYAN5CM.jpeg' +
            '?auth=abc123&width=768&quality=70&smart=false';

        const result = buildBookmarkResizedImageUrl(rawUrl);
        const url = new URL(result);

        expect(url.origin).toBe('https://sandbox-resizer.glanacion.com');
        expect(url.pathname).toContain('/resizer/v2/');
        expect(url.searchParams.get('auth')).toBe('abc123');
        expect(url.searchParams.get('quality')).toBe('70');
        expect(url.searchParams.get('smart')).toBe('false');

        expect(url.searchParams.get('width')).toBe('150');
        expect(url.searchParams.get('height')).toBe('100');
    });

    test('should replace /resizer/{{param}}/ with /resizer/v2/ and set width/height', () => {
        const rawUrl =
            'https://sandbox-resizer.glanacion.com/resizer/{{param}}/el-diputado-nacional-german.jpeg?auth=abc123&quality=70';

        const result = buildBookmarkResizedImageUrl(rawUrl);
        const url = new URL(result);

        expect(url.pathname).toContain('/resizer/v2/');
        expect(url.searchParams.get('auth')).toBe('abc123');
        expect(url.searchParams.get('quality')).toBe('70');
        expect(url.searchParams.get('width')).toBe('150');
        expect(url.searchParams.get('height')).toBe('100');
    });

    test('should add height if it was missing and overwrite width if present', () => {
        const rawUrl =
            'https://sandbox-resizer.glanacion.com/resizer/v2/image.jpg?auth=abc123&width=999';

        const result = buildBookmarkResizedImageUrl(rawUrl);
        const url = new URL(result);

        expect(url.searchParams.get('auth')).toBe('abc123');
        expect(url.searchParams.get('width')).toBe('150');
        expect(url.searchParams.get('height')).toBe('100');
    });
});
