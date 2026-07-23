/**
 * Regression tests for the GTM video_view double-fire on carousel video
 * transitions (ticket 175632).
 *
 * Root cause: handlePlay/getActiveItem resolved the "playing" video from a
 * LAGGING React currentIndexRef mirror instead of JW's authoritative
 * 'playlistItem' payload. On an A->B transition, JW had already advanced to B
 * while currentIndexRef still held A, so the previous video's view re-fired.
 * The second JW playlistItem+play echo for the SAME landed item then produced
 * a duplicate view of the new video too.
 *
 * These tests use the REAL handleEventSwipeVideo + resetTracking (NOT mocked)
 * so the dedup behaviour is exercised end to end; only the dataLayer sink is
 * spied on.
 */
import { registerPersistentPlayerEvents } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoPlayerHelper';
import { resetTracking } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/helpers';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

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
        on: jest.fn((event, handler) => {
            handlers[event] = handler;
        }),
        off: jest.fn(),
        getMute: jest.fn().mockReturnValue(false),
        setMute: jest.fn(),
        getPlaylistIndex: jest.fn().mockReturnValue(0),
        getPlaylistItem: jest.fn().mockReturnValue(null),
        _emit(event, data) {
            if (handlers[event]) handlers[event](data);
        }
    };
};

const listVideoData = [
    {
        id: 'A',
        title: 'Video A',
        counterVideo: 1,
        origin: 'home',
        roofData: {}
    },
    { id: 'B', title: 'Video B', counterVideo: 2, origin: 'home', roofData: {} }
];

const videoViews = () =>
    addEventToDataLayerV2.mock.calls
        .map(([payload]) => payload)
        .filter(payload => payload.event === 'video_view')
        .map(payload => payload.rest.id_video);

describe('video_view double-fire on carousel transition (175632)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        resetTracking();
    });

    it('fires video_view only for the NEW video on an A->B transition, even when currentIndexRef still lags on A', () => {
        const player = makeMockPlayer();
        // currentIndexRef deliberately STALE: still points at A after JW moved to B.
        const currentIndexRef = { current: 0 };

        registerPersistentPlayerEvents({
            player,
            sentProgressRef: { current: new Set() },
            listVideoData,
            fullListVideoData: listVideoData,
            currentIndexRef,
            handleNextCallback: jest.fn()
        });

        // Video A lands and plays.
        player._emit('playlistItem', { index: 0, item: { mediaid: 'A' } });
        player._emit('play', {});

        // JW auto-advances to B (authoritative) while currentIndexRef STILL === 0.
        player._emit('playlistItem', { index: 1, item: { mediaid: 'B' } });
        player._emit('play', {});

        // Must be exactly one A view then one B view — NO re-fire of A on the cross.
        expect(videoViews()).toEqual(['A', 'B']);
    });

    it('fires video_view exactly once for a landed video despite JW re-emitting a second playlistItem+play echo', () => {
        const player = makeMockPlayer();
        const currentIndexRef = { current: 1 };

        registerPersistentPlayerEvents({
            player,
            sentProgressRef: { current: new Set() },
            listVideoData,
            fullListVideoData: listVideoData,
            currentIndexRef,
            handleNextCallback: jest.fn()
        });

        // First playlistItem+play cycle for B.
        player._emit('playlistItem', { index: 1, item: { mediaid: 'B' } });
        player._emit('play', {});

        // JW echo: a SECOND playlistItem+play cycle for the SAME landed item.
        player._emit('playlistItem', { index: 1, item: { mediaid: 'B' } });
        player._emit('play', {});

        expect(videoViews().filter(id => id === 'B')).toHaveLength(1);
    });

    it('still re-fires video_view when the user navigates away and back to a previously seen video', () => {
        const player = makeMockPlayer();
        const currentIndexRef = { current: 0 };

        registerPersistentPlayerEvents({
            player,
            sentProgressRef: { current: new Set() },
            listVideoData,
            fullListVideoData: listVideoData,
            currentIndexRef,
            handleNextCallback: jest.fn()
        });

        player._emit('playlistItem', { index: 0, item: { mediaid: 'A' } });
        player._emit('play', {});

        player._emit('playlistItem', { index: 1, item: { mediaid: 'B' } });
        player._emit('play', {});

        // Navigate back to A — a genuine re-view must fire again.
        player._emit('playlistItem', { index: 0, item: { mediaid: 'A' } });
        player._emit('play', {});

        expect(videoViews()).toEqual(['A', 'B', 'A']);
    });
});

