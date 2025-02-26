import getEmbedHref from '../../../../../components/private/common/utils/getEmbedHref';

describe('getEmbedHref', () => {
    it('should extract href value when node contains double quoted attribute', () => {
        const node = '<a href="https://google.com.ar">Link</a>';
        const result = getEmbedHref('href', node);
        expect(result).toBe('https://google.com.ar');
    });
    it('should extract href value when node contains double quoted attribute with path', () => {
        const node = '<a href="https://google.com.ar/path">Link</a>';
        const result = getEmbedHref('href', node);
        expect(result).toBe('https://google.com.ar/path');
    });

    it('should extract href value when node contains single quoted attribute', () => {
        const node = "<a href='https://google.com.ar'>Link</a>";
        const result = getEmbedHref('href', node);
        expect(result).toBe('https://google.com.ar');
    });

    it('should return null when node is empty', () => {
        const result = getEmbedHref('href', '');
        expect(result).toBeNull();
    });

    it('should return null when node is null', () => {
        const result = getEmbedHref('href', null);
        expect(result).toBeNull();
    });

    it('should return null when attribute is not found in node', () => {
        const node = '<a class="link">Link</a>';
        const result = getEmbedHref('href', node);
        expect(result).toBeNull();
    });

    it('should return null when attribute syntax is malformed', () => {
        const node = '<a href=https://google.com.ar>Link</a>';
        const result = getEmbedHref('href', node);
        expect(result).toBeNull();
    });
});
