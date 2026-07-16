import {
    getBannerStrategy,
    getUserBannerInsertInterval,
    NON_SUBSCRIBER_BANNER_INSERT_INTERVAL,
    SUBSCRIBER_BANNER_INSERT_INTERVAL
} from '../../../../../../components/features/LN-nota/body/_utils/dynamicBannerStrategies';
import {
    OPINION,
    STORYTELLING
} from '../../../../../../components/private/common/utils/subtypes/subtypeHelper';

describe('bannerStrategies', () => {
    describe('getBannerStrategy', () => {
        it('should return opinion strategy when subtype is OPINION', () => {
            const strategy = getBannerStrategy(OPINION);

            expect(strategy).toHaveProperty('shouldInsert');
            expect(strategy).toHaveProperty('getBannerIndex');
        });

        it('should return user type strategy when subtype is STORYTELLING', () => {
            const strategy = getBannerStrategy(STORYTELLING);

            expect(strategy).toHaveProperty('shouldInsert');
            expect(strategy).toHaveProperty('getBannerIndex');
        });

        it('should return default strategy for unknown subtype', () => {
            const strategy = getBannerStrategy('unknown');

            expect(strategy).toHaveProperty('shouldInsert');
            expect(strategy).toHaveProperty('getBannerIndex');
        });
    });

    describe('defaultBannerStrategy', () => {
        const strategy = getBannerStrategy(undefined);
        const maxBanners = 5;

        describe('shouldInsert', () => {
            it('should insert banner every 4 elements within limit', () => {
                expect(
                    strategy.shouldInsert({
                        itemIndex: 3,
                        bannerIndex: 1,
                        maxBanners
                    })
                ).toBe(true);

                expect(
                    strategy.shouldInsert({
                        itemIndex: 7,
                        bannerIndex: 2,
                        maxBanners
                    })
                ).toBe(true);
            });

            it('should not insert on non-matching positions', () => {
                [0, 1, 2, 4, 5, 6].forEach(index => {
                    expect(
                        strategy.shouldInsert({
                            itemIndex: index,
                            bannerIndex: 1,
                            maxBanners
                        })
                    ).toBe(false);
                });
            });

            it('should not insert for negative index', () => {
                expect(
                    strategy.shouldInsert({
                        itemIndex: -1,
                        bannerIndex: 1,
                        maxBanners
                    })
                ).toBe(false);
            });

            it('should not insert when exceeding maxBanners', () => {
                expect(
                    strategy.shouldInsert({
                        itemIndex: 3,
                        bannerIndex: 6,
                        maxBanners
                    })
                ).toBe(false);
            });
        });

        describe('getBannerIndex', () => {
            it('should calculate correct bannerIndex', () => {
                expect(strategy.getBannerIndex({ elementPosition: 4 })).toBe(1);

                expect(strategy.getBannerIndex({ elementPosition: 8 })).toBe(2);
            });
        });

        describe('banner insertion sequence', () => {
            it('should insert up to maxBanners (5) respecting interval (positions 4, 8, 12, 16, 20 → 0-based: 3, 7, 11, 15, 19)', () => {
                let bannerIndex = 1;
                const insertPositions = [];

                for (let i = 0; i < 30; i++) {
                    if (
                        strategy.shouldInsert({
                            itemIndex: i,
                            bannerIndex,
                            maxBanners
                        })
                    ) {
                        insertPositions.push(i);
                        bannerIndex++;
                    }
                }

                expect(insertPositions).toEqual([3, 7, 11, 15, 19]);
            });
        });
    });

    describe('getUserBannerInsertInterval', () => {
        it('should return a 5 element interval for non-subscribers', () => {
            expect(getUserBannerInsertInterval(false)).toBe(
                NON_SUBSCRIBER_BANNER_INSERT_INTERVAL
            );
        });

        it('should return an 8 element interval for subscribers', () => {
            expect(getUserBannerInsertInterval(true)).toBe(
                SUBSCRIBER_BANNER_INSERT_INTERVAL
            );
        });
    });

    describe('userTypeBannerStrategy', () => {
        const strategy = getBannerStrategy(OPINION);
        const maxBanners = undefined;

        describe('shouldInsert', () => {
            it('should insert banners every 5 elements for non-subscribers', () => {
                expect(
                    strategy.shouldInsert({
                        itemIndex: 4,
                        bannerIndex: 1,
                        maxBanners,
                        isSubscribed: false
                    })
                ).toBe(true);

                expect(
                    strategy.shouldInsert({
                        itemIndex: 9,
                        bannerIndex: 2,
                        maxBanners,
                        isSubscribed: false
                    })
                ).toBe(true);
            });

            it('should insert banners every 8 elements for subscribers', () => {
                expect(
                    strategy.shouldInsert({
                        itemIndex: 7,
                        bannerIndex: 1,
                        maxBanners,
                        isSubscribed: true
                    })
                ).toBe(true);

                expect(
                    strategy.shouldInsert({
                        itemIndex: 15,
                        bannerIndex: 2,
                        maxBanners,
                        isSubscribed: true
                    })
                ).toBe(true);
            });

            it('should not insert non-subscriber banners outside 5 element intervals', () => {
                [0, 1, 2, 3, 5, 6, 7, 8].forEach(index => {
                    expect(
                        strategy.shouldInsert({
                            itemIndex: index,
                            bannerIndex: 1,
                            maxBanners,
                            isSubscribed: false
                        })
                    ).toBe(false);
                });
            });

            it('should not insert subscriber banners outside 8 element intervals', () => {
                [0, 1, 2, 3, 4, 5, 6, 8, 9].forEach(index => {
                    expect(
                        strategy.shouldInsert({
                            itemIndex: index,
                            bannerIndex: 1,
                            maxBanners,
                            isSubscribed: true
                        })
                    ).toBe(false);
                });
            });

            it('should not insert when exceeding maxBanners', () => {
                expect(
                    strategy.shouldInsert({
                        itemIndex: 4,
                        bannerIndex: 5,
                        maxBanners: 4,
                        isSubscribed: false
                    })
                ).toBe(false);
            });
        });

        describe('getBannerIndex', () => {
            it('should return next banner index based on counter', () => {
                expect(
                    strategy.getBannerIndex({
                        bannerCounter: { current: 0 }
                    })
                ).toBe(1);

                expect(
                    strategy.getBannerIndex({
                        bannerCounter: { current: 1 }
                    })
                ).toBe(2);
            });
        });

        describe('banner insertion sequence', () => {
            it('should follow the non-subscriber sequence every 5 elements', () => {
                const bannerCounter = { current: 0 };
                let bannerIndex = 1;

                const insertPositions = [];

                for (let i = 0; i < 30; i++) {
                    if (
                        strategy.shouldInsert({
                            itemIndex: i,
                            bannerCounter,
                            bannerIndex,
                            maxBanners,
                            isSubscribed: false
                        })
                    ) {
                        insertPositions.push(i);
                        bannerCounter.current++;
                        bannerIndex++;
                    }
                }

                expect(insertPositions).toEqual([4, 9, 14, 19, 24, 29]);
            });

            it('should follow the subscriber sequence every 8 elements', () => {
                const bannerCounter = { current: 0 };
                let bannerIndex = 1;

                const insertPositions = [];

                for (let i = 0; i < 30; i++) {
                    if (
                        strategy.shouldInsert({
                            itemIndex: i,
                            bannerCounter,
                            bannerIndex,
                            maxBanners,
                            isSubscribed: true
                        })
                    ) {
                        insertPositions.push(i);
                        bannerCounter.current++;
                        bannerIndex++;
                    }
                }

                expect(insertPositions).toEqual([7, 15, 23]);
            });
        });
    });
});
