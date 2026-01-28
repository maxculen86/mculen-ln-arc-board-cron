import {
    extractVideoData,
    getVideoOrientation,
    calculateDisplayVariant,
    buildPlaylistConfig,
    buildVideoConfig,
    shouldShowFigureCaption,
    DEFAULT_PLAYER_ID,
    VERTICAL_PLAYER_IDS
} from '../../../../../../../components/features/LN/common/video/utils/videoDataUtils';

describe('videoDataUtils', () => {
    describe('extractVideoData', () => {
        it('should extract data from nested structure', () => {
            const data = {
                embed: {
                    config: {
                        idPlayer: 'testPlayer123',
                        videoJw: {
                            title: 'Test Video',
                            description: 'Test Description',
                            playlist: [
                                {
                                    mediaid: 'media123',
                                    sources: [{ file: 'test.mp4' }],
                                    images: [{ src: 'test.jpg', width: 720 }],
                                    image: 'fallback.jpg'
                                }
                            ],
                            epigraphTitle: 'Test Epigraph'
                        }
                    }
                }
            };

            const result = extractVideoData(data);

            expect(result.playerId).toBe('testPlayer123');
            expect(result.title).toBe('Test Video');
            expect(result.description).toBe('Test Description');
            expect(result.mediaId).toBe('media123');
            expect(result.epigraphTitle).toBe('Test Epigraph');
            expect(result.sources).toEqual([{ file: 'test.mp4' }]);
            expect(result.images).toEqual([{ src: 'test.jpg', width: 720 }]);
            expect(result.fallbackImage).toBe('fallback.jpg');
        });

        it('should use default player ID when not provided', () => {
            const data = {
                embed: {
                    config: {
                        videoJw: {
                            title: 'Test',
                            playlist: []
                        }
                    }
                }
            };

            const result = extractVideoData(data);
            expect(result.playerId).toBe(DEFAULT_PLAYER_ID);
        });

        it('should handle empty or undefined data', () => {
            const result = extractVideoData(undefined);

            expect(result.playerId).toBe(DEFAULT_PLAYER_ID);
            expect(result.title).toBe('');
            expect(result.mediaId).toBe('');
            expect(result.playlist).toEqual([]);
        });

        it('should handle data without embed property', () => {
            const result = extractVideoData({});

            expect(result.playerId).toBe(DEFAULT_PLAYER_ID);
            expect(result.title).toBe('');
        });
    });

    describe('getVideoOrientation', () => {
        it('should return vertical for vertical player IDs', () => {
            VERTICAL_PLAYER_IDS.forEach(id => {
                expect(getVideoOrientation(id)).toBe('vertical');
            });
        });

        it('should return horizontal for non-vertical player IDs', () => {
            expect(getVideoOrientation('ih0086X3')).toBe('horizontal');
            expect(getVideoOrientation('randomId')).toBe('horizontal');
        });

        it('should return horizontal for undefined', () => {
            expect(getVideoOrientation(undefined)).toBe('horizontal');
        });
    });

    describe('calculateDisplayVariant', () => {
        it('should return horizontal for opening with non-vertical subtype', () => {
            const result = calculateDisplayVariant({
                isOpening: true,
                subtype: '5',
                playerId: 'hOz6uuUy'
            });

            expect(result).toBe('horizontal');
        });

        it('should return vertical for opening with VIDEO_VERTICAL subtype and vertical player', () => {
            const result = calculateDisplayVariant({
                isOpening: true,
                subtype: '16',
                playerId: 'hOz6uuUy'
            });

            expect(result).toBe('vertical');
        });

        it('should return orientation when not opening', () => {
            const resultVertical = calculateDisplayVariant({
                isOpening: false,
                subtype: '5',
                playerId: 'hOz6uuUy'
            });

            const resultHorizontal = calculateDisplayVariant({
                isOpening: false,
                subtype: '5',
                playerId: 'ih0086X3'
            });

            expect(resultVertical).toBe('vertical');
            expect(resultHorizontal).toBe('horizontal');
        });
    });

    describe('buildPlaylistConfig', () => {
        it('should normalize playlist items', () => {
            const playlist = [
                {
                    mediaid: 'id1',
                    sources: [{ file: 'a.mp4' }],
                    extraProp: 'ignored'
                },
                { mediaid: 'id2', sources: [{ file: 'b.mp4' }] }
            ];

            const result = buildPlaylistConfig(playlist, 'fallbackId', []);

            expect(result).toEqual([
                { mediaid: 'id1', sources: [{ file: 'a.mp4' }] },
                { mediaid: 'id2', sources: [{ file: 'b.mp4' }] }
            ]);
        });

        it('should use fallback when playlist is empty', () => {
            const fallbackSources = [{ file: 'fallback.mp4' }];
            const result = buildPlaylistConfig(
                [],
                'fallbackId',
                fallbackSources
            );

            expect(result).toEqual([
                { mediaid: 'fallbackId', sources: fallbackSources }
            ]);
        });

        it('should handle undefined playlist', () => {
            const result = buildPlaylistConfig(undefined, 'fallbackId', []);

            expect(result).toEqual([{ mediaid: 'fallbackId', sources: [] }]);
        });
    });

    describe('buildVideoConfig', () => {
        it('should build config object with all properties', () => {
            const config = buildVideoConfig({
                title: 'Test Title',
                mediaId: 'media123',
                playerId: 'player123',
                playlist: [{ mediaid: 'media123' }],
                hasAutoplay: true,
                tagsUrl: 'http://tags.url',
                arcSite: 'la-nacion-ar'
            });

            expect(config).toEqual({
                title: 'Test Title',
                mediaId: 'media123',
                playerId: 'player123',
                playlist: [{ mediaid: 'media123' }],
                hasAutoplay: true,
                autostart: true,
                tagsUrl: 'http://tags.url',
                arcSite: 'la-nacion-ar'
            });
        });

        it('should convert hasAutoplay to boolean', () => {
            const configFalsy = buildVideoConfig({
                title: '',
                mediaId: '',
                playerId: '',
                playlist: [],
                hasAutoplay: 0
            });

            const configTruthy = buildVideoConfig({
                title: '',
                mediaId: '',
                playerId: '',
                playlist: [],
                hasAutoplay: 'yes'
            });

            expect(configFalsy.hasAutoplay).toBe(false);
            expect(configTruthy.hasAutoplay).toBe(true);
        });
    });

    describe('shouldShowFigureCaption', () => {
        const subtypesWithoutCaption = ['5', '9', '11', '2', '16'];

        it('should return true when not promo item video', () => {
            const result = shouldShowFigureCaption({
                isPromoItemVideo: false,
                subtype: '5',
                subtypesWithoutCaption
            });

            expect(result).toBe(true);
        });

        it('should return true for promo item with regular subtype', () => {
            const result = shouldShowFigureCaption({
                isPromoItemVideo: true,
                subtype: '1',
                subtypesWithoutCaption
            });

            expect(result).toBe(true);
        });

        it('should return false for promo item with subtype without caption', () => {
            const result = shouldShowFigureCaption({
                isPromoItemVideo: true,
                subtype: '5',
                subtypesWithoutCaption
            });

            expect(result).toBe(false);
        });
    });

    describe('constants', () => {
        it('should export correct DEFAULT_PLAYER_ID', () => {
            expect(DEFAULT_PLAYER_ID).toBe('ih0086X3');
        });

        it('should export correct VERTICAL_PLAYER_IDS', () => {
            expect(VERTICAL_PLAYER_IDS).toEqual([
                'hOz6uuUy',
                'HbGKzdo0',
                '9gbjbJp8',
                'tMVdYMxO'
            ]);
        });
    });
});
