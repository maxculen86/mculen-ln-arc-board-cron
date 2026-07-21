/**
 * Tests for dataLayer event emissions from the persistent JW player.
 * Covers S5, S6, S7, S8, S9, S13, S14 from the spec.
 */
import {
    registerPersistentPlayerEvents,
    resetComscoreGuard
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper';
import {
    handleEventSwipeVideo,
    resetTracking,
    getAdsConfigVideoJw
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/helpers';
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

const makeListVideoData = () => [
    {
        id: 'vid1',
        title: 'Video 1',
        counterVideo: 1,
        origin: 'home',
        roofData: {}
    },
    {
        id: 'vid2',
        title: 'Video 2',
        counterVideo: 2,
        origin: 'home',
        roofData: {}
    },
    {
        id: 'vid3',
        title: 'Video 3',
        counterVideo: 3,
        origin: 'home',
        roofData: {}
    },
    {
        id: 'vid4',
        title: 'Video 4',
        counterVideo: 4,
        origin: 'home',
        roofData: {}
    }
];

describe('registerPersistentPlayerEvents', () => {
    let mockPlayer;
    let sentProgressRef;
    let handleNextCallback;
    let listVideoData;

    beforeEach(() => {
        jest.clearAllMocks();
        if (typeof resetComscoreGuard === 'function') resetComscoreGuard();
        resetTracking();
        mockPlayer = makeMockPlayer();
        sentProgressRef = { current: new Set() };
        handleNextCallback = jest.fn();
        listVideoData = makeListVideoData();
        window.dataLayer = [];
    });

    afterEach(() => {
        delete window.dataLayer;
    });

    // S5: video_view per video
    it('should fire handleEventSwipeVideo on play event with the active video data', () => {
        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback
        });

        mockPlayer._emit('play', {});

        expect(handleEventSwipeVideo).toHaveBeenCalledWith(
            expect.objectContaining({
                videoIdObserved: 'vid1',
                videoTitle: 'Video 1',
                origin: 'home'
            })
        );
    });

    it('should fire handleEventSwipeVideo with updated video data after playlistItem transition', () => {
        const currentIndexRef = { current: 0 };

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef,
            handleNextCallback
        });

        // Simulate advancing to video 2
        currentIndexRef.current = 1;
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

    // S6: milestones per video — milestone events reset on video change
    it('should track time milestones for the active video', () => {
        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback
        });

        // Simulate time event at 25% of a 100s video
        mockPlayer._emit('time', { currentTime: 25, duration: 100 });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith(
            expect.objectContaining({ event: '25' })
        );
    });

    it('should reset milestone tracking when playlist item changes', () => {
        const currentIndexRef = { current: 0 };

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef,
            handleNextCallback
        });

        // Mark 25% for video 1
        mockPlayer._emit('time', { currentTime: 25, duration: 100 });
        expect(sentProgressRef.current.has(25)).toBe(true);

        // Advance to video 2 via playlistItem
        currentIndexRef.current = 1;
        mockPlayer._emit('playlistItem', {
            index: 1,
            item: { mediaid: 'vid2', title: 'Video 2' }
        });

        // sentProgressRef should be cleared
        expect(sentProgressRef.current.size).toBe(0);
    });

    it('should NOT re-fire milestone for video 1 after advancing to video 2', () => {
        const currentIndexRef = { current: 0 };

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef,
            handleNextCallback
        });

        // Fire 25% for video 1
        mockPlayer._emit('time', { currentTime: 25, duration: 100 });
        const callsAfterV1 = addEventToDataLayerV2.mock.calls.length;

        // Advance to video 2
        currentIndexRef.current = 1;
        mockPlayer._emit('playlistItem', {
            index: 1,
            item: { mediaid: 'vid2', title: 'Video 2' }
        });

        // No additional time events — milestone for video 1 should not re-fire
        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(callsAfterV1);
    });

    // Milestone mis-attribution fix (engram #1935, topic
    // sdd/carrusel-session-reducer/resume-milestone-misattribution): a
    // preroll ad break pauses the content player on the OUTGOING video before
    // the ad plays on a separate player. Any 'time' tick that still lands on
    // the content player during that window belongs to the video being
    // abandoned and must not be reported.
    it('does not track time milestones while an ad break (preroll) is active', () => {
        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback,
            isAdBreakActive: () => true
        });

        mockPlayer._emit('time', { currentTime: 25, duration: 100 });

        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });

    it('resumes tracking time milestones once the ad break ends', () => {
        let adBreakActive = true;

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback,
            isAdBreakActive: () => adBreakActive
        });

        mockPlayer._emit('time', { currentTime: 25, duration: 100 });
        expect(addEventToDataLayerV2).not.toHaveBeenCalled();

        adBreakActive = false;
        mockPlayer._emit('time', { currentTime: 25, duration: 100 });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith(
            expect.objectContaining({ event: '25' })
        );
    });

    it('tracks the handed-off video milestone after preroll recovery', () => {
        let adBreakActive = true;
        const currentIndexRef = { current: 0 };

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef,
            handleNextCallback,
            isAdBreakActive: () => adBreakActive
        });

        mockPlayer._emit('time', { currentTime: 25, duration: 100 });
        currentIndexRef.current = 1;
        adBreakActive = false;
        mockPlayer._emit('playlistItem', {
            index: 1,
            item: { mediaid: 'vid2', title: 'Video 2' }
        });
        mockPlayer._emit('time', { currentTime: 25, duration: 100 });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith(
            expect.objectContaining({
                event: '25',
                rest: expect.objectContaining({ videoID: 'vid2' })
            })
        );
    });

    // Milestone events must reflect GENUINE forward viewing, matching master's
    // handleVideoEventsScript (lastPlaybackPercent guard). When the user seeks
    // FORWARD past milestones, the skipped ones must NOT fire — otherwise a
    // single forward jump emits 10/25/50 automatically. Master handles this via
    // onSeek -> lastPlaybackPercent + ignoreNextTimeEvent; the carousel dropped
    // it when handleTimeTracking was introduced.
    it('does NOT fire milestones skipped by a forward seek (master lastPlaybackPercent parity)', () => {
        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback
        });

        // User fast-forwards to 60%.
        mockPlayer._emit('seek', { offset: 60, duration: 100 });
        // The settle tick right after the seek, then normal progression.
        mockPlayer._emit('time', { currentTime: 60, duration: 100 });
        mockPlayer._emit('time', { currentTime: 61, duration: 100 });

        expect(addEventToDataLayerV2).not.toHaveBeenCalledWith(
            expect.objectContaining({ event: '10' })
        );
        expect(addEventToDataLayerV2).not.toHaveBeenCalledWith(
            expect.objectContaining({ event: '25' })
        );
        expect(addEventToDataLayerV2).not.toHaveBeenCalledWith(
            expect.objectContaining({ event: '50' })
        );
    });

    it('still fires a milestone genuinely reached by forward playback after a seek', () => {
        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback
        });

        mockPlayer._emit('seek', { offset: 60, duration: 100 });
        mockPlayer._emit('time', { currentTime: 60, duration: 100 });
        mockPlayer._emit('time', { currentTime: 76, duration: 100 });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith(
            expect.objectContaining({ event: '75' })
        );
    });

    it('fires milestones normally during forward playback from the start (no regression)', () => {
        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback
        });

        mockPlayer._emit('time', { currentTime: 11, duration: 100 });
        mockPlayer._emit('time', { currentTime: 26, duration: 100 });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith(
            expect.objectContaining({ event: '10' })
        );
        expect(addEventToDataLayerV2).toHaveBeenCalledWith(
            expect.objectContaining({ event: '25' })
        );
    });

    // S8: re-view dedup reset
    it('should reset dedup tracking so video_view re-fires when returning to a previous index', () => {
        const currentIndexRef = { current: 0 };

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef,
            handleNextCallback
        });

        // Play video 1
        mockPlayer._emit('play', {});
        expect(handleEventSwipeVideo).toHaveBeenCalledTimes(1);

        // Advance to video 2
        currentIndexRef.current = 1;
        mockPlayer._emit('playlistItem', {
            index: 1,
            item: { mediaid: 'vid2', title: 'Video 2' }
        });
        mockPlayer._emit('play', {});
        expect(handleEventSwipeVideo).toHaveBeenCalledTimes(2);

        // Return to video 1 — dedup must have been reset
        currentIndexRef.current = 0;
        mockPlayer._emit('playlistItem', {
            index: 0,
            item: { mediaid: 'vid1', title: 'Video 1' }
        });
        mockPlayer._emit('play', {});
        expect(handleEventSwipeVideo).toHaveBeenCalledTimes(3);
    });

    // S9: preroll ad gate at counterVideo===3
    it('should register a complete event handler on the player', () => {
        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback
        });

        const registeredEvents = mockPlayer.on.mock.calls.map(
            ([event]) => event
        );
        expect(registeredEvents).toContain('complete');
    });

    // S13: playlistItem handler must NOT force a mute state (WI 175632)
    it('does not force a mute state on playlistItem changes (JW preserves mute natively on the persistent instance)', () => {
        const currentIndexRef = { current: 0 };

        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef,
            handleNextCallback
        });

        // A stored preference must NOT be re-applied by our handler — the
        // persistent JW instance keeps its own mute state across items, and
        // master never re-applied it (parity fix).
        window.localStorage.setItem('jwplayer.mute', 'true');
        mockPlayer.getMute.mockReturnValue(true);

        currentIndexRef.current = 1;
        mockPlayer._emit('playlistItem', {
            index: 1,
            item: { mediaid: 'vid2', title: 'Video 2' }
        });

        expect(mockPlayer.setMute).not.toHaveBeenCalled();

        window.localStorage.removeItem('jwplayer.mute');
    });

    // S14: handleNextCallback / advance-on-complete
    it('should call handleNextCallback when the complete event fires', () => {
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

    it('should track 100% milestone when complete event fires', () => {
        registerPersistentPlayerEvents({
            player: mockPlayer,
            sentProgressRef,
            listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback
        });

        mockPlayer._emit('complete', {});

        expect(addEventToDataLayerV2).toHaveBeenCalledWith(
            expect.objectContaining({ event: 'videoComplete' })
        );
    });
});
