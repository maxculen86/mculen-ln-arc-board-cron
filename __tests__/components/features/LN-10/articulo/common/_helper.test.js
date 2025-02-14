import { transformUrl } from '../../../../../../components/features/LN-10/article/common/_helper';

describe('Test function transformUrl', () => {
    it('should correctly transform a valid URL without /widget/ and without isHome', () => {
        const inputUrl =
            'https://canchallena.lanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal/';
        const expected =
            'https://widget-canchallena.clanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal/widget/?isHome=true';
        expect(transformUrl(inputUrl)).toBe(expected);
    });

    it('should correctly transform a valid URL with /widget/ and without isHome', () => {
        const inputUrl =
            'https://canchallena.lanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal/widget/';
        const expected =
            'https://widget-canchallena.clanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal/widget/?isHome=true';
        expect(transformUrl(inputUrl)).toBe(expected);
    });

    it('should not duplicate the isHome=true parameter if it already exists', () => {
        const inputUrl =
            'https://canchallena.lanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal/?isHome=true';
        const expected =
            'https://widget-canchallena.clanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal/widget/?isHome=true';
        expect(transformUrl(inputUrl)).toBe(expected);
    });

    it('should transform a valid URL with existing query parameters', () => {
        const inputUrl =
            'https://canchallena.lanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal/?param1=value1';
        const expected =
            'https://widget-canchallena.clanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal/widget/?param1=value1&isHome=true';
        expect(transformUrl(inputUrl)).toBe(expected);
    });

    it('should return an empty string if the domain is invalid', () => {
        const inputUrl =
            'https://invalid-domain.com/futbol/la-liga-2024-2025/real-sociedad-villarreal/';
        expect(transformUrl(inputUrl)).toBe('');
    });

    it('should return an empty string if the URL is invalid', () => {
        const inputUrl = 'https://invalid-url';
        expect(transformUrl(inputUrl)).toBe('');
    });

    it('should return an empty string if the URL has no path', () => {
        const inputUrl = 'https://canchallena.lanacion.com.ar/';
        expect(transformUrl(inputUrl)).toBe('');
    });
});
