import stripHtml from '../../../../../components/private/common/utils/stripHtml';
import isSSR from '../../../../../components/private/LN/common/utils/isSSR';

jest.mock('../../../../../components/private/LN/common/utils/isSSR');

describe('stripHtml', () => {
    let mockIsSSR;
    let originalDOMParser;

    beforeEach(() => {
        mockIsSSR = isSSR;
        originalDOMParser = global.DOMParser;
    });

    afterEach(() => {
        jest.clearAllMocks();
        global.DOMParser = originalDOMParser;
    });

    it('should return empty string for non-string input', () => {
        expect(stripHtml({ html: null })).toBe('');
        expect(stripHtml({ html: undefined })).toBe('');
        expect(stripHtml({ html: 123 })).toBe('');
        expect(stripHtml({ html: {} })).toBe('');
        expect(stripHtml({ html: '' })).toBe('');
    });

    it('should strip HTML tags using DOMParser in browser environment', () => {
        mockIsSSR.mockReturnValue(false);

        const mockDoc = {
            body: {
                textContent: 'Hello World'
            }
        };

        global.DOMParser = jest.fn().mockImplementation(() => ({
            parseFromString: jest.fn().mockReturnValue(mockDoc)
        }));

        const result = stripHtml({
            html: '<p>Hello <strong>World</strong></p>'
        });
        expect(result).toBe('Hello World');
    });

    it('should strip HTML tags using regex in SSR environment', () => {
        mockIsSSR.mockReturnValue(true);

        const result = stripHtml({
            html: '<p>Hello <strong>World</strong></p>'
        });
        expect(result).toBe('Hello World');
    });

    it('should fallback to regex when DOMParser fails', () => {
        mockIsSSR.mockReturnValue(false);
        console.warn = jest.fn();

        global.DOMParser = jest.fn().mockImplementation(() => ({
            parseFromString: jest.fn().mockImplementation(() => {
                throw new Error('DOMParser error');
            })
        }));

        const result = stripHtml({
            html: '<p>Hello <strong>World</strong></p>'
        });
        expect(result).toBe('Hello World');
        expect(console.warn).toHaveBeenCalledWith(
            'DOMParser failed, falling back to regex:',
            expect.any(Error)
        );
    });

    it('should use innerText when textContent is falsy', () => {
        mockIsSSR.mockReturnValue(false);

        const mockDoc = {
            body: {
                textContent: null,
                innerText: 'Inner Text Content'
            }
        };

        global.DOMParser = jest.fn().mockImplementation(() => ({
            parseFromString: jest.fn().mockReturnValue(mockDoc)
        }));

        const result = stripHtml({
            html: '<p>Test content</p>'
        });
        expect(result).toBe('Inner Text Content');
    });
});
