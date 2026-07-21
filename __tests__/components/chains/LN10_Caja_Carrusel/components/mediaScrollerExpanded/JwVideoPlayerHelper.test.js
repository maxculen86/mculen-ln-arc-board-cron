import {
    setupPersistentPlayer,
    attachComscorePlugin,
    registerPersistentPlayerEvents,
    toPlaylistIndex,
    loadPlaylist,
    resetComscoreGuard,
    buildJwPlaylist,
    buildAdPlayerConfig,
    shouldMuteContent
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper';
import {
    buildTagsUrl,
    handleTimeTracking,
    trackMilestone
} from '../../../../../../components/private/common/videoPlayerJw/utils/helperJw';
import {
    handleEventSwipeVideo,
    resetTracking
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/helpers';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../../components/private/common/videoPlayerJw/utils/helperJw',
    () => ({
        ...jest.requireActual(
            '../../../../../../components/private/common/videoPlayerJw/utils/helperJw'
        ),
        buildTagsUrl: jest.fn(url => (url ? `${url}?permutive=true` : '')),
        handleTimeTracking: jest.fn(),
        trackMilestone: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/helpers',
    () => ({
        handleEventSwipeVideo: jest.fn(),
        resetTracking: jest.fn(),
        getAdsConfigVideoJw: jest.fn(opts => {
            if (opts?.adsUrl && opts?.customValidation) {
                return {
                    advertising: {
                        client: 'googima',
                        schedule: [{ tag: opts.adsUrl, offset: 'pre' }]
                    },
                    intl: {
                        en: {
                            advertising: {
                                admessage: 'El video empezará en xx segúndos',
                                cuetext: 'Publicidad',
                                skipmessage: 'Saltar aviso en xx segúndos'
                            },
                            related: {
                                autoplaymessage: '',
                                heading: 'More Videos'
                            }
                        }
                    }
                };
            }
            return {};
        })
    })
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/common/utils/videoPlayerHelper',
    () => ({
        markProgrammaticMute: jest.fn()
    })
);

const makeMockPlayer = () => {
    const handlers = {};
    return {
        setup: jest.fn().mockReturnThis(),
        playlistItem: jest.fn(),
        on: jest.fn((event, handler) => {
            handlers[event] = handler;
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
            if (handlers[event]) handlers[event](data);
        }
    };
};

describe('shouldMuteContent (carousel content muted by default)', () => {
    const setStored = value => {
        if (value === null) window.localStorage.removeItem('jwplayer.mute');
        else window.localStorage.setItem('jwplayer.mute', value);
    };

    afterEach(() => window.localStorage.removeItem('jwplayer.mute'));

    it('is MUTED by default when the user has never toggled mute (key absent)', () => {
        setStored(null);
        expect(shouldMuteContent()).toBe(true);
    });

    it('is MUTED when the user explicitly muted (jwplayer.mute="true")', () => {
        setStored('true');
        expect(shouldMuteContent()).toBe(true);
    });

    it('is UNMUTED only when the user explicitly unmuted (jwplayer.mute="false")', () => {
        setStored('false');
        expect(shouldMuteContent()).toBe(false);
    });
});

describe('components - chains - ln10_caja_carrusel - components - jwVideoPlayerHelper', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Reset idempotent Comscore guard between tests so each test starts fresh
        if (typeof resetComscoreGuard === 'function') resetComscoreGuard();
    });

    it('sets up persistent jwplayer with a playlist using CDN fallback files', () => {
        const mockPlayer = makeMockPlayer();
        window.jwplayer = jest.fn(() => mockPlayer);

        const playlist = [
            {
                file: 'https://cdn.jwplayer.com/videos/vid1.mp4',
                image: 'img1.jpg',
                mediaId: 'vid1',
                title: 'V1',
                duration: 300,
                counterVideo: 1
            },
            {
                file: 'https://cdn.jwplayer.com/videos/vid2.mp4',
                image: 'img2.jpg',
                mediaId: 'vid2',
                title: 'V2',
                duration: 400,
                counterVideo: 2
            }
        ];

        setupPersistentPlayer({
            playerId: 'test-player',
            playlist,
            urlAds: 'https://ads.test'
        });

        expect(window.jwplayer).toHaveBeenCalledWith('test-player');
        expect(mockPlayer.setup).toHaveBeenCalledTimes(1);

        const setupArg = mockPlayer.setup.mock.calls[0][0];
        expect(Array.isArray(setupArg.playlist)).toBe(true);
        expect(setupArg.playlist).toHaveLength(2);
        expect(setupArg.width).toBe('100%');
        expect(setupArg.height).toBe('100%');

        delete window.jwplayer;
    });

    it('never applies an adschedule to content items — the preroll lives on the ad player', () => {
        const mockPlayer = makeMockPlayer();
        window.jwplayer = jest.fn(() => mockPlayer);

        const playlist = [
            {
                file: 'a.mp4',
                image: 'a.jpg',
                mediaId: 'v1',
                title: 'V1',
                duration: 300,
                counterVideo: 1
            },
            {
                file: 'b.mp4',
                image: 'b.jpg',
                mediaId: 'v2',
                title: 'V2',
                duration: 400,
                counterVideo: 2
            },
            {
                file: 'c.mp4',
                image: 'c.jpg',
                mediaId: 'v3',
                title: 'V3',
                duration: 500,
                counterVideo: 3
            }
        ];

        setupPersistentPlayer({
            playerId: 'test-player',
            playlist,
            urlAds: 'https://ads.test'
        });

        const items = mockPlayer.setup.mock.calls[0][0].playlist;
        expect(items[0].adschedule).toBeUndefined();
        expect(items[1].adschedule).toBeUndefined();
        expect(items[2].adschedule).toBeUndefined();

        delete window.jwplayer;
    });

    it('does NOT add advertising to the content player setup — the preroll lives on the ad player', () => {
        const mockPlayer = makeMockPlayer();
        window.jwplayer = jest.fn(() => mockPlayer);

        const playlist = [
            {
                file: 'a.mp4',
                image: 'a.jpg',
                mediaId: 'v1',
                title: 'V1',
                duration: 300,
                counterVideo: 1
            },
            {
                file: 'b.mp4',
                image: 'b.jpg',
                mediaId: 'v2',
                title: 'V2',
                duration: 400,
                counterVideo: 2
            },
            {
                file: 'c.mp4',
                image: 'c.jpg',
                mediaId: 'v3',
                title: 'V3',
                duration: 500,
                counterVideo: 3
            }
        ];

        setupPersistentPlayer({
            playerId: 'test-player',
            playlist,
            urlAds: 'https://ads.test'
        });

        const setupArg = mockPlayer.setup.mock.calls[0][0];
        // Content-only player: ads are armed on the separate ephemeral ad player.
        expect(setupArg.advertising).toBeUndefined();
        expect(setupArg.intl).toBeUndefined();

        delete window.jwplayer;
    });

    it('does NOT include aspectratio in setup — variant is handled via CSS box class (task 2.1b)', () => {
        const mockPlayer = makeMockPlayer();
        window.jwplayer = jest.fn(() => mockPlayer);

        setupPersistentPlayer({
            playerId: 'test-player',
            playlist: [
                {
                    file: 'a.mp4',
                    image: 'a.jpg',
                    mediaId: 'v1',
                    title: 'V1',
                    duration: 300,
                    counterVideo: 1
                }
            ],
            urlAds: '',
            variant: 'horizontal'
        });

        const setupArg = mockPlayer.setup.mock.calls[0][0];
        // Per design D5: drop fixed aspectratio; per-variant CSS box handles the ratio
        expect(setupArg.aspectratio).toBeUndefined();
        expect(setupArg.height).toBe('100%');

        delete window.jwplayer;
    });

    it('does NOT include aspectratio for vertical variant either', () => {
        const mockPlayer = makeMockPlayer();
        window.jwplayer = jest.fn(() => mockPlayer);

        setupPersistentPlayer({
            playerId: 'test-player',
            playlist: [
                {
                    file: 'a.mp4',
                    image: 'a.jpg',
                    mediaId: 'v1',
                    title: 'V1',
                    duration: 300,
                    counterVideo: 1
                }
            ],
            urlAds: '',
            variant: 'vertical'
        });

        const setupArg = mockPlayer.setup.mock.calls[0][0];
        expect(setupArg.aspectratio).toBeUndefined();

        delete window.jwplayer;
    });

    it('does not include intl when urlAds is not provided', () => {
        const mockPlayer = makeMockPlayer();
        window.jwplayer = jest.fn(() => mockPlayer);

        const playlist = [
            {
                file: 'a.mp4',
                image: 'a.jpg',
                mediaId: 'v1',
                title: 'V1',
                duration: 300,
                counterVideo: 1
            }
        ];

        setupPersistentPlayer({
            playerId: 'test-player',
            playlist,
            urlAds: ''
        });

        const setupArg = mockPlayer.setup.mock.calls[0][0];
        expect(setupArg.advertising).toBeUndefined();
        expect(setupArg.intl).toBeUndefined();

        delete window.jwplayer;
    });

    it('sets autostart: false on the content player — content is played explicitly on reveal (after any preroll)', () => {
        const mockPlayer = makeMockPlayer();
        window.jwplayer = jest.fn(() => mockPlayer);

        setupPersistentPlayer({
            playerId: 'test-player',
            playlist: [
                {
                    file: 'a.mp4',
                    image: 'a.jpg',
                    mediaId: 'v1',
                    title: 'V1',
                    duration: 300,
                    counterVideo: 1
                }
            ],
            urlAds: ''
        });

        const setupArg = mockPlayer.setup.mock.calls[0][0];
        expect(setupArg.autostart).toBe(false);

        delete window.jwplayer;
    });

    it('registers persistent player events and calls handleEventSwipeVideo on play', () => {
        const mockPlayer = makeMockPlayer();
        const handleNextCallback = jest.fn();
        const sentProgressRef = { current: new Set() };
        const listVideoData = [
            {
                id: 'vid1',
                title: 'Test video',
                counterVideo: 1,
                origin: 'test-origin',
                roofData: { title: 'Roof title' }
            }
        ];

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback
        });

        mockPlayer._emit('play', {});

        expect(handleEventSwipeVideo).toHaveBeenCalledWith({
            videoIdObserved: 'vid1',
            videoTitle: 'Test video',
            origin: 'test-origin',
            roofData: { title: 'Roof title' }
        });
    });

    it('calls handleNextCallback and trackMilestone(100) on complete event', () => {
        const mockPlayer = makeMockPlayer();
        const handleNextCallback = jest.fn();
        const sentProgressRef = { current: new Set() };
        const listVideoData = [
            {
                id: 'vid1',
                title: 'Test video',
                counterVideo: 1,
                origin: '',
                roofData: {}
            }
        ];

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback
        });

        mockPlayer._emit('complete', {});

        expect(handleNextCallback).toHaveBeenCalledTimes(1);
        expect(trackMilestone).toHaveBeenCalledWith(
            expect.objectContaining({ percentage: 100, videoId: 'vid1' })
        );
    });

    it('calls handleTimeTracking on time event with the active video data', () => {
        const mockPlayer = makeMockPlayer();
        const sentProgressRef = { current: new Set() };
        const listVideoData = [
            {
                id: 'vid1',
                title: 'Test video',
                counterVideo: 1,
                origin: '',
                roofData: {}
            }
        ];

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback: jest.fn()
        });

        mockPlayer._emit('time', { currentTime: 25, duration: 100 });

        expect(handleTimeTracking).toHaveBeenCalledWith(
            expect.objectContaining({ videoId: 'vid1', title: 'Test video' })
        );
    });

    it('resets sentProgressRef and calls resetTracking on playlistItem event', () => {
        const mockPlayer = makeMockPlayer();
        const sentProgressRef = { current: new Set([25, 50]) };
        const listVideoData = [
            {
                id: 'vid1',
                title: 'V1',
                counterVideo: 1,
                origin: '',
                roofData: {}
            },
            {
                id: 'vid2',
                title: 'V2',
                counterVideo: 2,
                origin: '',
                roofData: {}
            }
        ];

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback: jest.fn()
        });

        mockPlayer._emit('playlistItem', { index: 1 });

        expect(sentProgressRef.current.size).toBe(0);
        expect(resetTracking).toHaveBeenCalledTimes(1);
        // Parity with prod/master (WI 175632): a landed item does NOT force a
        // mute state on the content player — JW negotiates autoplay audio.
        expect(mockPlayer.setMute).not.toHaveBeenCalled();
    });

    it('registerPersistentPlayerEvents does NOT register a ready handler for Comscore (W1: single attach path)', () => {
        // W1 fix: registerPersistentPlayerEvents no longer registers a ready handler
        // for Comscore — that path was collapsed to attachComscorePlugin in ensurePlayer.
        const mockPlayer = makeMockPlayer();
        const sentProgressRef = { current: new Set() };
        const listVideoData = [
            {
                id: 'vid1',
                mediaId: 'vid1',
                title: 'Fallback Title',
                duration: 120,
                counterVideo: 1,
                origin: '',
                roofData: {}
            }
        ];
        window.ns_ = { ComscoreJWPlayerPlugin: jest.fn() };

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback: jest.fn()
        });

        // Emit ready — should NOT call ComscoreJWPlayerPlugin (attach path removed from here)
        mockPlayer._emit('ready', {});

        expect(window.ns_.ComscoreJWPlayerPlugin).toHaveBeenCalledTimes(0);

        delete window.ns_;
    });

    it('buildPlaylistItem carries comscoreClipLength = duration * 1000 in milliseconds', () => {
        const mockPlayer = makeMockPlayer();
        window.jwplayer = jest.fn(() => mockPlayer);

        const playlist = [
            {
                file: 'a.mp4',
                image: 'a.jpg',
                mediaId: 'vid1',
                title: 'Short video',
                duration: 300,
                counterVideo: 1
            },
            {
                file: 'b.mp4',
                image: 'b.jpg',
                mediaId: 'vid2',
                title: 'Long video',
                duration: 1500,
                counterVideo: 2
            }
        ];

        setupPersistentPlayer({
            playerId: 'test-player',
            playlist,
            urlAds: ''
        });

        const items = mockPlayer.setup.mock.calls[0][0].playlist;
        expect(items[0].comscoreClipLength).toBe(300000);
        expect(items[1].comscoreClipLength).toBe(1500000);

        delete window.jwplayer;
    });

    it('buildPlaylistItem sets comscoreClipLength to 0 when duration is 0 or missing', () => {
        const mockPlayer = makeMockPlayer();
        window.jwplayer = jest.fn(() => mockPlayer);

        const playlist = [
            {
                file: 'a.mp4',
                image: 'a.jpg',
                mediaId: 'vid1',
                title: 'No duration',
                duration: 0,
                counterVideo: 1
            },
            {
                file: 'b.mp4',
                image: 'b.jpg',
                mediaId: 'vid2',
                title: 'Missing duration',
                counterVideo: 2
            }
        ];

        setupPersistentPlayer({
            playerId: 'test-player',
            playlist,
            urlAds: ''
        });

        const items = mockPlayer.setup.mock.calls[0][0].playlist;
        expect(items[0].comscoreClipLength).toBe(0);
        expect(items[1].comscoreClipLength).toBe(0);

        delete window.jwplayer;
    });

    it('attaches Comscore plugin with publisherId + labelmapping only — no ns_st_ci/ns_st_pr/ns_st_ct/ns_st_cl own properties', () => {
        // W1 fix: test attachComscorePlugin directly (no longer via registerPersistentPlayerEvents).
        const mockPlayer = makeMockPlayer();
        window.ns_ = { ComscoreJWPlayerPlugin: jest.fn() };

        attachComscorePlugin(mockPlayer);

        const pluginOptions =
            window.ns_.ComscoreJWPlayerPlugin.mock.calls[0][1];

        expect(pluginOptions).toHaveProperty('publisherId', '6906398');
        expect(typeof pluginOptions.labelmapping).toBe('string');
        expect(pluginOptions.labelmapping).toContain(
            'ns_st_ct=comscoreContentType'
        );
        expect(pluginOptions.labelmapping).toContain(
            'ns_st_cl=comscoreClipLength'
        );
        expect(pluginOptions.labelmapping).not.toContain('ns_st_pr=');

        expect(
            Object.prototype.hasOwnProperty.call(pluginOptions, 'ns_st_ci')
        ).toBe(false);
        expect(
            Object.prototype.hasOwnProperty.call(pluginOptions, 'ns_st_pr')
        ).toBe(false);
        expect(
            Object.prototype.hasOwnProperty.call(pluginOptions, 'ns_st_ct')
        ).toBe(false);
        expect(
            Object.prototype.hasOwnProperty.call(pluginOptions, 'ns_st_cl')
        ).toBe(false);

        delete window.ns_;
    });

    it('buildPlaylistItem uses titleJwPlayer as JW title when present, falls back to title', () => {
        const mockPlayer = makeMockPlayer();
        window.jwplayer = jest.fn(() => mockPlayer);

        const playlist = [
            {
                file: 'a.mp4',
                image: 'a.jpg',
                mediaId: 'vid1',
                title: 'Card Title',
                titleJwPlayer: 'API Title from JW',
                duration: 300,
                counterVideo: 1
            },
            {
                file: 'b.mp4',
                image: 'b.jpg',
                mediaId: 'vid2',
                title: 'Fallback Only',
                duration: 400,
                counterVideo: 2
            }
        ];

        setupPersistentPlayer({
            playerId: 'test-player',
            playlist,
            urlAds: ''
        });

        const items = mockPlayer.setup.mock.calls[0][0].playlist;
        expect(items[0].title).toBe('API Title from JW');
        expect(items[1].title).toBe('Fallback Only');

        delete window.jwplayer;
    });

    it('buildPlaylistItem carries comscoreContentType vc11 for items with duration below 1200 seconds', () => {
        const mockPlayer = makeMockPlayer();
        window.jwplayer = jest.fn(() => mockPlayer);

        const playlist = [
            {
                file: 'a.mp4',
                image: 'a.jpg',
                mediaId: 'vid1',
                title: 'Short video',
                duration: 600,
                counterVideo: 1
            }
        ];

        setupPersistentPlayer({
            playerId: 'test-player',
            playlist,
            urlAds: ''
        });

        const items = mockPlayer.setup.mock.calls[0][0].playlist;
        expect(items[0].comscoreContentType).toBe('vc11');

        delete window.jwplayer;
    });

    it('buildPlaylistItem carries comscoreContentType vc12 for items with duration at or above 1200 seconds', () => {
        const mockPlayer = makeMockPlayer();
        window.jwplayer = jest.fn(() => mockPlayer);

        const playlist = [
            {
                file: 'a.mp4',
                image: 'a.jpg',
                mediaId: 'vid1',
                title: 'Long video',
                duration: 1200,
                counterVideo: 1
            },
            {
                file: 'b.mp4',
                image: 'b.jpg',
                mediaId: 'vid2',
                title: 'Also long video',
                duration: 1500,
                counterVideo: 2
            }
        ];

        setupPersistentPlayer({
            playerId: 'test-player',
            playlist,
            urlAds: ''
        });

        const items = mockPlayer.setup.mock.calls[0][0].playlist;
        expect(items[0].comscoreContentType).toBe('vc12');
        expect(items[1].comscoreContentType).toBe('vc12');

        delete window.jwplayer;
    });

    it('attachComscorePlugin passes exactly publisherId + labelmapping (publisher constants + dynamic ns_st_ct) — no ns_st_ci/ns_st_pr/ns_st_ct/ns_st_cl own properties', () => {
        const mockComscorePlugin = jest.fn();
        window.ns_ = { ComscoreJWPlayerPlugin: mockComscorePlugin };
        const mockPlayer = makeMockPlayer();

        attachComscorePlugin(mockPlayer);

        expect(mockComscorePlugin).toHaveBeenCalledTimes(1);
        const opts = mockComscorePlugin.mock.calls[0][1];

        expect(opts).toHaveProperty('publisherId', '6906398');
        expect(opts).toHaveProperty('labelmapping');
        expect(opts.labelmapping).toContain('c3="lanacion.com.ar"');
        expect(opts.labelmapping).toContain('ns_st_pu="La Nación"');
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

        delete window.ns_;
    });

    describe('attachComscorePlugin — idempotent guard (task 2.1a)', () => {
        beforeEach(() => {
            if (typeof resetComscoreGuard === 'function') resetComscoreGuard();
        });

        it('ComscoreJWPlayerPlugin constructor invoked exactly once on N calls', () => {
            const mockPlayer = makeMockPlayer();
            window.ns_ = { ComscoreJWPlayerPlugin: jest.fn() };

            for (let i = 0; i < 5; i++) {
                attachComscorePlugin(mockPlayer);
            }

            expect(window.ns_.ComscoreJWPlayerPlugin).toHaveBeenCalledTimes(1);

            delete window.ns_;
        });

        it('resetComscoreGuard allows attach again — useful for test isolation', () => {
            const mockPlayer = makeMockPlayer();
            window.ns_ = { ComscoreJWPlayerPlugin: jest.fn() };

            attachComscorePlugin(mockPlayer);
            expect(window.ns_.ComscoreJWPlayerPlugin).toHaveBeenCalledTimes(1);

            resetComscoreGuard();
            attachComscorePlugin(mockPlayer);
            expect(window.ns_.ComscoreJWPlayerPlugin).toHaveBeenCalledTimes(2);

            delete window.ns_;
        });
    });

    describe('loadPlaylist export (task 2.1c)', () => {
        it('loadPlaylist is exported as a function', () => {
            expect(typeof loadPlaylist).toBe('function');
        });

        it('loadPlaylist calls player.load with the passed playlist', () => {
            const mockPlayer = makeMockPlayer();
            mockPlayer.load = jest.fn();
            window.jwplayer = jest.fn(() => mockPlayer);

            const playlist = [
                { file: 'a.mp4', mediaId: 'v1' },
                { file: 'b.mp4', mediaId: 'v2' }
            ];
            loadPlaylist(mockPlayer, playlist);

            expect(mockPlayer.load).toHaveBeenCalledWith(playlist);

            delete window.jwplayer;
        });
    });

    describe('toPlaylistIndex', () => {
        const video = id => ({ id, isBanner: false });
        const banner = id => ({ id, isBanner: true });

        it('returns -1 when all items are banners', () => {
            expect(toPlaylistIndex([banner('b1'), banner('b2')], 1)).toBe(-1);
        });

        it('returns -1 when the first item is a banner and dataIndex is 0', () => {
            expect(toPlaylistIndex([banner('b1'), video('v1')], 0)).toBe(-1);
        });

        it('returns 0 when the first item is a banner and dataIndex is 1 (first video)', () => {
            expect(toPlaylistIndex([banner('b1'), video('v1')], 1)).toBe(0);
        });

        it('returns the last video playlist index when the last item is a banner', () => {
            // toPlaylistIndex maps a dataIndex to a JW playlist index (videos only).
            // When the item at dataIndex is a banner, callers guard separately — the function
            // itself returns the count of preceding videos minus 1 (here: 1).
            const list = [video('v1'), video('v2'), banner('b1')];
            expect(toPlaylistIndex(list, 2)).toBe(1);
        });

        it('returns 0 for a single-video list', () => {
            expect(toPlaylistIndex([video('v1')], 0)).toBe(0);
        });
    });
});

