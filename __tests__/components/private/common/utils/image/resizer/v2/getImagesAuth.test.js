import 'regenerator-runtime/runtime';
import {
    getPromoItemsAuth,
    signingServiceCachedCall
} from '../../../../../../../../content/sources/utils/signingServiceSource/getImagesAuth';
import signingServiceSource from '../../../../../../../../content/sources/signingServiceSource';
import logger from '../../../../../../../../components/private/common/utils/logger';

jest.mock(
    '../../../../../../../../components/private/common/utils/logger',
    () => {
        const push = jest.fn();
        return { push };
    }
);

describe('Content - sources - utils - signingServiceSource', () => {
    describe('getPromoItemsAuth function', () => {
        const cachedCall = jest.fn();
        const dataPromoItems = {
            basic: {
                _id: 'MockBasicId',
                type: 'image',
                auth: {}
            },
            storytelling_mobile: {
                _id: 'MockStorytellingMobileId',
                type: 'image',
                auth: {}
            },
            storytelling: {
                _id: 'MockStorytellingId',
                type: 'video',
                promo_items: {
                    basic: {
                        url: 'MockStorytellingUrl',
                        auth: {}
                    }
                }
            },
            apertura_multimedia: {
                _id: 'MockAperturaMultimediaId',
                type: 'video',
                promo_items: {
                    basic: {
                        url: 'MockAperturaMultimediaUrl',
                        auth: {}
                    }
                }
            }
        };

        const mockAuth = { 1: 'MockExample' };

        afterEach(() => {
            cachedCall.mockClear();
        });

        test('Should call cachedCall for all promo_item types without auth', async done => {
            cachedCall
                .mockReturnValueOnce({ hash: 'MockHashBasic' })
                .mockReturnValueOnce({ hash: 'MockHashStorytelling' })
                .mockReturnValueOnce({ hash: 'MockHashStorytellingMobile' })
                .mockReturnValueOnce({ hash: 'MockVideoHash' });

            getPromoItemsAuth(dataPromoItems, cachedCall)
                .then(result => {
                    expect(result).toStrictEqual({
                        basicHash: 'MockHashBasic',
                        storytellingHash: 'MockHashStorytelling',
                        storytellingMobileHash: 'MockHashStorytellingMobile',
                        videoHash: 'MockVideoHash'
                    });
                    expect(cachedCall).toBeCalledTimes(4);
                })
                .then(done);
        });
        test('Should call cachedCall for basic promo_item image that does not have auth', async done => {
            cachedCall.mockReturnValueOnce({ hash: 'MockHashBasic' });
            dataPromoItems.basic.auth = {};
            dataPromoItems.storytelling.promo_items.basic.auth = {
                ...mockAuth
            };
            dataPromoItems.storytelling_mobile.auth = { ...mockAuth };
            dataPromoItems.apertura_multimedia.promo_items.basic.auth = {
                ...mockAuth
            };

            getPromoItemsAuth(dataPromoItems, cachedCall)
                .then(result => {
                    expect(result).toStrictEqual({
                        basicHash: 'MockHashBasic'
                    });
                    expect(cachedCall).toBeCalledTimes(1);
                })
                .then(done);
        });
        test('Should call cachedCall for storytelling_mobile promo_item that does not have auth', async done => {
            cachedCall.mockReturnValueOnce({
                hash: 'MockHashStorytellingMobile'
            });
            dataPromoItems.storytelling_mobile.auth = {};
            dataPromoItems.storytelling.promo_items.basic.auth = {
                ...mockAuth
            };
            dataPromoItems.apertura_multimedia.promo_items.basic.auth = {
                ...mockAuth
            };
            dataPromoItems.basic.auth = { ...mockAuth };

            getPromoItemsAuth(dataPromoItems, cachedCall)
                .then(result => {
                    expect(result).toStrictEqual({
                        storytellingMobileHash: 'MockHashStorytellingMobile'
                    });
                    expect(cachedCall).toBeCalledTimes(1);
                })
                .then(done);
        });
        test('Should call cachedCall for storytelling promo_item that does not have auth', async done => {
            cachedCall.mockReturnValueOnce({
                hash: 'MockHashStorytelling'
            });
            dataPromoItems.storytelling.promo_items.basic.auth = {};
            dataPromoItems.storytelling_mobile.auth = { ...mockAuth };
            dataPromoItems.apertura_multimedia.promo_items.basic.auth = {
                ...mockAuth
            };
            dataPromoItems.basic.auth = { ...mockAuth };

            getPromoItemsAuth(dataPromoItems, cachedCall)
                .then(result => {
                    expect(result).toStrictEqual({
                        storytellingHash: 'MockHashStorytelling'
                    });
                    expect(cachedCall).toBeCalledTimes(1);
                })
                .then(done);
        });
        test('Should call cachedCall for apertura_multimedia promo_item that does not have auth', async done => {
            cachedCall.mockReturnValueOnce({
                hash: 'MockHashAperturaMultimedia'
            });
            dataPromoItems.apertura_multimedia.promo_items.basic.auth = {};
            dataPromoItems.storytelling.promo_items.basic.auth = {
                ...mockAuth
            };
            dataPromoItems.storytelling_mobile.auth = { ...mockAuth };
            dataPromoItems.basic.auth = { ...mockAuth };

            getPromoItemsAuth(dataPromoItems, cachedCall)
                .then(result => {
                    expect(result).toStrictEqual({
                        videoHash: 'MockHashAperturaMultimedia'
                    });
                    expect(cachedCall).toBeCalledTimes(1);
                })
                .then(done);
        });
        test('Should not call cachedCall if all provided promo_items have auth', async done => {
            dataPromoItems.storytelling.promo_items.basic.auth = {
                ...mockAuth
            };
            dataPromoItems.apertura_multimedia.promo_items.basic.auth = {
                ...mockAuth
            };
            dataPromoItems.storytelling_mobile.auth = { ...mockAuth };
            dataPromoItems.basic.auth = { ...mockAuth };

            getPromoItemsAuth(dataPromoItems, cachedCall)
                .then(result => {
                    expect(result).toStrictEqual({});
                    expect(cachedCall).not.toBeCalled();
                })
                .then(done);
        });
        test('Should call cachedCall for basic promo_item video that does not have auth', async done => {
            cachedCall.mockReturnValueOnce({ hash: 'MockVideoBasicHash' });
            dataPromoItems.basic = {
                type: 'video',
                promo_items: {
                    basic: {
                        url: 'mockVideoBasicUrl',
                        auth: {}
                    }
                }
            };
            dataPromoItems.storytelling.promo_items.basic.auth = {
                ...mockAuth
            };
            dataPromoItems.storytelling_mobile.auth = { ...mockAuth };
            dataPromoItems.apertura_multimedia.promo_items.basic.auth = {
                ...mockAuth
            };

            getPromoItemsAuth(dataPromoItems, cachedCall)
                .then(result => {
                    expect(result).toStrictEqual({
                        videoBasicHash: 'MockVideoBasicHash'
                    });
                    expect(cachedCall).toBeCalledTimes(1);
                })
                .then(done);
        });
    });

    describe('signingServiceCachedCall function', () => {
        const cachedCall = jest.fn();
        afterEach(() => {
            cachedCall.mockClear();
        });

        test('Should call cachedCall with provided ID to get its hash', async done => {
            cachedCall.mockReturnValue({ hash: 'MockHash' });

            signingServiceCachedCall('MockId', cachedCall)
                .then(result => {
                    expect(result).toStrictEqual({ hash: 'MockHash' });
                    expect(cachedCall).toBeCalledTimes(1);
                    expect(cachedCall).toBeCalledWith(
                        'signingServiceSource Token',
                        signingServiceSource.fetch,
                        {
                            query: { imageId: 'MockId' },
                            ttl: 31536000,
                            independent: true
                        }
                    );
                })
                .then(done);
        });

        test('Should return null when ID or cachedCall are not provided', async done => {
            cachedCall.mockReturnValue({ hash: 'MockHash' });

            signingServiceCachedCall(undefined, cachedCall)
                .then(result => {
                    expect(result).toStrictEqual({});
                    expect(cachedCall).not.toBeCalled();
                })
                .then(done);
            signingServiceCachedCall('MockId')
                .then(result => {
                    expect(result).toStrictEqual({});
                    expect(cachedCall).not.toBeCalled();
                })
                .then(done);
        });

        test('Should catch error properly', async done => {
            cachedCall.mockImplementation(() => {
                throw new Error('Mocked Error');
            });
            const loggerPush = jest.spyOn(logger, 'push');

            signingServiceCachedCall('MockId', cachedCall)
                .then(() => {
                    expect(loggerPush).toBeCalledTimes(1);
                    expect(loggerPush).toBeCalledWith(
                        new Error('Mocked Error'),
                        {
                            source:
                                'content/source/signingServiceSource/getImagesAuth',
                            url: 'MockId'
                        }
                    );
                })
                .then(done);
        });
    });
});
