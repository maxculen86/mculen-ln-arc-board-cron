import { getBannerStrategy } from '../../../../../../components/features/LN-nota/body/_utils/dynamicBannerStrategies';

describe('bannerStrategies', () => {
    describe('getBannerStrategy', () => {
        it('should return opinion strategy when subtype is OPINION', () => {
            const strategy = getBannerStrategy('3');

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
                expect(
                    strategy.getBannerIndex({ elementPosition: 4 })
                ).toBe(1);

                expect(
                    strategy.getBannerIndex({ elementPosition: 8 })
                ).toBe(2);
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

    describe('opinionBannerStrategy', () => {
        const strategy = getBannerStrategy('3');
        const maxBanners = 4;

        describe('shouldInsert', () => {
            it('should insert first banner after 2 elements', () => {
                const bannerCounter = { current: 0 };

                expect(
                    strategy.shouldInsert({
                        itemIndex: 1,
                        bannerCounter,
                        bannerIndex: 1,
                        maxBanners
                    })
                ).toBe(true);
            });

            it('should not insert first banner before position 2', () => {
                const bannerCounter = { current: 0 };

                expect(
                    strategy.shouldInsert({
                        itemIndex: 0,
                        bannerCounter,
                        bannerIndex: 1,
                        maxBanners
                    })
                ).toBe(false);
            });

            it('should insert subsequent banners every 4 elements after shift', () => {
                const bannerCounter = { current: 1 };

                expect(
                    strategy.shouldInsert({
                        itemIndex: 5,
                        bannerCounter,
                        bannerIndex: 2,
                        maxBanners
                    })
                ).toBe(true);

                expect(
                    strategy.shouldInsert({
                        itemIndex: 9,
                        bannerCounter,
                        bannerIndex: 3,
                        maxBanners
                    })
                ).toBe(true);
            });

            it('should not insert in non-matching positions after first banner', () => {
                const bannerCounter = { current: 1 };

                [2, 3, 4, 6, 7, 8].forEach(index => {
                    expect(
                        strategy.shouldInsert({
                            itemIndex: index,
                            bannerCounter,
                            bannerIndex: 2,
                            maxBanners
                        })
                    ).toBe(false);
                });
            });

            it('should not insert when shiftedIndex is negative', () => {
                const bannerCounter = { current: 1 };

                expect(
                    strategy.shouldInsert({
                        itemIndex: 1,
                        bannerCounter,
                        bannerIndex: 2,
                        maxBanners
                    })
                ).toBe(false);
            });

            it('should not insert when exceeding maxBanners', () => {
                const bannerCounter = { current: 0 };

                expect(
                    strategy.shouldInsert({
                        itemIndex: 1,
                        bannerCounter,
                        bannerIndex: 5,
                        maxBanners
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
            it('should follow expected full sequence for opinion subtype and respect maxBanners (after 2 elements, then every 4 → 0-based: 1, 5, 9, 13)', () => {
                const bannerCounter = { current: 0 };
                let bannerIndex = 1;

                const insertPositions = [];

                for (let i = 0; i < 30; i++) {
                    if (
                        strategy.shouldInsert({
                            itemIndex: i,
                            bannerCounter,
                            bannerIndex,
                            maxBanners
                        })
                    ) {
                        insertPositions.push(i);
                        bannerCounter.current++;
                        bannerIndex++;
                    }
                }

                expect(insertPositions).toEqual([1, 5, 9, 13]);
            });
        });
    });
});