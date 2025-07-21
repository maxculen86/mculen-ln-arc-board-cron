import { buildTagsUrl } from '../../../../../components/private/common/videoPlayerJw/utils/helperJw';

describe('buildTagsUrl', () => {
    const baseUrl = 'https://ads.test.com?cust_params=tags_nuevos%3Dtest_tag';

    beforeEach(() => {
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn()
            },
            writable: true
        });

        jest.clearAllMocks();
    });

    it('should inject permutive segment into cust_params', () => {
        const mockSegments = ['111', '222', '333'];
        window.localStorage.getItem.mockReturnValue(
            JSON.stringify(mockSegments)
        );

        const result = buildTagsUrl(baseUrl);

        const expectedPermutive = encodeURIComponent(
            '&permutive=' + encodeURIComponent(mockSegments.join(','))
        );

        expect(result).toBe(`${baseUrl}${expectedPermutive}`);
    });

    it('should handle empty _pdfps array gracefully', () => {
        window.localStorage.getItem.mockReturnValue('[]');

        const result = buildTagsUrl(baseUrl);
        const expectedPermutive = encodeURIComponent(
            '&permutive=' + encodeURIComponent('')
        );

        expect(result).toBe(`${baseUrl}${expectedPermutive}`);
    });

    it('should return original baseUrl on JSON parse error', () => {
        window.localStorage.getItem.mockReturnValue('not-json');

        const consoleSpy = jest
            .spyOn(console, 'warn')
            .mockImplementation(() => {});

        const result = buildTagsUrl(baseUrl);

        expect(consoleSpy).toHaveBeenCalled();
        expect(result).toBe(baseUrl);

        consoleSpy.mockRestore();
    });

    it('should return baseUrl if cust_params is not found', () => {
        const urlWithoutCustParams = 'https://ads.test.com?slotname=preroll';
        window.localStorage.getItem.mockReturnValue(JSON.stringify(['444']));

        const result = buildTagsUrl(urlWithoutCustParams);
        expect(result).toBe(urlWithoutCustParams);
    });
});
