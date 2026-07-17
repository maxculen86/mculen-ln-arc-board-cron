import {
    createYoutubeDataLayerTracker,
    ensureYoutubeJsApiParams,
    extractYoutubeVideoData,
    YOUTUBE_PLAYER_STATES
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

    it('maps YouTube player states to the agreed YouTube dataLayer events', () => {
        const tracker = createYoutubeDataLayerTracker({
            video: {
                id: 'abc123def45',
                url: 'https://www.youtube.com/embed/abc123def45',
                title: 'Demo',
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
            'videoProgressYoutube10',
            'videoProgressYoutube25',
            'videoProgressYoutube50',
            'videoPauseYoutube',
            'videoResumeYoutube',
            'videoProgressYoutube75',
            'videoCompleteYoutube'
        ]);
        expect(window.dataLayer[0]).toMatchObject({
            videoID: 'abc123def45',
            videoURL: 'https://www.youtube.com/embed/abc123def45',
            videoName: 'Demo',
            content_type: 'home'
        });
        expect(
            window.dataLayer
                .filter(item => item.event.startsWith('videoProgressYoutube'))
                .map(item => item.event)
        ).toEqual([
            'videoProgressYoutube10',
            'videoProgressYoutube25',
            'videoProgressYoutube50',
            'videoProgressYoutube75'
        ]);
    });
});
