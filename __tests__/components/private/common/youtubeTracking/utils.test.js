import {
    createYoutubeDataLayerTracker,
    ensureYoutubeJsApiParams,
    extractYoutubeVideoData,
    getYoutubeVideoMode,
    YOUTUBE_PLAYER_STATES,
    YOUTUBE_VIDEO_MODES
} from '../../../../../components/private/common/youtubeTracking/utils';

describe('youtubeTracking utils', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        window.dataLayer = [];
    });

    afterEach(() => {
        jest.useRealTimers();
        delete window.dataLayer;
    });

    it('adds enablejsapi and origin without dropping existing params', () => {
        expect(
            ensureYoutubeJsApiParams(
                'https://www.youtube.com/embed/abc123def45?autoplay=1',
                'https://www.lanacion.com.ar'
            )
        ).toBe(
            'https://www.youtube.com/embed/abc123def45?autoplay=1&enablejsapi=1&origin=https%3A%2F%2Fwww.lanacion.com.ar'
        );
    });

    it('extracts id and url from a YouTube embed url', () => {
        expect(
            extractYoutubeVideoData(
                'https://www.youtube.com/embed/6tXZfcCV4ZY?controls=0'
            )
        ).toEqual({
            id: '6tXZfcCV4ZY',
            url: 'https://www.youtube.com/embed/6tXZfcCV4ZY?controls=0'
        });
    });

    it('keeps a YouTube embed url fallback when id is not available', () => {
        expect(
            extractYoutubeVideoData('https://www.youtube.com/embed/?list=PL123')
        ).toEqual({
            id: '',
            url: 'https://www.youtube.com/embed/?list=PL123'
        });
    });

    it('does not treat the live_stream embed path as a video id', () => {
        expect(
            extractYoutubeVideoData(
                'https://www.youtube.com/embed/live_stream?channel=UC123'
            )
        ).toEqual({
            id: '',
            url: 'https://www.youtube.com/embed/live_stream?channel=UC123'
        });
    });

    it('removes YouTube JS API params from the tracked video url', () => {
        expect(
            extractYoutubeVideoData(
                'https://www.youtube.com/embed/abc123def45?autoplay=1&mute=1&enablejsapi=1&origin=https%3A%2F%2Fdevelop.lanacion.com.ar'
            )
        ).toEqual({
            id: 'abc123def45',
            url: 'https://www.youtube.com/embed/abc123def45?autoplay=1&mute=1'
        });
    });

    it('returns empty data when there is no supported YouTube embed url', () => {
        expect(extractYoutubeVideoData('https://example.com')).toEqual({
            id: '',
            url: ''
        });
        expect(
            extractYoutubeVideoData('https://www.youtube.com/watch?v=abc')
        ).toEqual({ id: '', url: '' });
    });

    it('resolves manual mode by default', () => {
        expect(
            getYoutubeVideoMode({
                url: 'https://www.youtube.com/embed/abc123def45'
            })
        ).toBe(YOUTUBE_VIDEO_MODES.MANUAL);
    });

    it('resolves autoplay mode from the embed autoplay parameter', () => {
        expect(
            getYoutubeVideoMode({
                url: 'https://www.youtube.com/embed/abc123def45?autoplay=1&mute=1'
            })
        ).toBe(YOUTUBE_VIDEO_MODES.AUTOPLAY);
    });

    it('resolves live mode from an explicit mode, live player data, or live stream embed', () => {
        expect(
            getYoutubeVideoMode({
                mode: YOUTUBE_VIDEO_MODES.LIVE,
                url: 'https://www.youtube.com/embed/abc123def45?autoplay=1'
            })
        ).toBe(YOUTUBE_VIDEO_MODES.LIVE);
        expect(
            getYoutubeVideoMode({
                playerData: { isLive: true },
                url: 'https://www.youtube.com/embed/abc123def45?autoplay=1'
            })
        ).toBe(YOUTUBE_VIDEO_MODES.LIVE);
        expect(
            getYoutubeVideoMode({
                url: 'https://www.youtube.com/embed/live_stream?channel=UC123'
            })
        ).toBe(YOUTUBE_VIDEO_MODES.LIVE);
    });

    it('maps YouTube player states to the agreed YouTube dataLayer events with mode', () => {
        const tracker = createYoutubeDataLayerTracker({
            video: {
                id: 'abc123def45',
                url: 'https://www.youtube.com/embed/abc123def45?autoplay=1',
                title: 'Demo',
                mode: YOUTUBE_VIDEO_MODES.AUTOPLAY,
                context: {
                    content_type: 'home'
                }
            }
        });

        tracker.handleStateChange({
            state: YOUTUBE_PLAYER_STATES.PLAYING,
            currentTime: 0,
            duration: 100
        });
        tracker.trackProgress({ currentTime: 26, duration: 100 });
        tracker.trackProgress({ currentTime: 51, duration: 100 });
        tracker.handleStateChange({
            state: YOUTUBE_PLAYER_STATES.PAUSED,
            currentTime: 51,
            duration: 100
        });
        tracker.handleStateChange({
            state: YOUTUBE_PLAYER_STATES.PLAYING,
            currentTime: 51,
            duration: 100
        });
        tracker.trackProgress({ currentTime: 76, duration: 100 });
        tracker.handleStateChange({
            state: YOUTUBE_PLAYER_STATES.ENDED,
            currentTime: 100,
            duration: 100
        });
        tracker.handleStateChange({
            state: YOUTUBE_PLAYER_STATES.ENDED,
            currentTime: 100,
            duration: 100
        });
        jest.advanceTimersByTime(0);

        expect(window.dataLayer.map(item => item.event)).toEqual([
            'videoPlayYoutube',
            '10',
            '25',
            '50',
            'videoPauseYoutube',
            'videoResumeYoutube',
            '75',
            'videoComplete'
        ]);
        expect(window.dataLayer[0]).toMatchObject({
            mode: 'autoplay',
            videoID: 'abc123def45',
            videoURL: 'https://www.youtube.com/embed/abc123def45?autoplay=1',
            videoName: 'Demo',
            content_type: 'home'
        });
        expect(window.dataLayer.every(item => item.mode === 'autoplay')).toBe(
            true
        );
        expect(
            window.dataLayer
                .filter(item => ['10', '25', '50', '75'].includes(item.event))
                .map(item => item.event)
        ).toEqual(['10', '25', '50', '75']);
    });
    it('does not emit progress milestones for live videos', () => {
        const tracker = createYoutubeDataLayerTracker({
            video: {
                id: 'live12345',
                url: 'https://www.youtube.com/embed/live12345?autoplay=1',
                title: 'Live Demo',
                mode: YOUTUBE_VIDEO_MODES.LIVE,
                context: {
                    content_type: 'home'
                }
            }
        });

        tracker.handleStateChange({
            state: YOUTUBE_PLAYER_STATES.PLAYING,
            currentTime: 100,
            duration: 100
        });
        tracker.trackProgress({ currentTime: 100, duration: 100 });
        tracker.handleStateChange({
            state: YOUTUBE_PLAYER_STATES.PAUSED,
            currentTime: 100,
            duration: 100
        });
        tracker.handleStateChange({
            state: YOUTUBE_PLAYER_STATES.PLAYING,
            currentTime: 100,
            duration: 100
        });
        tracker.handleStateChange({
            state: YOUTUBE_PLAYER_STATES.ENDED,
            currentTime: 100,
            duration: 100
        });
        jest.advanceTimersByTime(0);

        expect(window.dataLayer.map(item => item.event)).toEqual([
            'videoPlayYoutube',
            'videoPauseYoutube',
            'videoResumeYoutube',
            'videoComplete'
        ]);
        expect(window.dataLayer.every(item => item.mode === 'live')).toBe(true);
    });
});
