import {
    missingPromoItemImgAuth,
    missingContentElementImgAuth,
    missingCreditsImgAuth
} from '../../../../../../../../content/sources/utils/signingImageAuth';
import MOCK_ARTICLE from '../../../../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import MOCK_ARTICLE_AUTH_OK from '../../../../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY_v2.json';

describe('Content - sources - utils - signingImageAuth', () => {
    describe('missingPromoItemImgAuth function', () => {
        const { promo_items: promoItemsMock } = MOCK_ARTICLE;

        test('Should return true when basic promo_item image has not auth', () => {
            const dataPromoItem = {
                basic: {
                    type: 'image',
                    auth: {}
                }
            };
            expect(missingPromoItemImgAuth({ dataPromoItem })).toBe(true);
            expect(
                missingPromoItemImgAuth({ dataPromoItem: promoItemsMock })
            ).toBe(true);
        });
        test('Should return true when storytelling_mobile promo_item image has not auth', () => {
            const dataPromoItem = {
                storytelling_mobile: {
                    type: 'image',
                    auth: {}
                }
            };
            expect(missingPromoItemImgAuth({ dataPromoItem })).toBe(true);
        });

        test('Should return true when apertura_multimedia promo_item video fakeid has not auth', () => {
            const dataPromoItem = {
                apertura_multimedia: {
                    type: 'video',
                    promo_items: {
                        basic: {
                            auth: {}
                        }
                    }
                }
            };
            expect(missingPromoItemImgAuth({ dataPromoItem })).toBe(true);
        });

        test('Should return true when both basic, storytelling_mobile and apertura_multimedia promo_item images have not auth', () => {
            const dataPromoItem = {
                basic: {
                    type: 'image',
                    auth: {}
                },
                storytelling_mobile: {
                    type: 'image',
                    auth: {}
                },
                apertura_multimedia: {
                    type: 'video',
                    promo_items: {
                        basic: {
                            auth: {}
                        }
                    }
                }
            };
            expect(missingPromoItemImgAuth({ dataPromoItem })).toBe(true);
        });

        test('Should return false when both basic and storytelling_mobile promo_item images have auth', () => {
            const dataPromoItem = {
                promo_items: {
                    basic: {
                        type: 'image',
                        auth: { 1: 'MockExample' }
                    }
                },
                storytelling_mobile: {
                    type: 'image',
                    auth: { 1: 'MockExample' }
                }
            };
            expect(missingPromoItemImgAuth({ dataPromoItem })).toBe(false);
        });

        test('Should return false when both basic, storytelling_mobile and apertura_multimedia: all promo_item images have auth', () => {
            const dataPromoItem = {
                promo_items: {
                    basic: {
                        type: 'image',
                        auth: { 1: 'MockExample' }
                    }
                },
                storytelling_mobile: {
                    type: 'image',
                    auth: { 1: 'MockExample' }
                },
                apertura_multimedia: {
                    type: 'video',
                    promo_items: {
                        basic: {
                            auth: { 1: 'MockExample' }
                        }
                    }
                }
            };
            expect(missingPromoItemImgAuth({ dataPromoItem })).toBe(false);
        });
    });

    describe('missingContentElementImgAuth function', () => {
        const { content_elements: contentElementsMock } = MOCK_ARTICLE;

        test('Should return false when content_element are not defined or empty', () => {
            expect(
                missingContentElementImgAuth({ dataContentElements: undefined })
            ).toBe(false);
            expect(
                missingContentElementImgAuth({ dataContentElements: [] })
            ).toBe(false);
        });

        test('Should return true when some content_element image have no auth', () => {
            expect(
                missingContentElementImgAuth({
                    dataContentElements: contentElementsMock
                })
            ).toBe(true);
        });

        test('Should return true when all content_elements images have auth but gallery does NOT have auth', () => {
            const dataContentElements = [
                ...contentElementsMock.map(element =>
                    element.type === 'image'
                        ? { ...element, auth: { 1: 'MockExample' } }
                        : element
                )
            ];
            expect(missingContentElementImgAuth({ dataContentElements })).toBe(
                true
            );
        });

        test('Should return true when all content_elements and galleries have auth but video does NOT have auth', () => {
            const {
                content_elements: contentElementsMock2
            } = MOCK_ARTICLE_AUTH_OK;
            const dataContentElements = [
                ...contentElementsMock2.map(element =>
                    element.type === 'video'
                        ? { ...element, promo_items: { auth: { 1: null } } }
                        : element
                )
            ];
            expect(
                missingContentElementImgAuth({
                    dataContentElements
                })
            ).toBe(true);
        });

        test('Should return false when all content_elements, gallery and video images have auth', () => {
            const { content_elements } = MOCK_ARTICLE_AUTH_OK;
            expect(
                missingContentElementImgAuth({
                    dataContentElements: content_elements
                })
            ).toBe(false);
        });
    });

    describe('missingCreditsImgAuth function', () => {
        const { content_elements: contentElementsMock } = MOCK_ARTICLE;

        test('Should return false when credits are not defined or empty', () => {
            expect(missingCreditsImgAuth({ dataCredits: undefined })).toBe(
                false
            );
            expect(missingCreditsImgAuth({ dataCredits: [] })).toBe(false);
        });

        test('Should return false when all credits images are empty strings', () => {
            const {
                credits: { by: emptyCredits }
            } = MOCK_ARTICLE;

            expect(missingCreditsImgAuth({ dataCredits: emptyCredits })).toBe(
                false
            );
        });

        test('Should return true when all credits images are valid and have no auth', () => {
            const {
                credits: { by: emptyCredits }
            } = MOCK_ARTICLE;
            const creditsWithoutAuth = emptyCredits.map(credit => ({
                ...credit,
                image: { url: 'mockUrl' }
            }));

            expect(
                missingCreditsImgAuth({ dataCredits: creditsWithoutAuth })
            ).toBe(true);
        });

        test('Should return true when some credits image have no auth', () => {
            const {
                credits: { by: creditsWithAuth }
            } = MOCK_ARTICLE_AUTH_OK;
            creditsWithAuth[0].image.auth = {};

            expect(
                missingCreditsImgAuth({
                    dataCredits: creditsWithAuth
                })
            ).toBe(true);
        });

        test('Should return false when all credits image have auth', () => {
            const {
                credits: { by: creditsWithAuth }
            } = MOCK_ARTICLE_AUTH_OK;

            expect(
                missingCreditsImgAuth({
                    dataCredits: creditsWithAuth
                })
            ).toBe(true);
        });
    });
});
