import {
    FIRST_ARTICLE_TARGET_MEDIA,
    SECOND_ARTICLE_TARGET_MEDIA,
    getPromoItemMedia,
    getTargetMedia,
    applyFirstArticleRules,
    buildSecondArticlePreload
} from '../../../../../../../../../components/private/common/utils/image/getDataToLinkImage/_helper/_homeHelper';

describe('getDataToLinkImage - _helper - _homeHelper', () => {
    const MOBILE = '(max-width: 767px)';
    const TABLET = '(min-width: 768px)';
    const DESKTOP = '(min-width: 1024px)';

    const FIRST_ARTICLE_MOBILE = {
        resizedUrl:
            'https://sandbox.lanacion.com.ar/resizer/v2/HWSYUPWYQ5DKDON4ZV74I6MWZU.jpg?auth=b11cb978063ab67239e04c9862e3476a8a781343630f6298f4a5632e060a2ff5&width=420&height=280&quality=70&smart=true',
        media: MOBILE,
        option: {
            height: 280,
            maxScreenWidth: 767,
            media_preload: MOBILE,
            proportion: '3:2',
            width: 420
        }
    };

    const FIRST_ARTICLE_TABLET = {
        resizedUrl:
            'https://sandbox.lanacion.com.ar/resizer/v2/HWSYUPWYQ5DKDON4ZV74I6MWZU.jpg?auth=b11cb978063ab67239e04c9862e3476a8a781343630f6298f4a5632e060a2ff5&width=302&height=201&quality=70&smart=true',
        media: TABLET,
        option: {
            height: 201,
            media_preload: TABLET,
            proportion: '3:2',
            width: 302
        }
    };

    const SECOND_ARTICLE_TABLET = {
        resizedUrl:
            'https://sandbox.lanacion.com.ar/resizer/v2/operativo-AZIJTNIABBHJ5JSXHGKHVHC5ZE.png?auth=1e3d6f756dbcad505ca0e619d5b6abfceac77062c8fa9b13409e4ea4fe7fc7c0&width=488&height=325&quality=70&smart=true',
        media: TABLET,
        option: {
            width: 488,
            height: 325,
            minScreenWidth: 768,
            media_preload: TABLET,
            proportion: '3:2'
        }
    };

    const SECOND_ARTICLE_MOBILE = {
        resizedUrl:
            'https://sandbox.lanacion.com.ar/resizer/v2/operativo-AZIJTNIABBHJ5JSXHGKHVHC5ZE.png?auth=1e3d6f756dbcad505ca0e619d5b6abfceac77062c8fa9b13409e4ea4fe7fc7c0&width=420&height=280&quality=70&smart=true',
        media: MOBILE,
        option: {
            width: 420,
            height: 280,
            media_preload: MOBILE,
            proportion: '3:2'
        }
    };

    describe('getPromoItemMedia', () => {
        it('should return media or fallback to option.media_preload', () => {
            expect(getPromoItemMedia(FIRST_ARTICLE_MOBILE)).toBe(MOBILE);
            expect(
                getPromoItemMedia({
                    media: '',
                    option: { media_preload: TABLET }
                })
            ).toBe(TABLET);
            expect(getPromoItemMedia({})).toBe('');
            expect(getPromoItemMedia(null)).toBe('');
        });
    });

    describe('getTargetMedia', () => {
        it('should return target media according to rules', () => {
            expect(
                getTargetMedia('center-focal', FIRST_ARTICLE_TARGET_MEDIA)
            ).toBe(MOBILE);
            expect(
                getTargetMedia('left-focal', FIRST_ARTICLE_TARGET_MEDIA)
            ).toBeNull();

            expect(
                getTargetMedia('center-focal', SECOND_ARTICLE_TARGET_MEDIA)
            ).toBe(TABLET);
            expect(
                getTargetMedia('left-focal', SECOND_ARTICLE_TARGET_MEDIA)
            ).toBe(DESKTOP);
            expect(
                getTargetMedia(
                    'left-focal-without-timeline',
                    SECOND_ARTICLE_TARGET_MEDIA
                )
            ).toBe(DESKTOP);
            expect(
                getTargetMedia('focal-70', SECOND_ARTICLE_TARGET_MEDIA)
            ).toBeNull();
        });
    });

    describe('applyFirstArticleRules', () => {
        it('should return the original promoItems when no rule applies', () => {
            const promoItems = [FIRST_ARTICLE_MOBILE, FIRST_ARTICLE_TABLET];
            const result = applyFirstArticleRules('left-focal', promoItems);
            expect(result).toEqual(promoItems);
        });

        it('should filter only MOBILE for center-focal diagramation', () => {
            const promoItems = [FIRST_ARTICLE_MOBILE, FIRST_ARTICLE_TABLET];
            const result = applyFirstArticleRules('center-focal', promoItems);
            expect(result).toEqual([FIRST_ARTICLE_MOBILE]);
        });

        it('should return [] for empty promoItems', () => {
            const promoItems = [];
            expect(applyFirstArticleRules('center-focal', promoItems)).toEqual(
                []
            );
        });
    });

    describe('buildSecondArticlePreload', () => {
        it('should return [] when no rule applies', () => {
            const result = buildSecondArticlePreload('focal-70', [
                SECOND_ARTICLE_TABLET,
                SECOND_ARTICLE_MOBILE
            ]);
            expect(result).toEqual([]);
        });

        it('should return [] when no TABLET base item exists', () => {
            const result = buildSecondArticlePreload('center-focal', [
                SECOND_ARTICLE_MOBILE
            ]);
            expect(result).toEqual([]);
        });

        it('should clone TABLET item and keep TABLET media for center-focal', () => {
            const result = buildSecondArticlePreload('center-focal', [
                SECOND_ARTICLE_TABLET,
                SECOND_ARTICLE_MOBILE
            ]);
            expect(result).toHaveLength(1);
            const preloadItem = result[0];
            expect(preloadItem.resizedUrl).toBe(
                SECOND_ARTICLE_TABLET.resizedUrl
            );
            expect(preloadItem.media).toBe(TABLET);
            expect(preloadItem.option.media_preload).toBe(TABLET);
        });

        it('should clone TABLET item and convert to DESKTOP media for left-focal or left-focal-without-timeline', () => {
            const result = buildSecondArticlePreload('left-focal', [
                SECOND_ARTICLE_TABLET,
                SECOND_ARTICLE_MOBILE
            ]);
            expect(result).toHaveLength(1);
            const preloadItem = result[0];
            expect(preloadItem.media).toBe(DESKTOP);
            expect(preloadItem.option.media_preload).toBe(DESKTOP);
        });
    });
});
