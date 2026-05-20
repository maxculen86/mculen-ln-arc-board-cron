import transformWikiTagData, {
    replaceUrlOrigin,
    normalizeResizedImageUrls
} from '../../../../content/sources/utils/transformWikiTagData';
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

jest.mock('fusion:environment', () => ({
    get API_ENV() {
        return 'sandbox';
    }
}));

const getSandboxResizedUrl = (width) =>
    `https://sandbox-resizer.glanacion.com/resizer/v2/22QAQYYOGFEJ3FPKC4OSVPPIN4.png?auth=3505a155364d7e1d80cbc4539ec469adfb3bfb8a479aecbad5e662d1a87f99ab&width=${width}&quality=70&smart=false`;

const getProdResizedUrl = (width) =>
    `https://www.lanacion.com.ar/resizer/v2/22QAQYYOGFEJ3FPKC4OSVPPIN4.png?auth=3505a155364d7e1d80cbc4539ec469adfb3bfb8a479aecbad5e662d1a87f99ab&width=${width}&quality=70&smart=false`;

const getImagePropsSandbox = (height, width) => ({
    option: {
        height,
        proportion: '2:3',
        width
    },
    resizedUrl: getSandboxResizedUrl(width)
});

const getImagePropsProd = (height, width) => ({
    option: {
        height,
        proportion: '2:3',
        width
    },
    resizedUrl: getProdResizedUrl(width)
});

describe('replaceUrlOrigin', () => {
    it('replaces sandbox-resizer origin with www.lanacion.com.ar', () => {
        const input = 'https://sandbox-resizer.glanacion.com/resizer/v2/L2LVKSQ2JBGWZITLBFFFDAZHOY.png?auth=4a53433ed78334deaf5b10f0ea13b4d2d08e459ea2ae3c61873b1911ec1cbec7&width=420&quality=70&smart=false';
        const expected = 'https://www.lanacion.com.ar/resizer/v2/L2LVKSQ2JBGWZITLBFFFDAZHOY.png?auth=4a53433ed78334deaf5b10f0ea13b4d2d08e459ea2ae3c61873b1911ec1cbec7&width=420&quality=70&smart=false';
        expect(replaceUrlOrigin(input)).toBe(expected);
    });

    it('replaces http protocol with https', () => {
        const input = 'http://sandbox-resizer.glanacion.com/resizer/v2/abc.png?auth=x';
        const expected = 'https://www.lanacion.com.ar/resizer/v2/abc.png?auth=x';
        expect(replaceUrlOrigin(input)).toBe(expected);
    });

    it('replaces any domain origin to www.lanacion.com.ar', () => {
        const input = 'https://other-resizer.glanacion.com/resizer/v2/img.png?auth=abc';
        const expected = 'https://www.lanacion.com.ar/resizer/v2/img.png?auth=abc';
        expect(replaceUrlOrigin(input)).toBe(expected);
    });

    it('returns empty string for empty input', () => {
        expect(replaceUrlOrigin('')).toBe('');
    });

    it('returns empty string for undefined-ish falsy input', () => {
        expect(replaceUrlOrigin(undefined)).toBe('');
    });

    it('returns original string for invalid URL', () => {
        expect(replaceUrlOrigin('not-a-url')).toBe('not-a-url');
    });
});

describe('normalizeResizedImageUrls', () => {
    it('replaces origin in all resizedUrl entries', () => {
        const input = [
            getImagePropsSandbox(480, 320),
            getImagePropsSandbox(630, 420)
        ];
        const result = normalizeResizedImageUrls(input);
        expect(result[0].resizedUrl).toBe(getProdResizedUrl(320));
        expect(result[1].resizedUrl).toBe(getProdResizedUrl(420));
    });

    it('preserves other properties in each item', () => {
        const input = [getImagePropsSandbox(480, 320)];
        const result = normalizeResizedImageUrls(input);
        expect(result[0].option).toEqual({ height: 480, proportion: '2:3', width: 320 });
    });

    it('returns empty array for undefined input', () => {
        expect(normalizeResizedImageUrls(undefined)).toEqual([]);
    });

    it('returns empty array for empty array input', () => {
        expect(normalizeResizedImageUrls([])).toEqual([]);
    });
});

describe('transformWikiTagData', () => {
    const siteProps = {
        imageConfig: 'wikiTag',
        arcSite: 'la-nacion-ar'
    };

    describe('non-prod environment', () => {
        beforeEach(() => {
            resizeUrlCollection.mockReturnValue([
                getImagePropsSandbox(480, 320),
                getImagePropsSandbox(630, 420),
                getImagePropsSandbox(960, 640),
                getImagePropsSandbox(1260, 840)
            ]);
        });

        it('normalizes resized URLs when API_ENV is not prod', () => {
            const result = transformWikiTagData(mockWikiTagPersonaRawData, siteProps);
            expect(result).toStrictEqual(mockWikiTagPersona);
        });

        it('replaces sandbox-resizer origin in all resizedUrl entries', () => {
            const result = transformWikiTagData(mockWikiTagPersonaRawData, siteProps);
            result.image.resizedUrls.forEach((item) => {
                expect(item.resizedUrl).toMatch(/^https:\/\/www\.lanacion\.com\.ar\//);
            });
        });
    });

    describe('prod environment', () => {
        let transformWikiTagDataProd;

        beforeAll(() => {
            jest.resetModules();
            jest.doMock('fusion:environment', () => ({
                API_ENV: 'prod'
            }));
            jest.doMock('fusion:properties', () => () => ({
                getProperties: () => ({
                    imageConfig: {
                        resize: {
                            default: [],
                            wikiTag: {
                                promo_items: {
                                    sizes: [
                                        { width: 320, height: 480, proportion: '2:3' },
                                        { width: 420, height: 630, proportion: '2:3' },
                                        { width: 640, height: 960, proportion: '2:3' },
                                        { width: 840, height: 1260, proportion: '2:3' }
                                    ]
                                }
                            }
                        }
                    }
                })
            }));
            jest.doMock(
                '../../../../components/private/common/utils/image/resizer/v2/resizerHelper',
                () => ({
                    resizeUrlCollection: jest.fn()
                })
            );

            const mod = require('../../../../content/sources/utils/transformWikiTagData');
            transformWikiTagDataProd = mod.default;
            const { resizeUrlCollection: resizeMock } = require('../../../../components/private/common/utils/image/resizer/v2/resizerHelper');

            resizeMock.mockReturnValue([
                getImagePropsSandbox(480, 320),
                getImagePropsSandbox(630, 420),
                getImagePropsSandbox(960, 640),
                getImagePropsSandbox(1260, 840)
            ]);
        });

        afterAll(() => {
            jest.dontMock('fusion:environment');
            jest.dontMock('fusion:properties');
            jest.dontMock('../../../../components/private/common/utils/image/resizer/v2/resizerHelper');
        });

        it('keeps original resized URLs when API_ENV is prod', () => {
            const result = transformWikiTagDataProd(mockWikiTagPersonaRawData, siteProps);
            result.image.resizedUrls.forEach((item) => {
                expect(item.resizedUrl).toMatch(/^https:\/\/sandbox-resizer\.glanacion\.com\//);
            });
        });
    });
});