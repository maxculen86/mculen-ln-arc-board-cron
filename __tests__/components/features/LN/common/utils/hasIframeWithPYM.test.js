import hasIframeWithPYM from '../../../../../../components/features/LN/common/utils/hasIframeWithPYM';

describe('hasIframeWithPYM', () => {
    it('returns false when content is null or undefined', () => {
        expect(hasIframeWithPYM(null)).toBe(false);
        expect(hasIframeWithPYM(undefined)).toBe(false);
        expect(hasIframeWithPYM('')).toBe(false);
    });

    it('returns false when there is no iframe', () => {
        const content = '<div><p>Some content</p></div>';

        expect(hasIframeWithPYM(content)).toBe(false);
    });

    it('returns false when iframe does not have pym class', () => {
        const content = `
            <div>
                <iframe src="https://example.com"></iframe>
            </div>
        `;

        expect(hasIframeWithPYM(content)).toBe(false);
    });

    it('returns true when iframe with class pym exists', () => {
        const content = `
            <div>
                <iframe class="pym" src="https://example.com"></iframe>
            </div>
        `;

        expect(hasIframeWithPYM(content)).toBe(true);
    });

    it('returns false when DOMParser is not available (SSR safety)', () => {
        const originalDOMParser = global.DOMParser;
        delete global.DOMParser;

        const content = '<iframe class="pym"></iframe>';
        expect(hasIframeWithPYM(content)).toBe(false);

        global.DOMParser = originalDOMParser;
    });
});
