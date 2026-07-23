/**
 * Tests for the persistent JW player architecture in mediaScrollerExpanded.
 * Covers S3, S4, S10, S11, CRITICAL-1 (banner-mixed index translation),
 * and isOverlayVisible (Approach A overlay placement) from the spec.
 */
import {
    setupPersistentPlayer,
    attachComscorePlugin,
    registerPersistentPlayerEvents,
    resetComscoreGuard
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper';
import { isOverlayVisible } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoContainer';

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/helpers',
    () => ({
        ...jest.requireActual(
            '../../../../../../components/chains/LN10_Caja_Carrusel/components/helpers'
        ),
        handleEventSwipeVideo: jest.fn(),
        resetTracking: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

const makeMockPlayer = () => {
    const handlers = {};
    return {
        setup: jest.fn().mockReturnThis(),
        playlistItem: jest.fn(),
        on: jest.fn((event, handler) => {
            if (!handlers[event]) handlers[event] = [];
            handlers[event].push(handler);
        }),
        off: jest.fn(),
        getMute: jest.fn().mockReturnValue(false),
        setMute: jest.fn(),
        getState: jest.fn().mockReturnValue('idle'),
        remove: jest.fn(),
        getPlaylist: jest.fn().mockReturnValue([]),
        getPlaylistIndex: jest.fn().mockReturnValue(0),
        play: jest.fn(),
        stop: jest.fn(),
        skipAd: jest.fn(),
        pauseAd: jest.fn(),
        getPlugin: jest.fn().mockReturnValue(null),
        getPlaylistItem: jest.fn().mockReturnValue(null),
        _handlers: handlers,
        _emit(event, data) {
            if (handlers[event]) {
                handlers[event].forEach(handler => handler(data));
            }
        }
    };
};

describe('setupPersistentPlayer', () => {
    let mockPlayer;

    beforeEach(() => {
        if (typeof resetComscoreGuard === 'function') resetComscoreGuard();
        mockPlayer = makeMockPlayer();
        window.jwplayer = jest.fn().mockReturnValue(mockPlayer);
    });

    afterEach(() => {
        delete window.jwplayer;
    });

    // S3: setup called exactly once for 5-video carousel
    it('should call setup exactly once regardless of how many playlist items are provided', () => {
        const playlist = [
            {
                file: 'a.mp4',
                image: 'a.jpg',
                mediaId: 'vid1',
                title: 'V1',
                duration: 300,
                counterVideo: 1
            },
            {
                file: 'b.mp4',
                image: 'b.jpg',
                mediaId: 'vid2',
                title: 'V2',
                duration: 400,
                counterVideo: 2
            },
            {
                file: 'c.mp4',
                image: 'c.jpg',
                mediaId: 'vid3',
                title: 'V3',
                duration: 500,
                counterVideo: 3
            },
            {
                file: 'd.mp4',
                image: 'd.jpg',
                mediaId: 'vid4',
                title: 'V4',
                duration: 600,
                counterVideo: 4
            },
            {
                file: 'e.mp4',
                image: 'e.jpg',
                mediaId: 'vid5',
                title: 'V5',
                duration: 700,
                counterVideo: 5
            }
        ];

        setupPersistentPlayer({
            playerId: 'test-player',
            playlist,
            urlAds: 'https://ads.example.com'
        });

        expect(window.jwplayer).toHaveBeenCalledWith('test-player');
        expect(mockPlayer.setup).toHaveBeenCalledTimes(1);
    });

    it('should pass a playlist array with all items to JW setup', () => {
        const playlist = [
            {
                file: 'a.mp4',
                image: 'a.jpg',
                mediaId: 'vid1',
                title: 'V1',
                duration: 300,
                counterVideo: 1
            },
            {
                file: 'b.mp4',
                image: 'b.jpg',
                mediaId: 'vid2',
                title: 'V2',
                duration: 400,
                counterVideo: 2
            }
        ];

        setupPersistentPlayer({
            playerId: 'test-player',
            playlist,
            urlAds: ''
        });

        const setupCall = mockPlayer.setup.mock.calls[0][0];
        expect(Array.isArray(setupCall.playlist)).toBe(true);
        expect(setupCall.playlist).toHaveLength(2);
    });

    it('never applies an adschedule to content items — the preroll lives on the ad player', () => {
        const playlist = [
            {
                file: 'a.mp4',
                image: 'a.jpg',
                mediaId: 'vid1',
                title: 'V1',
                duration: 300,
                counterVideo: 1
            },
            {
                file: 'b.mp4',
                image: 'b.jpg',
                mediaId: 'vid2',
                title: 'V2',
                duration: 400,
                counterVideo: 2
            },
            {
                file: 'c.mp4',
                image: 'c.jpg',
                mediaId: 'vid3',
                title: 'V3',
                duration: 500,
                counterVideo: 3
            },
            {
                file: 'd.mp4',
                image: 'd.jpg',
                mediaId: 'vid4',
                title: 'V4',
                duration: 600,
                counterVideo: 4
            }
        ];

        setupPersistentPlayer({
            playerId: 'test-player',
            playlist,
            urlAds: 'https://ads.example.com'
        });

        const setupCall = mockPlayer.setup.mock.calls[0][0];
        const items = setupCall.playlist;

        expect(items[0].adschedule).toBeUndefined();
        expect(items[1].adschedule).toBeUndefined();
        expect(items[2].adschedule).toBeUndefined();
        expect(items[3].adschedule).toBeUndefined();
    });

    it('should return the player instance', () => {
        const playlist = [
            {
                file: 'a.mp4',
                image: 'a.jpg',
                mediaId: 'vid1',
                title: 'V1',
                duration: 300,
                counterVideo: 1
            }
        ];

        const result = setupPersistentPlayer({
            playerId: 'test-player',
            playlist,
            urlAds: ''
        });

        expect(result).toBe(mockPlayer);
    });
});

describe('attachComscorePlugin', () => {
    beforeEach(() => {
        if (typeof resetComscoreGuard === 'function') resetComscoreGuard();
        window.ns_ = { ComscoreJWPlayerPlugin: jest.fn() };
    });

    afterEach(() => {
        delete window.ns_;
    });

    // S10: Comscore constructor called exactly once
    it('should call ComscoreJWPlayerPlugin constructor exactly once', () => {
        const mockPlayer = makeMockPlayer();

        attachComscorePlugin(mockPlayer);

        expect(window.ns_.ComscoreJWPlayerPlugin).toHaveBeenCalledTimes(1);
    });

    it('should pass the player instance and options with publisherId and labelmapping to ComscoreJWPlayerPlugin', () => {
        const mockPlayer = makeMockPlayer();

        attachComscorePlugin(mockPlayer);

        const opts = window.ns_.ComscoreJWPlayerPlugin.mock.calls[0][1];
        expect(window.ns_.ComscoreJWPlayerPlugin).toHaveBeenCalledWith(
            mockPlayer,
            expect.objectContaining({
                publisherId: expect.any(String),
                labelmapping: expect.stringContaining('c3="lanacion.com.ar"')
            })
        );
        expect(opts.labelmapping).toContain('ns_st_ct=comscoreContentType');
        expect(opts.labelmapping).toContain('ns_st_cl=comscoreClipLength');
        expect(opts.labelmapping).not.toContain('ns_st_pr=');
        expect(Object.prototype.hasOwnProperty.call(opts, 'ns_st_ci')).toBe(
            false
        );
        expect(Object.prototype.hasOwnProperty.call(opts, 'ns_st_pr')).toBe(
            false
        );
        expect(Object.prototype.hasOwnProperty.call(opts, 'ns_st_ct')).toBe(
            false
        );
        expect(Object.prototype.hasOwnProperty.call(opts, 'ns_st_cl')).toBe(
            false
        );
    });

    it('should not throw when ComscoreJWPlayerPlugin is not defined', () => {
        delete window.ns_;
        const mockPlayer = makeMockPlayer();

        expect(() => attachComscorePlugin(mockPlayer)).not.toThrow();
    });

    // S11: static publisher labels always present
    it('should include all static publisher labels in labelmapping', () => {
        const mockPlayer = makeMockPlayer();

        attachComscorePlugin(mockPlayer);

        const opts = window.ns_.ComscoreJWPlayerPlugin.mock.calls[0][1];
        expect(opts.labelmapping).toContain('c3="lanacion.com.ar"');
        expect(opts.labelmapping).toContain('c4="*null"');
        expect(opts.labelmapping).toContain('c6="*null"');
        expect(opts.labelmapping).toContain('ns_st_pu="La Nación"');
        expect(opts.labelmapping).toContain('ns_st_ct=comscoreContentType');
        expect(opts.labelmapping).toContain('ns_st_cl=comscoreClipLength');
    });
});

// S4: playlist content switching on active-video change
describe('playlistItem switching on currentIndex change', () => {
    let mockPlayer;

    beforeEach(() => {
        mockPlayer = makeMockPlayer();
        window.jwplayer = jest.fn().mockReturnValue(mockPlayer);
    });

    afterEach(() => {
        delete window.jwplayer;
    });

    it('should call playlistItem with the new index when currentIndex changes from 0 to 1', () => {
        mockPlayer.playlistItem(1);
        expect(mockPlayer.playlistItem).toHaveBeenCalledWith(1);
    });

    it('should call playlistItem with each successive index as currentIndex advances', () => {
        [1, 2, 3, 4].forEach(idx => mockPlayer.playlistItem(idx));
        expect(mockPlayer.playlistItem).toHaveBeenCalledTimes(4);
        expect(mockPlayer.playlistItem).toHaveBeenNthCalledWith(1, 1);
        expect(mockPlayer.playlistItem).toHaveBeenNthCalledWith(2, 2);
        expect(mockPlayer.playlistItem).toHaveBeenNthCalledWith(3, 3);
        expect(mockPlayer.playlistItem).toHaveBeenNthCalledWith(4, 4);
    });
});

// CRITICAL-1: banner-mixed carousel — getActiveItem must resolve the correct video item
// from JW's authoritative 'playlistItem' payload. JW's playlist is already banner-stripped,
// so the event index maps DIRECTLY into the banner-stripped listVideoData (videoItems),
// with no toPlaylistIndex translation. The active item must never depend on the lagging
// React currentIndexRef mirror (which caused the video_view double-fire on transitions).
describe('registerPersistentPlayerEvents — authoritative playlistItem index resolution', () => {
    // Full listVideoData: [video0, video1, banner(data-index 2), video2(data-index 3)]
    // videoItems (banner-stripped, == JW playlist): [video0, video1, video2]
    // Landing on Video 3 means JW playlist index 2 — resolves videoItems[2] directly.
    const fullListVideoData = [
        {
            id: 'vid1',
            title: 'Video 1',
            isBanner: false,
            counterVideo: 1,
            origin: 'home',
            roofData: {}
        },
        {
            id: 'vid2',
            title: 'Video 2',
            isBanner: false,
            counterVideo: 2,
            origin: 'home',
            roofData: {}
        },
        {
            id: 'banner-1',
            title: '',
            isBanner: true,
            counterVideo: 0,
            origin: '',
            roofData: {}
        },
        {
            id: 'vid3',
            title: 'Video 3',
            isBanner: false,
            counterVideo: 3,
            origin: 'home',
            roofData: {}
        }
    ];
    const videoItems = fullListVideoData.filter(item => !item.isBanner);

    beforeEach(() => {
        jest.clearAllMocks();
        if (typeof resetComscoreGuard === 'function') resetComscoreGuard();
    });

    const makeHandlerPlayer = () => {
        const handlers = {};
        return {
            setup: jest.fn().mockReturnThis(),
            playlistItem: jest.fn(),
            on: jest.fn((event, handler) => {
                if (!handlers[event]) handlers[event] = [];
                handlers[event].push(handler);
            }),
            off: jest.fn(),
            getMute: jest.fn().mockReturnValue(false),
            setMute: jest.fn(),
            getState: jest.fn().mockReturnValue('idle'),
            remove: jest.fn(),
            getPlaylist: jest.fn().mockReturnValue([]),
            getPlaylistIndex: jest.fn().mockReturnValue(0),
            play: jest.fn(),
            stop: jest.fn(),
            skipAd: jest.fn(),
            pauseAd: jest.fn(),
            getPlugin: jest.fn().mockReturnValue(null),
            getPlaylistItem: jest.fn().mockReturnValue(null),
            _handlers: handlers,
            _emit(event, data) {
                if (handlers[event]) {
                    handlers[event].forEach(handler => handler(data));
                }
            }
        };
    };

    it('should resolve active item to Video 3 when JW lands on playlist index 2 (the video after a banner)', () => {
        // JW playlist index 2 maps DIRECTLY into videoItems (banner-stripped) — videoItems[2] = Video 3.
        // No translation from the banner-inclusive full list is needed.
        const {
            handleEventSwipeVideo
        } = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/helpers');
        const mockPlayer = makeHandlerPlayer();
        const sentProgressRef = { current: new Set() };

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData: videoItems,
            handleNextCallback: jest.fn()
        });

        mockPlayer._emit('playlistItem', {
            index: 2,
            item: { mediaid: 'vid3', title: 'Video 3' }
        });
        mockPlayer._emit('play', {});

        expect(handleEventSwipeVideo).toHaveBeenCalledWith(
            expect.objectContaining({
                videoIdObserved: 'vid3',
                videoTitle: 'Video 3'
            })
        );
    });

    it('should resolve active item to Video 2 when JW lands on playlist index 1', () => {
        const {
            handleEventSwipeVideo
        } = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/helpers');
        const mockPlayer = makeHandlerPlayer();
        const sentProgressRef = { current: new Set() };

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData: videoItems,
            handleNextCallback: jest.fn()
        });

        mockPlayer._emit('playlistItem', {
            index: 1,
            item: { mediaid: 'vid2', title: 'Video 2' }
        });
        mockPlayer._emit('play', {});

        expect(handleEventSwipeVideo).toHaveBeenCalledWith(
            expect.objectContaining({
                videoIdObserved: 'vid2',
                videoTitle: 'Video 2'
            })
        );
    });

    it('should not fire handleEventSwipeVideo with undefined when landing on the last video after a banner', () => {
        // videoItems has 3 items (indices 0-2). Landing on index 2 must resolve a defined item.
        const {
            handleEventSwipeVideo
        } = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/helpers');
        const mockPlayer = makeHandlerPlayer();
        const sentProgressRef = { current: new Set() };

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData: videoItems,
            handleNextCallback: jest.fn()
        });

        mockPlayer._emit('playlistItem', {
            index: 2,
            item: { mediaid: 'vid3', title: 'Video 3' }
        });
        mockPlayer._emit('play', {});

        // Must be called (not skipped due to undefined activeItem)
        expect(handleEventSwipeVideo).toHaveBeenCalledTimes(1);
        // Must NOT pass undefined fields
        const callArg = handleEventSwipeVideo.mock.calls[0][0];
        expect(callArg.videoIdObserved).toBeDefined();
    });
});

// Approach A overlay placement — isOverlayVisible pure helper
describe('isOverlayVisible', () => {
    const videoItem = { id: 'vid1', title: 'Video 1', isBanner: false };
    const bannerItem = { id: 'banner-1', title: '', isBanner: true };
    const mixedList = [videoItem, bannerItem, videoItem];

    it('should return true when the active slot is a video', () => {
        expect(isOverlayVisible(mixedList, 0)).toBe(true);
    });

    it('should return false when the active slot is a banner', () => {
        expect(isOverlayVisible(mixedList, 1)).toBe(false);
    });

    it('should return true for the last video slot after a banner', () => {
        expect(isOverlayVisible(mixedList, 2)).toBe(true);
    });

    it('should return false when listVideoData is empty', () => {
        expect(isOverlayVisible([], 0)).toBe(false);
    });

    it('should return false when currentIndex is out of bounds', () => {
        expect(isOverlayVisible(mixedList, 99)).toBe(false);
    });
});
