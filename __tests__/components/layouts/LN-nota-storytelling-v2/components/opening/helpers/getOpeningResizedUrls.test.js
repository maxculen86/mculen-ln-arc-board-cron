import getOpeningResizedUrls, {
    getDesktopResizedUrls,
    getMobileResizedUrls
} from '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/helpers/getOpeningResizedUrls';
import * as mediaHelpers from '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/helpers/mediaHelpers';

jest.mock(
    'fusion:environment',
    () => ({
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com/resizer',
        SITE_LANACION: 'la-nacion-ar',
        SITE_FOODIT: 'foodit'
    }),
    { virtual: true }
);
jest.mock(
    '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/helpers/mediaHelpers'
);

const desktopEntry = resizedUrl => ({
    resizedUrl,
    option: {
        width: 1920,
        height: 830,
        proportion: '21:9'
    }
});

const legacyMobileEntry = resizedUrl => ({
    resizedUrl,
    option: {
        width: 420,
        height: 630,
        proportion: '2:3'
    }
});

const mobileEntry = resizedUrl => ({
    resizedUrl,
    option: {
        width: 770,
        height: 770,
        proportion: '1:1',
        isMobileDimension: true
    }
});

describe('getOpeningResizedUrls', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('treats dimensions without isMobileDimension as desktop', () => {
        mediaHelpers.getNormalizedImageData.mockReturnValue({
            resizedUrls: [
                desktopEntry('https://example.com/desktop-1920.jpg'),
                mobileEntry('https://example.com/mobile-770.jpg')
            ]
        });

        const result = getDesktopResizedUrls({});

        expect(result.map(({ resizedUrl }) => resizedUrl)).toEqual([
            'https://example.com/desktop-1920.jpg'
        ]);
    });

    it('returns only dimensions explicitly marked as mobile', () => {
        mediaHelpers.getNormalizedImageData.mockReturnValue({
            resizedUrls: [
                desktopEntry('https://example.com/desktop-1920.jpg'),
                mobileEntry('https://example.com/mobile-770.jpg')
            ]
        });

        const result = getMobileResizedUrls({});

        expect(result.map(({ resizedUrl }) => resizedUrl)).toEqual([
            'https://example.com/mobile-770.jpg'
        ]);
    });

    it('uses legacy 2:3 mobile dimensions when isMobileDimension is missing', () => {
        const imageData = {
            resized_urls: [
                desktopEntry('https://example.com/desktop-1920.jpg'),
                legacyMobileEntry('https://example.com/mobile-420.jpg')
            ]
        };

        mediaHelpers.getNormalizedImageData.mockReturnValue({
            resizedUrls: imageData.resized_urls
        });

        const result = getMobileResizedUrls(imageData);

        expect(result.map(({ resizedUrl }) => resizedUrl)).toEqual([
            'https://example.com/mobile-420.jpg'
        ]);
    });

    it('combines desktop and mobile dimensions from their own promo items', () => {
        const desktopImageItem = { id: 'desktop' };
        const mobileImageItem = { id: 'mobile' };

        mediaHelpers.getOpeningMediaItems.mockReturnValue({
            desktopImageItem,
            mobileImageItem
        });
        mediaHelpers.getNormalizedImageData.mockImplementation(imageItem => {
            if (imageItem === desktopImageItem) {
                return {
                    resizedUrls: [
                        desktopEntry('https://example.com/desktop-1920.jpg')
                    ]
                };
            }

            return {
                resizedUrls: [mobileEntry('https://example.com/mobile-770.jpg')]
            };
        });

        const result = getOpeningResizedUrls({
            storytelling_mobile: mobileImageItem
        });

        expect(result.map(({ resizedUrl }) => resizedUrl)).toEqual([
            'https://example.com/desktop-1920.jpg',
            'https://example.com/mobile-770.jpg'
        ]);
    });
});
