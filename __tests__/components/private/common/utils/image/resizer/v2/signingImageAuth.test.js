import hasPromoItemImgAuth from '../../../../../../../../content/sources/utils/signingImageAuth';

describe('Content - sources - utils - signingImageAuth', () => {
    describe('hasPromoItemImgAuth function', () => {
        test('Should return true when basic promo_item image has not auth', () => {
            const dataPromoItem = {
                promo_items: {
                    basic: {
                        type: 'image',
                        auth: {}
                    }
                }
            };
            expect(hasPromoItemImgAuth({ dataPromoItem })).toBe(true);
        });
        test('Should return true when storytelling_mobile promo_item image has not auth', () => {
            const dataPromoItem = {
                promo_items: {
                    storytelling_mobile: {
                        type: 'image',
                        auth: {}
                    }
                }
            };
            expect(hasPromoItemImgAuth({ dataPromoItem })).toBe(true);
        });
        test('Should return true when both basic and storytelling_mobile promo_item images have not auth', () => {
            const dataPromoItem = {
                promo_items: {
                    basic: {
                        type: 'image',
                        auth: {}
                    }
                },
                storytelling_mobile: {
                    type: 'image',
                    auth: {}
                }
            };
            expect(hasPromoItemImgAuth({ dataPromoItem })).toBe(true);
        });
        test('Should return false when both basic and storytelling_mobile promo_item images both have auth', () => {
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
            expect(hasPromoItemImgAuth({ dataPromoItem })).toBe(false);
        });
    });
});
