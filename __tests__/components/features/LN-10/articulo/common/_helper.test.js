import * as env from 'fusion:environment';
import { transformUrl } from '../../../../../../components/features/LN-10/article/common/_helper';

jest.mock('fusion:environment', () => ({
    __esModule: true,
    API_ENV: 'prod'
}));

describe('Test function transformUrl', () => {
    it('should correctly transform a valid URL without /widget/ and without isHome', () => {
        const inputUrl =
            'https://canchallena.lanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/';
        const expected =
            'https://widget-canchallena.clanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/widget/?isHome=true';
        expect(transformUrl(inputUrl)).toBe(expected);
    });

    it('should correctly transform a valid URL with /widget/ and without isHome', () => {
        const inputUrl =
            'https://canchallena.lanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/widget/';
        const expected =
            'https://widget-canchallena.clanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/widget/?isHome=true';
        expect(transformUrl(inputUrl)).toBe(expected);
    });

    it('should not duplicate the isHome=true parameter if it already exists', () => {
        const inputUrl =
            'https://canchallena.lanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/?isHome=true';
        const expected =
            'https://widget-canchallena.clanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/widget/?isHome=true';
        expect(transformUrl(inputUrl)).toBe(expected);
    });

    it('should transform a valid URL with existing query parameters', () => {
        const inputUrl =
            'https://canchallena.lanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/?param1=value1';
        const expected =
            'https://widget-canchallena.clanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/widget/?param1=value1&isHome=true';
        expect(transformUrl(inputUrl)).toBe(expected);
    });

    it('should return an empty string if the domain is invalid', () => {
        const inputUrl =
            'https://invalid-domain.com/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/';
        expect(transformUrl(inputUrl)).toBe('');
    });
    it('should return an empty string if the url format is invalid or is not futbol', () => {
        const rugbyUrl =
            'https://qa-canchallena.lanacion.com.ar/rugby/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/';
        expect(transformUrl(rugbyUrl)).toBe('');
        const invalidUrl =
            'https://qa-canchallena.lanacion.com.ar/futbol/path-extra/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/';
        expect(transformUrl(invalidUrl)).toBe('');
    });
    it('should return an empty string if the url is QA CLL valid and environment is prod', () => {
        const inputUrl =
            'https://qa-canchallena.lanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/';
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

    it('should return QA widget domain url if the url is QA CLL valid and environment is NOT prod', () => {
        env.API_ENV = 'sandbox';
        const inputUrl =
            'https://qa-canchallena.lanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/';
        expect(transformUrl(inputUrl)).toBe(
            'https://qa-widget-canchallena.clanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/widget/?isHome=true'
        );
    });
    it('should return QA widget domain url if the url is QA CLL valid and environment is NOT prod', () => {
        env.API_ENV = 'local';
        const inputUrl =
            'https://poc-canchallena.lanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/';
        expect(transformUrl(inputUrl)).toBe(
            'https://poc-widget-canchallena.clanacion.com.ar/futbol/la-liga-2024-2025/real-sociedad-villarreal-7h1kn1uskboomf15gmovbwavo/widget/?isHome=true'
        );
    });

    describe('should transform a valid URL when it includes an ID of 20 or more characters', () => {
        const validCases = [
            {
                inputUrl:
                    'https://canchallena.lanacion.com.ar/futbol/torneo-apertura-2025/boca-juniors-rosario-central-wawi6ee63jly8pt5ppxm/',
                expected:
                    'https://widget-canchallena.clanacion.com.ar/futbol/torneo-apertura-2025/boca-juniors-rosario-central-wawi6ee63jly8pt5ppxm/widget/?isHome=true',
                idLength: 20
            },
            {
                inputUrl:
                    'https://canchallena.lanacion.com.ar/futbol/torneo-apertura-2025/boca-juniors-rosario-central-wawi6ee63jly8pt5ppxmz3f8/',
                expected:
                    'https://widget-canchallena.clanacion.com.ar/futbol/torneo-apertura-2025/boca-juniors-rosario-central-wawi6ee63jly8pt5ppxmz3f8/widget/?isHome=true',
                idLength: 24
            },
            {
                inputUrl:
                    'https://canchallena.lanacion.com.ar/futbol/torneo-apertura-2025/boca-juniors-rosario-central-wawi6ee63jly8pt5ppxm12345/',
                expected:
                    'https://widget-canchallena.clanacion.com.ar/futbol/torneo-apertura-2025/boca-juniors-rosario-central-wawi6ee63jly8pt5ppxm12345/widget/?isHome=true',
                idLength: 25
            },
            {
                inputUrl:
                    'https://canchallena.lanacion.com.ar/futbol/torneo-apertura-2025/boca-juniors-rosario-central-wawi6ee63jly8pt5ppxmz3f81234567890/',
                expected:
                    'https://widget-canchallena.clanacion.com.ar/futbol/torneo-apertura-2025/boca-juniors-rosario-central-wawi6ee63jly8pt5ppxmz3f81234567890/widget/?isHome=true',
                idLength: 30
            }
        ];

        validCases.forEach(({ idLength, inputUrl, expected }) => {
            it(`case with idLength ${idLength}`, () => {
                expect(transformUrl(inputUrl)).toBe(expected);
            });
        });
    });

    describe('should not transform a URL when it includes an ID with fewer than 20 characters', () => {
        const invalidCases = [
            {
                inputUrl:
                    'https://canchallena.lanacion.com.ar/futbol/torneo-apertura-2025/boca-juniors-rosario-central-wawi6ee63jly8pt5ppx/',
                expected: '',
                idLength: 19
            },
            {
                inputUrl:
                    'https://canchallena.lanacion.com.ar/futbol/torneo-apertura-2025/boca-juniors-rosario-central-wawi6ee63j/',
                expected: '',
                idLength: 10
            },
            {
                inputUrl:
                    'https://canchallena.lanacion.com.ar/futbol/torneo-apertura-2025/boca-juniors-rosario-central-wa/',
                expected: '',
                idLength: 2
            },
            {
                inputUrl:
                    'https://canchallena.lanacion.com.ar/futbol/torneo-apertura-2025/boca-juniors-rosario-central-/',
                expected: '',
                idLength: 0
            }
        ];

        invalidCases.forEach(({ idLength, inputUrl, expected }) => {
            it(`case with idLength ${idLength}`, () => {
                expect(transformUrl(inputUrl)).toBe(expected);
            });
        });
    });
});