describe('buildJwPlaylist', () => {
    const baseItem = (overrides = {}) => ({
        mediaId: 'media-1',
        file: 'https://cdn/media-1.mp4',
        image: 'https://cdn/media-1.jpg',
        title: 'Title 1',
        duration: 60,
        ...overrides
    });

    it('maps lowercase mediaid and comscore labels so Comscore gets a content id', () => {
        const [item] = buildJwPlaylist({
            playlist: [baseItem({ counterVideo: 1 })]
        });

        expect(item.mediaid).toBe('media-1');
        expect(item.comscoreContentType).toBe('vc11');
        expect(item.comscoreClipLength).toBe(60 * 1000);
        expect(item.adschedule).toBeUndefined();
    });

    it('never adds an adschedule to content items — the preroll lives on the separate ad player', () => {
        const result = buildJwPlaylist({
            playlist: [
                baseItem({ mediaId: 'a', counterVideo: 1 }),
                baseItem({ mediaId: 'b', counterVideo: 2 }),
                baseItem({ mediaId: 'c', counterVideo: 3 })
            ]
        });

        result.forEach(item => expect(item.adschedule).toBeUndefined());
        expect(result[2].mediaid).toBe('c');
    });

    it('flags long-form content type for durations over the long-form threshold', () => {
        const [item] = buildJwPlaylist({
            playlist: [baseItem({ counterVideo: 1, duration: 1300 })]
        });

        expect(item.comscoreContentType).toBe('vc12');
    });
});

describe('buildAdPlayerConfig', () => {
    const item = {
        mediaId: 'ad-media',
        file: 'https://cdn/ad-media.mp4',
        image: 'https://cdn/ad-media.jpg',
        title: 'Ad title'
    };

    it('builds an autostart preroll config for the target item with googima and no comscore', () => {
        const config = buildAdPlayerConfig(item, 'https://ads');

        expect(config.autostart).toBe(true);
        expect(config.playlist).toHaveLength(1);
        expect(config.playlist[0].mediaid).toBe('ad-media');
        expect(config.playlist[0].file).toBe('https://cdn/ad-media.mp4');
        expect(config.advertising.client).toBe('googima');
        expect(config.advertising.schedule[0].offset).toBe('pre');
        expect(config.playlist[0].adschedule).toBeUndefined();
    });
});
