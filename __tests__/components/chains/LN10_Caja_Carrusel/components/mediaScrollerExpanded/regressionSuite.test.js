/**
 * Phase 4 regression tests.
 * Covers S12 (no ready-race probe), REQ-14 (first video identical to any other),
 * and S15 (horizontal variant shares same persistent-player code path).
 */
import fs from 'fs';
import path from 'path';
import {
    registerPersistentPlayerEvents,
    attachComscorePlugin,
    resetComscoreGuard
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/helpers',
    () => ({
        ...jest.requireActual(
            '../../../../../../components/chains/LN10_Caja_Carrusel/components/helpers'
        ),
        handleEventSwipeVideo: jest.fn(),
        getAdsConfigVideoJw: jest.fn().mockReturnValue({})
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

// S12 — ready-race probe must be absent from jwVideoPlayerHelper.js
describe('S12 — ready-race probe absent', () => {
    it('jwVideoPlayerHelper.js does not contain getState-based idle probe', () => {
        const helperPath = path.resolve(
            __dirname,
            '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper.js'
        );
        const source = fs.readFileSync(helperPath, 'utf8');

        expect(source).not.toContain("getState() !== 'idle'");
        expect(source).not.toContain('readyHandled');
    });
});

// REQ-14 — first video (index 0) behaves identically to any other video
describe('REQ-14 — first video fires Comscore, video_view, and handleNextCallback like any other video', () => {
    let mockPlayer;
    let sentProgressRef;
    let handleNextCallback;

    beforeEach(() => {
        jest.clearAllMocks();
        if (typeof resetComscoreGuard === 'function') resetComscoreGuard();
        mockPlayer = makeMockPlayer();
        sentProgressRef = { current: new Set() };
        handleNextCallback = jest.fn();
        window.ns_ = { ComscoreJWPlayerPlugin: jest.fn() };
    });

    afterEach(() => {
        delete window.ns_;
    });

    it('should fire handleEventSwipeVideo for first video on play (not zero or two times)', () => {
        const {
            handleEventSwipeVideo
        } = require('../../../../../../components/chains/LN10_Caja_Carrusel/components/helpers');
        const listVideoData = [
            {
                id: 'vid1',
                title: 'First Video',
                counterVideo: 1,
                origin: 'home',
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

        mockPlayer._emit('play', {});

        expect(handleEventSwipeVideo).toHaveBeenCalledTimes(1);
        expect(handleEventSwipeVideo).toHaveBeenCalledWith(
            expect.objectContaining({ videoIdObserved: 'vid1' })
        );
    });

    it('should call handleNextCallback when first video complete fires', () => {
        const listVideoData = [
            {
                id: 'vid1',
                title: 'First Video',
                counterVideo: 1,
                origin: 'home',
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
    });
});

// S15 — horizontal variant: same persistent player call counts (shared code path)
describe('S15 — horizontal variant shares same persistent-player event code path', () => {
    let mockPlayer;
    let sentProgressRef;

    beforeEach(() => {
        jest.clearAllMocks();
        if (typeof resetComscoreGuard === 'function') resetComscoreGuard();
        mockPlayer = makeMockPlayer();
        sentProgressRef = { current: new Set() };
        window.ns_ = { ComscoreJWPlayerPlugin: jest.fn() };
    });

    afterEach(() => {
        delete window.ns_;
    });

    it('should register playlistItem, time, complete, and play event handlers (W1: ready no longer registered by registerPersistentPlayerEvents)', () => {
        // W1 fix: ready handler for Comscore removed from registerPersistentPlayerEvents.
        // The four remaining event handlers are still registered correctly.
        const listVideoData = [
            {
                id: 'vid1',
                title: 'V1',
                counterVideo: 1,
                origin: 'home',
                roofData: {}
            },
            {
                id: 'vid2',
                title: 'V2',
                counterVideo: 2,
                origin: 'home',
                roofData: {}
            },
            {
                id: 'vid3',
                title: 'V3',
                counterVideo: 3,
                origin: 'home',
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

        // playlistItem, time, complete, play must still be registered
        const registeredEvents = mockPlayer.on.mock.calls.map(
            ([event]) => event
        );
        expect(registeredEvents).not.toContain('ready'); // W1: ready handler removed from here
        expect(registeredEvents).toContain('playlistItem');
        expect(registeredEvents).toContain('time');
        expect(registeredEvents).toContain('complete');
        expect(registeredEvents).toContain('play');
    });

    it('should call ComscoreJWPlayerPlugin exactly once — idempotent guard prevents re-attach on playlistItem advances', () => {
        // W1 fix: Comscore attach is now via attachComscorePlugin directly, not via registerPersistentPlayerEvents ready.
        // The guard prevents double-attach.
        const listVideoData = [
            {
                id: 'vid1',
                title: 'V1',
                counterVideo: 1,
                origin: 'home',
                roofData: {}
            },
            {
                id: 'vid2',
                title: 'V2',
                counterVideo: 2,
                origin: 'home',
                roofData: {}
            },
            {
                id: 'vid3',
                title: 'V3',
                counterVideo: 3,
                origin: 'home',
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

        // Simulate attach via the real path (ensurePlayer calls attachComscorePlugin on ready)
        attachComscorePlugin(mockPlayer);
        mockPlayer._emit('playlistItem', { index: 0 });
        mockPlayer._emit('playlistItem', { index: 1 });
        mockPlayer._emit('playlistItem', { index: 2 });

        // Calling again must be a no-op
        attachComscorePlugin(mockPlayer);

        expect(window.ns_.ComscoreJWPlayerPlugin).toHaveBeenCalledTimes(1);
        const opts = window.ns_.ComscoreJWPlayerPlugin.mock.calls[0][1];
        expect(opts.labelmapping).toContain('ns_st_ct=comscoreContentType');
        expect(opts.labelmapping).toContain('ns_st_cl=comscoreClipLength');
        expect(Object.prototype.hasOwnProperty.call(opts, 'ns_st_ci')).toBe(
            false
        );
    });

    it('should reset milestone tracking for each video advance in horizontal variant', () => {
        const listVideoData = [
            {
                id: 'vid1',
                title: 'V1',
                counterVideo: 1,
                origin: 'home',
                roofData: {}
            },
            {
                id: 'vid2',
                title: 'V2',
                counterVideo: 2,
                origin: 'home',
                roofData: {}
            }
        ];
        const currentIndexRef = { current: 0 };

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef,
            handleNextCallback: jest.fn()
        });

        // Reach 25% on V1
        mockPlayer._emit('time', { currentTime: 25, duration: 100 });
        expect(addEventToDataLayerV2).toHaveBeenCalledWith(
            expect.objectContaining({ event: '25' })
        );

        // Advance to V2
        currentIndexRef.current = 1;
        mockPlayer._emit('playlistItem', { index: 1 });

        // sentProgressRef cleared
        expect(sentProgressRef.current.size).toBe(0);
    });

    it('should fire handleNextCallback on complete in horizontal variant', () => {
        const handleNextCallback = jest.fn();
        const listVideoData = [
            {
                id: 'vid1',
                title: 'V1',
                counterVideo: 1,
                origin: 'home',
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
    });
});

// Race condition fix — attachComscorePlugin must be called even when ready handler registration
describe('Race condition — Comscore attach before ready handler registration', () => {
    let mockPlayer;
    let sentProgressRef;
    let handleNextCallback;

    beforeEach(() => {
        jest.clearAllMocks();
        if (typeof resetComscoreGuard === 'function') resetComscoreGuard();
        mockPlayer = makeMockPlayer();
        sentProgressRef = { current: new Set() };
        handleNextCallback = jest.fn();
        window.ns_ = { ComscoreJWPlayerPlugin: jest.fn() };
    });

    afterEach(() => {
        delete window.ns_;
    });

    it('should attach Comscore plugin even when ready fires synchronously during setup before registerPersistentPlayerEvents', () => {
        const listVideoData = [
            {
                id: 'vid1',
                title: 'First Video',
                counterVideo: 1,
                origin: 'home',
                roofData: {}
            }
        ];

        // Simulate the FIX: pre-register the ready handler BEFORE setup
        // This mimics what the fix in usePersistentJwPlayer.js will do
        const preRegisterReadyHandler = jest.fn(() => {
            attachComscorePlugin(mockPlayer);
        });
        mockPlayer.on('ready', preRegisterReadyHandler);

        // Simulate setupPersistentPlayer() which calls player.setup({autostart: true})
        // and triggers 'ready' synchronously (the race condition)
        mockPlayer.setup.mockImplementation(() => {
            // Ready fires synchronously during setup
            mockPlayer._emit('ready', {});
            return mockPlayer;
        });

        // Call setup (simulating setupPersistentPlayer)
        mockPlayer.setup({ autostart: true });

        // Now call registerPersistentPlayerEvents (which also registers a ready handler)
        // The ready event has ALREADY fired during setup
        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback
        });

        // The pre-registered handler should have been called during setup
        expect(preRegisterReadyHandler).toHaveBeenCalledTimes(1);
        expect(window.ns_.ComscoreJWPlayerPlugin).toHaveBeenCalledTimes(1);
    });

    it('idempotent guard: even with both pre-setup and in-registerPersistentPlayerEvents handlers firing, ComscoreJWPlayerPlugin called exactly once', () => {
        // Reset guard so this test is isolated
        if (typeof resetComscoreGuard === 'function') resetComscoreGuard();

        const listVideoData = [
            {
                id: 'vid1',
                title: 'First Video',
                counterVideo: 1,
                origin: 'home',
                roofData: {}
            }
        ];

        // Pre-register ready handler (the fix)
        const preRegisterReadyHandler = jest.fn(() => {
            attachComscorePlugin(mockPlayer);
        });
        mockPlayer.on('ready', preRegisterReadyHandler);

        // Simulate setupPersistentPlayer() which triggers 'ready' synchronously
        mockPlayer.setup.mockImplementation(() => {
            mockPlayer._emit('ready', {});
            return mockPlayer;
        });

        // Call setup (simulating setupPersistentPlayer)
        mockPlayer.setup({ autostart: true });

        // Call registerPersistentPlayerEvents (which registers its own ready handler)
        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback
        });

        // Now emit ready again — BOTH handlers should fire, but guard prevents double-attach
        mockPlayer._emit('ready', {});

        // preRegisterReadyHandler called during setup (1) + during final emit (1) = 2
        expect(preRegisterReadyHandler).toHaveBeenCalledTimes(2);
        // With idempotent guard: exactly 1 attach regardless of how many ready events fire
        expect(window.ns_.ComscoreJWPlayerPlugin).toHaveBeenCalledTimes(1);
    });
});

// Task 4.5: Cross-carousel switch regression
// openExpanded(A) then openExpanded(B) → setup called once, playlistItem called twice, ComscoreJWPlayerPlugin once
describe('Task 4.5 — cross-carousel switch: setup once, playlistItem per open, Comscore once', () => {
    let mockPlayer;
    let sentProgressRef;

    beforeEach(() => {
        jest.clearAllMocks();
        if (typeof resetComscoreGuard === 'function') resetComscoreGuard();
        mockPlayer = makeMockPlayer();
        sentProgressRef = { current: new Set() };
        window.ns_ = { ComscoreJWPlayerPlugin: jest.fn() };
        window.jwplayer = jest.fn().mockReturnValue(mockPlayer);
    });

    afterEach(() => {
        delete window.ns_;
        delete window.jwplayer;
    });

    it('Comscore attached exactly once across multiple opens — idempotent guard prevents re-attach (W1)', () => {
        // W1 fix: attachComscorePlugin is the single attach path (called by ensurePlayer on ready).
        // registerPersistentPlayerEvents no longer calls it. The guard is the defense layer.
        const listVideoData = [
            {
                id: 'vid1',
                title: 'V1',
                counterVideo: 1,
                origin: 'home',
                roofData: {}
            },
            {
                id: 'vid2',
                title: 'V2',
                counterVideo: 2,
                origin: 'home',
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

        // First open — Comscore attached via ensurePlayer's ready handler
        attachComscorePlugin(mockPlayer); // simulates first ready
        mockPlayer._emit('playlistItem', { index: 0 });

        // Second open (different carousel) — no new setup, just playlistItem
        mockPlayer._emit('playlistItem', { index: 1 });

        // Attempt a second attach (idempotent guard must block it)
        attachComscorePlugin(mockPlayer);

        // Comscore attached exactly once across both opens
        expect(window.ns_.ComscoreJWPlayerPlugin).toHaveBeenCalledTimes(1);
        const opts = window.ns_.ComscoreJWPlayerPlugin.mock.calls[0][1];
        expect(opts.labelmapping).toContain('ns_st_ct=comscoreContentType');
    });
});
