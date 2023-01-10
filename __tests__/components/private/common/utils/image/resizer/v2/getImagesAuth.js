import 'regenerator-runtime/runtime';
import getImagesAuth from '../../../../../../../../content/sources/utils/signingServiceSource/getImagesAuth';

describe('Content - sources - utils - signingServiceSource', () => {
    describe('getImagesAuth function', () => {
        const cachedCall = jest.fn();

        const dataPromoItems = {
            basic: {
                type: 'image',
                auth: {}
            },
            storytelling_mobile: {
                type: 'image',
                auth: {}
            }
        };

        const mockAuth = { 1: 'MockExample' };

        afterEach(() => {
            cachedCall.mockClear();
        });

        test('Should call cachedCall for both basic and storytelling_mobile promo_item that does not have auth', async done => {
            cachedCall
                .mockReturnValueOnce({ hash: 'MockHashBasic' })
                .mockReturnValueOnce({ hash: 'MockHashStorytelling' });

            getImagesAuth(dataPromoItems, cachedCall)
                .then(result => {
                    expect(result).toStrictEqual({
                        basicHash: 'MockHashBasic',
                        storytellingHash: 'MockHashStorytelling'
                    });
                    expect(cachedCall).toBeCalledTimes(2);
                })
                .then(done);
        });
        test('Should call cachedCall for basic promo_item that does not have auth', async done => {
            cachedCall.mockReturnValueOnce({ hash: 'MockHashBasic' });
            dataPromoItems.storytelling_mobile.auth = { ...mockAuth };

            getImagesAuth(dataPromoItems, cachedCall)
                .then(result => {
                    expect(result).toStrictEqual({
                        basicHash: 'MockHashBasic'
                    });
                    expect(cachedCall).toBeCalledTimes(1);
                })
                .then(done);
        });
        test('Should call cachedCall for storytelling_mobile promo_item that does not have auth', async done => {
            cachedCall.mockReturnValueOnce({ hash: 'MockHashStorytelling' });
            dataPromoItems.storytelling_mobile.auth = {};
            dataPromoItems.basic.auth = { ...mockAuth };

            getImagesAuth(dataPromoItems, cachedCall)
                .then(result => {
                    expect(result).toStrictEqual({
                        storytellingHash: 'MockHashStorytelling'
                    });
                    expect(cachedCall).toBeCalledTimes(1);
                })
                .then(done);
        });
        test('Should not call cachedCall if both promo_items have auth', async done => {
            dataPromoItems.storytelling_mobile.auth = { ...mockAuth };
            dataPromoItems.basic.auth = { ...mockAuth };

            getImagesAuth(dataPromoItems, cachedCall)
                .then(result => {
                    expect(result).toStrictEqual({});
                    expect(cachedCall).not.toBeCalled();
                })
                .then(done);
        });
    });
});
