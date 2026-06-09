import transformWikiTagData from '../../../../content/sources/utils/transformWikiTagData';
import mockWikiTagPersonaRawData from '../../../../__mocks__/data/wikiTag/wikiTagPersonRawData.json';
import mockWikiTagPersona from '../../../../__mocks__/data/wikiTag/wikiTagPersona.json';
import { resizeUrlCollection } from '../../../../components/private/common/utils/image/resizer/v2/resizerHelper';

jest.mock('fusion:properties', () => () => ({
    getProperties: () => {
        return {
            imageConfig: {
                resize: {
                    default: [
                        {
                            width: 1033,
                            height: 768,
                            media: '(min-width: 768px)',
                            class: 'img-desktop',
                            media_preload: '(min-width: 768px)'
                        }
                    ],
                    wikiTag: {
                        promo_items: {
                            sizes: [
                                {
                                    width: 320,
                                    height: 480,
                                    proportion: '2:3'
                                },
                                {
                                    width: 420,
                                    height: 630,
                                    proportion: '2:3'
                                },
                                {
                                    width: 640,
                                    height: 960,
                                    proportion: '2:3'
                                },
                                {
                                    width: 840,
                                    height: 1260,
                                    proportion: '2:3'
                                }
                            ]
                        }
                    }
                }
            }
        };
    }
}));
jest.mock(
    '../../../../components/private/common/utils/image/resizer/v2/resizerHelper'
);

const getSandboxResizedUrl = width =>
    `https://sandbox-resizer.glanacion.com/resizer/v2/22QAQYYOGFEJ3FPKC4OSVPPIN4.png?auth=3505a155364d7e1d80cbc4539ec469adfb3bfb8a479aecbad5e662d1a87f99ab&width=${width}&quality=70&smart=false`;

const getImagePropsSandbox = (height, width) => ({
    option: {
        height,
        proportion: '2:3',
        width
    },
    resizedUrl: getSandboxResizedUrl(width)
});

describe('transformWikiTagData', () => {
    const siteProps = {
        imageConfig: 'wikiTag',
        arcSite: 'la-nacion-ar'
    };

    beforeEach(() => {
        resizeUrlCollection.mockReturnValue([
            getImagePropsSandbox(480, 320),
            getImagePropsSandbox(630, 420),
            getImagePropsSandbox(960, 640),
            getImagePropsSandbox(1260, 840)
        ]);
    });

    it('returns resized URLs from resizeUrlCollection', () => {
        const result = transformWikiTagData(
            mockWikiTagPersonaRawData,
            siteProps
        );
        expect(result).toStrictEqual(mockWikiTagPersona);
    });

    it('uses sandbox-resizer origin in all resizedUrl entries', () => {
        const result = transformWikiTagData(
            mockWikiTagPersonaRawData,
            siteProps
        );
        result.image.resizedUrls.forEach(item => {
            expect(item.resizedUrl).toMatch(
                /^https:\/\/sandbox-resizer\.glanacion\.com\//
            );
        });
    });

    it('includes correct image sizes in resizedUrls', () => {
        const result = transformWikiTagData(
            mockWikiTagPersonaRawData,
            siteProps
        );
        const widths = result.image.resizedUrls.map(item => item.option.width);
        expect(widths).toEqual([320, 420, 640, 840]);
    });

    it('returns empty array when resizeUrlCollection returns undefined', () => {
        resizeUrlCollection.mockReturnValue(undefined);
        const result = transformWikiTagData(
            mockWikiTagPersonaRawData,
            siteProps
        );
        expect(result.image.resizedUrls).toEqual([]);
    });
});
