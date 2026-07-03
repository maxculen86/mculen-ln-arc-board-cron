jest.mock('../mediaHelpers', () => ({
    getOpeningMediaItems: promoItems => ({
        desktopImageItem:
            promoItems.Storytelling ||
            promoItems.basic ||
            promoItems.storytelling_mobile,
        mobileImageItem:
            promoItems.storytelling_mobile ||
            promoItems.Storytelling ||
            promoItems.basic
    }),
    getNormalizedImageData: imageData => ({
        resizedUrls: imageData?.resized_urls || [],
        url: imageData?.url || '',
        caption: imageData?.caption || '',
        altText: imageData?.alt_text || ''
    })
}));

import getOpeningResizedUrls, {
    getDesktopResizedUrls,
    getMobileResizedUrls
} from '../getOpeningResizedUrls';

const image = ({ width, height, isMobileDimension, proportion }) => ({
    resizedUrl: `https://www.lanacion.com.ar/resizer/${width}x${height}.jpg`,
    option: {
        width,
        height,
        ...(typeof isMobileDimension === 'boolean' && { isMobileDimension }),
        ...(proportion && { proportion })
    }
});

const imageData = resizedUrls => ({
    url: 'https://www.lanacion.com.ar/original.jpg',
    resized_urls: resizedUrls
});

describe('getOpeningResizedUrls', () => {
    it('excludes mobile dimensions from the desktop set when they also arrive in storytelling_mobile', () => {
        const mobile420 = image({ width: 420, height: 630, proportion: '2:3' });
        const mobile770 = image({
            width: 770,
            height: 1155,
            proportion: '2:3'
        });
        const desktop1200 = image({
            width: 1200,
            height: 800,
            proportion: '3:2'
        });
        const desktop1920 = image({
            width: 1920,
            height: 1280,
            proportion: '3:2'
        });

        const desktopUrls = getDesktopResizedUrls(
            imageData([mobile420, mobile770, desktop1200, desktop1920]),
            imageData([mobile420, mobile770])
        );

        expect(desktopUrls.map(item => item.option.width)).toEqual([
            1200, 1920
        ]);
    });

    it('uses isMobileDimension as the primary split when the flag exists', () => {
        const tabletDesktop = image({
            width: 1040,
            height: 1100,
            proportion: '2:3'
        });
        const mobile768 = image({
            width: 768,
            height: 1100,
            proportion: '2:3',
            isMobileDimension: true
        });

        expect(
            getDesktopResizedUrls(imageData([tabletDesktop, mobile768])).map(
                item => item.option.width
            )
        ).toEqual([1040]);
        expect(
            getMobileResizedUrls(imageData([tabletDesktop, mobile768])).map(
                item => item.option.width
            )
        ).toEqual([768]);
    });

    it('returns desktop dimensions first and mobile dimensions second for storytelling openings with mobile image', () => {
        const mobile420 = image({ width: 420, height: 630, proportion: '2:3' });
        const mobile770 = image({
            width: 770,
            height: 1155,
            proportion: '2:3'
        });
        const desktop1200 = image({
            width: 1200,
            height: 800,
            proportion: '3:2'
        });
        const desktop1920 = image({
            width: 1920,
            height: 1280,
            proportion: '3:2'
        });

        const resizedUrls = getOpeningResizedUrls({
            Storytelling: imageData([
                mobile420,
                mobile770,
                desktop1200,
                desktop1920
            ]),
            storytelling_mobile: imageData([mobile420, mobile770])
        });

        expect(resizedUrls.map(item => item.option.width)).toEqual([
            1200, 1920, 420, 770
        ]);
    });
});