/**
 * Ad-break (preroll) guard on the carousel content-tracking handlers
 * (ticket 175632). The content player is paused programmatically for the
 * duration of a preroll ad break (jwPlayerManager's maybeStartPreroll), but
 * when it leaks a play/complete behind the ad, video_view and videoComplete
 * must NOT fire — otherwise the preroll gets counted as a view and a video the
 * user never finished reports a 100% completion. handleTime already carried
 * this guard; handlePlay and handleComplete did not.
 */
describe('ad-break guard on carousel content tracking (175632 preroll)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        resetTracking();
    });

    const register = ({ handleNextCallback = jest.fn(), isAdBreakActive }) => {
        const player = makeMockPlayer();
        registerPersistentPlayerEvents({
            player,
            sentProgressRef: { current: new Set() },
            listVideoData,
            fullListVideoData: listVideoData,
            currentIndexRef: { current: 0 },
            handleNextCallback,
            isAdBreakActive
        });
        return player;
    };

    it('does NOT fire video_view for a content play that lands during an ad break (preroll leaking behind the ad)', () => {
        let adBreakActive = false;
        const player = register({ isAdBreakActive: () => adBreakActive });

        player._emit('playlistItem', { index: 0, item: { mediaid: 'A' } });
        // Preroll starts: content is paused for the ad but leaks a play — must
        // not be measured as a view of whatever it is still attributed to.
        adBreakActive = true;
        player._emit('play', {});

        expect(videoViews()).toEqual([]);
    });

    it('fires video_view for the REAL content play after the ad break resolves (handoff)', () => {
        let adBreakActive = false;
        const player = register({ isAdBreakActive: () => adBreakActive });

        // Leaked play during the ad break — suppressed.
        adBreakActive = true;
        player._emit('playlistItem', { index: 0, item: { mediaid: 'A' } });
        player._emit('play', {});
        // onHandoff clears the ad break, then selects + plays the content.
        adBreakActive = false;
        player._emit('playlistItem', { index: 1, item: { mediaid: 'B' } });
        player._emit('play', {});

        expect(videoViews()).toEqual(['B']);
    });

    it('fires only the handed-off video_view after preroll recovery', () => {
        let adBreakActive = true;
        const player = register({ isAdBreakActive: () => adBreakActive });

        player._emit('playlistItem', { index: 0, item: { mediaid: 'A' } });
        player._emit('play', {});

        adBreakActive = false;
        player._emit('playlistItem', { index: 1, item: { mediaid: 'B' } });
        player._emit('play', {});

        expect(videoViews()).toEqual(['B']);
    });

    it('does NOT auto-advance (handleNextCallback) on a complete that fires during an ad break', () => {
        let adBreakActive = false;
        const handleNextCallback = jest.fn();
        const player = register({
            handleNextCallback,
            isAdBreakActive: () => adBreakActive
        });

        player._emit('playlistItem', { index: 0, item: { mediaid: 'A' } });
        // A short content clip finishing behind the ad must not count as a
        // completion nor trigger an auto-advance.
        adBreakActive = true;
        player._emit('complete', {});

        expect(handleNextCallback).not.toHaveBeenCalled();
    });

    it('DOES auto-advance on a genuine complete outside any ad break', () => {
        const handleNextCallback = jest.fn();
        const player = register({
            handleNextCallback,
            isAdBreakActive: () => false
        });

        player._emit('playlistItem', { index: 0, item: { mediaid: 'A' } });
        player._emit('complete', {});

        expect(handleNextCallback).toHaveBeenCalledTimes(1);
    });
});
