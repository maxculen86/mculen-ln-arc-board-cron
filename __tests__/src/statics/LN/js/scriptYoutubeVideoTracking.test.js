describe('scriptYoutubeVideoTracking', () => {
    let players;

    const setupYoutubeApi = () => {
        players = [];
        window.YT = {
            PlayerState: {
                ENDED: 0,
                PLAYING: 1,
                PAUSED: 2
            },
            Player: jest.fn((iframe, config) => {
                const player = {
                    iframe,
                    config,
                    currentTime: 0,
                    duration: 100,
                    getCurrentTime: jest.fn(() => player.currentTime),
                    getDuration: jest.fn(() => player.duration),
                    getVideoData: jest.fn(() => ({ title: 'YouTube title' }))
                };
                players.push(player);
                return player;
            })
        };
    };

    beforeEach(() => {
        jest.resetModules();
        jest.useFakeTimers();
        document.body.innerHTML = `
            <iframe
                id="youtube-embed"
                title="Fallback title"
                src="https://www.youtube.com/embed/abc123def45?autoplay=1"
            ></iframe>
        `;
        window.dataLayer = [];
        window.MutationObserver = jest.fn(function MutationObserver() {
            this.observe = jest.fn();
            this.disconnect = jest.fn();
        });
        setupYoutubeApi();
    });

    afterEach(() => {
        jest.useRealTimers();
        delete window.YT;
        delete window.dataLayer;
        delete window.MutationObserver;
    });

    it('initializes YouTube iframes and pushes agreed YouTube events to dataLayer', () => {
        jest.isolateModules(() => {
            require('../../../../../src/statics/LN/js/scriptYoutubeVideoTracking');
        });

        expect(window.YT.Player).toHaveBeenCalledTimes(1);
        expect(
            document.getElementById('youtube-embed').getAttribute('src')
        ).toContain('enablejsapi=1');

        const [player] = players;

        player.config.events.onStateChange({
            data: window.YT.PlayerState.PLAYING,
            target: player
        });

        player.currentTime = 51;
        player.config.events.onStateChange({
            data: window.YT.PlayerState.PLAYING,
            target: player
        });
        jest.advanceTimersByTime(0);

        player.config.events.onStateChange({
            data: window.YT.PlayerState.PAUSED,
            target: player
        });
        player.config.events.onStateChange({
            data: window.YT.PlayerState.PLAYING,
            target: player
        });
        player.config.events.onStateChange({
            data: window.YT.PlayerState.ENDED,
            target: player
        });
        jest.advanceTimersByTime(0);

        expect(window.dataLayer.map(item => item.event)).toEqual([
            'videoPlayYoutube',
            'videoProgressYoutube10',
            'videoProgressYoutube25',
            'videoProgressYoutube50',
            'videoPauseYoutube',
            'videoResumeYoutube',
            'videoCompleteYoutube'
        ]);
        expect(window.dataLayer[0]).toMatchObject({
            videoID: 'abc123def45',
            videoURL: 'https://www.youtube.com/embed/abc123def45?autoplay=1',
            videoName: 'YouTube title',
            content_type: 'home'
        });
        expect(
            window.dataLayer
                .filter(item => item.event.startsWith('videoProgressYoutube'))
                .map(item => item.event)
        ).toEqual([
            'videoProgressYoutube10',
            'videoProgressYoutube25',
            'videoProgressYoutube50'
        ]);
    });

    it('initializes lazy-loaded data-src iframes after src is populated', () => {
        let observerCallback;

        window.MutationObserver = jest.fn(function MutationObserver(callback) {
            observerCallback = callback;
            this.observe = jest.fn();
            this.disconnect = jest.fn();
        });
        document.body.innerHTML = `
            <iframe
                id="lazy-youtube"
                src="https://img.youtube.com/vi/abc123def45/hqdefault.jpg"
                data-src="https://www.youtube.com/embed/abc123def45?autoplay=1"
            ></iframe>
        `;

        jest.isolateModules(() => {
            require('../../../../../src/statics/LN/js/scriptYoutubeVideoTracking');
        });

        const iframe = document.getElementById('lazy-youtube');

        expect(window.YT.Player).not.toHaveBeenCalled();
        expect(iframe.getAttribute('data-src')).toContain('enablejsapi=1');
        expect(iframe.getAttribute('src')).not.toContain('enablejsapi=1');

        iframe.setAttribute('src', iframe.getAttribute('data-src'));
        observerCallback();

        expect(window.YT.Player).toHaveBeenCalledTimes(1);
    });

    it('pushes the YouTube URL when the video id is not available', () => {
        document.body.innerHTML = `
            <iframe
                id="youtube-playlist"
                src="https://www.youtube.com/embed/?list=PL123"
            ></iframe>
        `;

        jest.isolateModules(() => {
            require('../../../../../src/statics/LN/js/scriptYoutubeVideoTracking');
        });

        const [player] = players;

        player.config.events.onStateChange({
            data: window.YT.PlayerState.PLAYING,
            target: player
        });
        jest.advanceTimersByTime(0);

        expect(window.dataLayer[0]).toMatchObject({
            event: 'videoPlayYoutube',
            videoID: '',
            videoURL: 'https://www.youtube.com/embed/?list=PL123',
            content_type: 'home'
        });
    });

    it('does not initialize the same iframe more than once', () => {
        let observerCallback;

        window.MutationObserver = jest.fn(function MutationObserver(callback) {
            observerCallback = callback;
            this.observe = jest.fn();
            this.disconnect = jest.fn();
        });

        jest.isolateModules(() => {
            require('../../../../../src/statics/LN/js/scriptYoutubeVideoTracking');
        });

        const iframe = document.getElementById('youtube-embed');

        observerCallback();

        expect(window.YT.Player).toHaveBeenCalledTimes(1);
        expect(iframe.getAttribute('data-youtube-tracking-initialized')).toBe(
            'true'
        );
    });

    it('initializes after an existing YouTube API script becomes ready', () => {
        delete window.YT;
        document.head.innerHTML =
            '<script src="https://www.youtube.com/iframe_api"></script>';

        jest.isolateModules(() => {
            require('../../../../../src/statics/LN/js/scriptYoutubeVideoTracking');
        });

        expect(players).toEqual([]);

        setupYoutubeApi();
        jest.advanceTimersByTime(250);

        expect(window.YT.Player).toHaveBeenCalledTimes(1);
    });
});
