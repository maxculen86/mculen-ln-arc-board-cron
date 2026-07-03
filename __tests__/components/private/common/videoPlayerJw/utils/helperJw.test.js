import { scheduleTask } from '../../../../../../components/private/common/utils/scheduleTask';
import {
    transformImages,
    formatJwPlayerDate,
    getJWScript,
    handleVideoEventsScript,
    getAlternativeDescription,
    getVerticalPlayer,
    getConfigClassName
} from '../../../../../../components/private/common/videoPlayerJw/utils/helperJw';

jest.mock('../../../../../../components/private/common/utils/scheduleTask');

const mockPublishToast = jest.fn();
jest.mock(
    '../../../../../../components/features/ui/ln/toastsContainer/publishToast',
    () => ({
        __esModule: true,
        default: (...args) => mockPublishToast(...args)
    })
);

const VIDEO_NAME = '¿A qué debe su particular apariencia el Palacio de aguas?';
const VIDEO_ID = 'aomrvRI3';
const NEXT_VIDEO_NAME = 'El Obelisco: historia y secretos de un icono porteño';
const NEXT_VIDEO_ID = 'bQp9xYt2';

describe('Components - Private - Common - videoPlayerJw - Utils', () => {
    beforeEach(() => {
        window.dataLayer = [];
        mockPublishToast.mockClear();
        scheduleTask.mockImplementation(callback => callback());
    });

    it('transforms images correctly', () => {
        const inputData = [
            { src: 'image1.jpg', width: 480 },
            { src: 'image2.jpg', width: 720 },
            { src: 'image3.jpg', width: 1280 },
            { src: 'image4.jpg', width: 1920 }
        ];

        const expectedOutput = [
            { srcSet: 'image1.jpg', maxWidth: 767 },
            { srcSet: 'image2.jpg', minWidth: 768 },
            { srcSet: 'image3.jpg', minWidth: 1280 }
        ];

        const transformedImages = transformImages(inputData);

        expect(transformedImages).toEqual(expectedOutput);
    });

    it('handles empty input data', () => {
        const inputData = [];
        const transformedImages = transformImages(inputData);
        expect(transformedImages).toEqual([]);
    });

    it('handles input data with non-matching widths', () => {
        const inputData = [
            { src: 'image1.jpg', width: 320 },
            { src: 'image2.jpg', width: 960 }
        ];

        const transformedImages = transformImages(inputData);
        expect(transformedImages).toEqual([]);
    });

    it('formats timestamp correctly', () => {
        const timestamp = 1630186800;

        const formattedDate = formatJwPlayerDate(timestamp);
        expect(formattedDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
    });

    it('should handle video events correctly', () => {
        window.jwplayer = jest.fn().mockReturnValue({
            on: jest.fn()
        });
        window.isInDatalayerEvent = jest.fn(() => false);
        window.addEventToDataLayerV2 = jest.fn();

        const title = VIDEO_NAME;
        const idVideo = VIDEO_ID;

        handleVideoEventsScript(title, idVideo);

        expect(window.jwplayer).toHaveBeenCalledWith(idVideo);
        expect(window.jwplayer().on).toHaveBeenCalledWith(
            'ready',
            expect.any(Function)
        );
        expect(window.jwplayer().on).toHaveBeenCalledWith(
            'play',
            expect.any(Function)
        );
        expect(window.jwplayer().on).toHaveBeenCalledWith(
            'pause',
            expect.any(Function)
        );
        expect(window.jwplayer().on).toHaveBeenCalledWith(
            'time',
            expect.any(Function)
        );
        expect(window.jwplayer().on).toHaveBeenCalledWith(
            'complete',
            expect.any(Function)
        );
        expect(window.jwplayer().on).toHaveBeenCalledWith(
            'error',
            expect.any(Function)
        );
    });

    it('publishes a georestriction toast when the player errors with a code in range and a manifestLoadError source', () => {
        const events = {};
        const playerMock = {
            on: jest.fn((eventName, callback) => {
                events[eventName] = callback;
            }),
            getPlaylistItem: jest.fn()
        };

        window.jwplayer = jest.fn().mockReturnValue(playerMock);

        handleVideoEventsScript(VIDEO_NAME, VIDEO_ID);

        events.error({
            code: 232403,
            sourceError: { details: 'manifestLoadError' }
        });

        expect(mockPublishToast).toHaveBeenCalledWith({
            variant: 'warning',
            title: 'No disponible',
            message: 'Este contenido no esta disponible en tu región.'
        });
    });

    it('publishes a georestriction toast at the boundaries of the georestriction code range', () => {
        const events = {};
        const playerMock = {
            on: jest.fn((eventName, callback) => {
                events[eventName] = callback;
            }),
            getPlaylistItem: jest.fn()
        };

        window.jwplayer = jest.fn().mockReturnValue(playerMock);

        handleVideoEventsScript(VIDEO_NAME, VIDEO_ID);

        events.error({
            code: 232400,
            sourceError: { details: 'manifestLoadError' }
        });
        events.error({
            code: 232599,
            sourceError: { details: 'manifestLoadError' }
        });

        expect(mockPublishToast).toHaveBeenCalledTimes(2);
        expect(mockPublishToast).toHaveBeenNthCalledWith(1, {
            variant: 'warning',
            title: 'No disponible',
            message: 'Este contenido no esta disponible en tu región.'
        });
        expect(mockPublishToast).toHaveBeenNthCalledWith(2, {
            variant: 'warning',
            title: 'No disponible',
            message: 'Este contenido no esta disponible en tu región.'
        });
    });

    it('publishes a georestriction toast when the player errors with code 224003', () => {
        const events = {};
        const playerMock = {
            on: jest.fn((eventName, callback) => {
                events[eventName] = callback;
            }),
            getPlaylistItem: jest.fn()
        };

        window.jwplayer = jest.fn().mockReturnValue(playerMock);

        handleVideoEventsScript(VIDEO_NAME, VIDEO_ID);

        events.error({ code: 224003 });

        expect(mockPublishToast).toHaveBeenCalledWith({
            variant: 'warning',
            title: 'No disponible',
            message: 'Este contenido no esta disponible en tu región.'
        });
    });

    it('publishes a generic error toast when the error code is in range but is not a manifestLoadError', () => {
        const events = {};
        const playerMock = {
            on: jest.fn((eventName, callback) => {
                events[eventName] = callback;
            }),
            getPlaylistItem: jest.fn()
        };

        window.jwplayer = jest.fn().mockReturnValue(playerMock);

        handleVideoEventsScript(VIDEO_NAME, VIDEO_ID);

        events.error({
            code: 232403,
            sourceError: { details: 'otherError' }
        });

        expect(mockPublishToast).toHaveBeenCalledWith({
            variant: 'warning',
            title: 'Error de reproducción',
            message: 'No se pudo reproducir el video. Intentá más tarde.'
        });
    });

    it('publishes a generic error toast when the error code is outside the georestriction range', () => {
        const events = {};
        const playerMock = {
            on: jest.fn((eventName, callback) => {
                events[eventName] = callback;
            }),
            getPlaylistItem: jest.fn()
        };

        window.jwplayer = jest.fn().mockReturnValue(playerMock);

        handleVideoEventsScript(VIDEO_NAME, VIDEO_ID);

        events.error({
            code: 232600,
            sourceError: { details: 'manifestLoadError' }
        });

        expect(mockPublishToast).toHaveBeenCalledWith({
            variant: 'warning',
            title: 'Error de reproducción',
            message: 'No se pudo reproducir el video. Intentá más tarde.'
        });
    });

    it('publishes a generic error toast for non-georestriction player errors', () => {
        const events = {};
        const playerMock = {
            on: jest.fn((eventName, callback) => {
                events[eventName] = callback;
            }),
            getPlaylistItem: jest.fn()
        };

        window.jwplayer = jest.fn().mockReturnValue(playerMock);

        handleVideoEventsScript(VIDEO_NAME, VIDEO_ID);

        events.error({ code: 500 });

        expect(mockPublishToast).toHaveBeenCalledWith({
            variant: 'warning',
            title: 'Error de reproducción',
            message: 'No se pudo reproducir el video. Intentá más tarde.'
        });
    });

    it('fires quartiles when playback crosses the threshold even if exact percent is skipped', () => {
        const events = {};
        const playerMock = {
            on: jest.fn((eventName, callback) => {
                events[eventName] = callback;
            }),
            getPlaylistItem: jest.fn()
        };

        window.jwplayer = jest.fn().mockReturnValue(playerMock);

        handleVideoEventsScript(VIDEO_NAME, VIDEO_ID);

        events.time({ currentTime: 26, duration: 100 });
        events.time({ currentTime: 51, duration: 100 });
        events.time({ currentTime: 76, duration: 100 });

        expect(window.dataLayer).toEqual([
            {
                event: '10',
                videoName: VIDEO_NAME,
                videoID: VIDEO_ID
            },
            {
                event: '25',
                videoName: VIDEO_NAME,
                videoID: VIDEO_ID
            },
            {
                event: '50',
                videoName: VIDEO_NAME,
                videoID: VIDEO_ID
            },
            {
                event: '75',
                videoName: VIDEO_NAME,
                videoID: VIDEO_ID
            }
        ]);
    });

    it('does not backfill quartiles immediately after a seek forward', () => {
        const events = {};
        const playerMock = {
            on: jest.fn((eventName, callback) => {
                events[eventName] = callback;
            }),
            getPlaylistItem: jest.fn()
        };

        window.jwplayer = jest.fn().mockReturnValue(playerMock);

        handleVideoEventsScript(VIDEO_NAME, VIDEO_ID);

        events.time({ currentTime: 26, duration: 100 });
        events.seek({
            currentTime: 26,
            position: 26,
            offset: 60,
            duration: 100
        });
        events.time({ currentTime: 60, duration: 100 });
        events.time({ currentTime: 76, duration: 100 });

        expect(window.dataLayer).toEqual([
            {
                event: '10',
                videoName: VIDEO_NAME,
                videoID: VIDEO_ID
            },
            {
                event: '25',
                videoName: VIDEO_NAME,
                videoID: VIDEO_ID
            },
            {
                event: 'videoSeek',
                videoName: VIDEO_NAME,
                videoID: VIDEO_ID
            },
            {
                event: '75',
                videoName: VIDEO_NAME,
                videoID: VIDEO_ID
            }
        ]);
    });

    it('resets quartile tracking when playlist item changes', () => {
        const events = {};
        const playerMock = {
            on: jest.fn((eventName, callback) => {
                events[eventName] = callback;
            }),
            getPlaylistItem: jest.fn()
        };

        window.jwplayer = jest.fn().mockReturnValue(playerMock);

        handleVideoEventsScript(VIDEO_NAME, VIDEO_ID);

        events.time({ currentTime: 30, duration: 100 });
        events.playlistItem({
            title: NEXT_VIDEO_NAME,
            mediaid: NEXT_VIDEO_ID
        });
        events.time({ currentTime: 30, duration: 100 });

        expect(window.dataLayer).toEqual([
            {
                event: '10',
                videoName: VIDEO_NAME,
                videoID: VIDEO_ID
            },
            {
                event: '25',
                videoName: VIDEO_NAME,
                videoID: VIDEO_ID
            },
            {
                event: '10',
                videoName: NEXT_VIDEO_NAME,
                videoID: NEXT_VIDEO_ID
            },
            {
                event: '25',
                videoName: NEXT_VIDEO_NAME,
                videoID: NEXT_VIDEO_ID
            }
        ]);
    });

    it('tracks next playlist item as autoplay after a manual first video completes', () => {
        const events = {};
        const playerMock = {
            on: jest.fn((eventName, callback) => {
                events[eventName] = callback;
            }),
            getPlaylistItem: jest.fn()
        };

        window.jwplayer = jest.fn().mockReturnValue(playerMock);

        handleVideoEventsScript(VIDEO_NAME, VIDEO_ID, 0, 'manual', 'vertical');

        events.play({});
        events.complete();
        events.playlistItem({
            title: NEXT_VIDEO_NAME,
            mediaid: NEXT_VIDEO_ID
        });
        events.play({});

        expect(window.dataLayer).toEqual([
            {
                event: 'videoPlay',
                videoName: VIDEO_NAME,
                videoID: VIDEO_ID,
                mode: 'manual',
                videoOrientation: 'vertical'
            },
            {
                event: 'videoComplete',
                videoName: VIDEO_NAME,
                videoID: VIDEO_ID
            },
            {
                event: 'videoPlay',
                videoName: NEXT_VIDEO_NAME,
                videoID: NEXT_VIDEO_ID,
                mode: 'autoplay',
                videoOrientation: 'vertical'
            }
        ]);
    });

    it('keeps the first manual play mode when the initial playlist item is received before play', () => {
        const events = {};
        const playerMock = {
            on: jest.fn((eventName, callback) => {
                events[eventName] = callback;
            }),
            getPlaylistItem: jest.fn()
        };

        window.jwplayer = jest.fn().mockReturnValue(playerMock);

        handleVideoEventsScript(
            VIDEO_NAME,
            VIDEO_ID,
            0,
            'manual',
            'horizontal'
        );

        events.playlistItem({
            title: VIDEO_NAME,
            mediaid: VIDEO_ID
        });
        events.play({ playReason: 'autostart' });

        expect(window.dataLayer).toEqual([
            {
                event: 'videoPlay',
                videoName: VIDEO_NAME,
                videoID: VIDEO_ID,
                mode: 'manual',
                videoOrientation: 'horizontal'
            }
        ]);
    });

    describe('getJWScript function', () => {
        document.getElementById = jest.fn().mockReturnValue({
            addEventListener: jest.fn(),
            remove: jest.fn()
        });

        document.createElement = jest.fn().mockReturnValue({
            addEventListener: jest.fn(),
            src: '',
            setAttribute: jest.fn()
        });

        document.head.appendChild = jest.fn();

        window.jwplayer = jest.fn().mockReturnValue({
            setup: jest.fn(),
            on: jest.fn()
        });

        window.dataLayer = window.dataLayer || [];

        window.isInDatalayerEvent = jest.fn(() => false);

        beforeEach(() => {
            jest.clearAllMocks();
            window.dataLayer = [];
        });

        it('should setup JWPlayer and handle video events on click', () => {
            jest.useFakeTimers();
            const title = VIDEO_NAME;
            const player = 'testPlayer';
            const playlist = ['video1', 'video2'];
            const hasAutoplay = true;
            const idVideo = VIDEO_ID;
            const tagsUrl = 'testUrl';

            const mockScheduleTask = jest.fn(callback => callback());
            scheduleTask.mockImplementation(mockScheduleTask);

            getJWScript(title, player, playlist, hasAutoplay, idVideo, tagsUrl);

            jest.advanceTimersByTime(1000);

            expect(document.getElementById).toHaveBeenCalledWith(
                `facade-${idVideo}`
            );

            expect(document.createElement).toHaveBeenCalledTimes(1);
            expect(document.createElement).toHaveBeenCalledWith('script');
            expect(document.head.appendChild).toHaveBeenCalledWith(
                expect.any(Object)
            );

            expect(window.dataLayer).toStrictEqual([
                {
                    event: 'videoDisplay',
                    videoName: VIDEO_NAME,
                    videoID: VIDEO_ID
                }
            ]);
        });

        it('should add event listener if autoplay is false', () => {
            const title = VIDEO_NAME;
            const player = 'testPlayer';
            const playlist = ['video1', 'video2'];
            const hasAutoplay = false;
            const idVideo = VIDEO_ID;
            const tagsUrl = 'testUrl';

            getJWScript(title, player, playlist, hasAutoplay, idVideo, tagsUrl);

            expect(
                document.getElementById(idVideo).addEventListener
            ).toHaveBeenCalledWith('click', expect.any(Function));

            expect(document.createElement).not.toHaveBeenCalled();
            expect(window.jwplayer).not.toHaveBeenCalled();
            expect(window.dataLayer).toStrictEqual([
                {
                    event: 'videoDisplay',
                    videoName: VIDEO_NAME,
                    videoID: VIDEO_ID
                }
            ]);
        });
    });
    describe('getAlternativeDescription function', () => {
        it('If uploadDate does not exist, should returns an empty string', () => {
            const uploadDate = '';
            const noteTitle = 'Note Title';
            const description = getAlternativeDescription(
                uploadDate,
                noteTitle
            );
            expect(description).toStrictEqual('');
        });
        it('If uploadDate exists and noteTitle does not, it should return an alternative description', () => {
            const uploadDate = '2022-05-05T12:24:50Z';
            const noteTitle = '';
            const description = getAlternativeDescription(
                uploadDate,
                noteTitle
            );
            expect(description).toStrictEqual(
                'Video publicado el 05/05/2022 por LA NACION'
            );
        });
        it('If uploadDate and noteTitle exist, should return an alternative description', () => {
            const uploadDate = '2022-05-05T12:24:50Z';
            const noteTitle = 'Note Title';
            const description = getAlternativeDescription(
                uploadDate,
                noteTitle
            );
            expect(description).toStrictEqual(
                'Video de Note Title publicado el 05/05/2022 por LA NACION'
            );
        });
    });

    describe('getVerticalPlayer', () => {
        it('returns true for valid vertical player IDs', () => {
            const validVerticalPlayerIds = ['hOz6uuUy', 'HbGKzdo0', '9gbjbJp8'];

            validVerticalPlayerIds.forEach(playerId => {
                expect(getVerticalPlayer(playerId)).toBe(true);
            });
        });

        it('returns false for invalid player IDs', () => {
            const invalidPlayerIds = ['invalid1', '12345', 'randomID'];

            invalidPlayerIds.forEach(playerId => {
                expect(getVerticalPlayer(playerId)).toBe(false);
            });
        });

        it('returns false for undefined or null playerId', () => {
            expect(getVerticalPlayer(undefined)).toBe(false);
            expect(getVerticalPlayer(null)).toBe(false);
        });

        it('returns false for an empty string', () => {
            expect(getVerticalPlayer('')).toBe(false);
        });
    });
    describe('getConfigClassName', () => {
        it('returns correct class names for horizontal variant with isNotaVideo=false', () => {
            const result = getConfigClassName('horizontal', false);

            expect(result).toEqual({
                container: 'content-media cursor-pointer container-center-100',
                mediaContainer:
                    'media-container relative ratio-16-9 mod-media pb-32',
                videoContainer: 'mod-video',
                videoPlayer: 'video-player bg-black ratio-16-9',
                facade: 'com-image',
                facadeContainer: 'ratio-16-9',
                captionClasses: 'px-0_l mb-8'
            });
        });

        it('returns correct class names for vertical variant with isNotaVideo=false', () => {
            const result = getConfigClassName('vertical', false);

            expect(result).toEqual({
                container: 'content-media cursor-pointer',
                mediaContainer:
                    'media-container relative w-100 mod-media pb-32',
                videoContainer:
                    'mod-video flex flex-column ai-center bg-neutral-light-50',
                videoPlayer:
                    'video-player ratio-9-16 flex jc-center ai-center w-100 h-100 w-320',
                facade: 'com-image',
                facadeContainer: 'w-100 ratio-9-16',
                captionClasses: 'w-100'
            });
        });

        it('returns correct class names for vertical variant with isNotaVideo=true and isOpening=true', () => {
            const result = getConfigClassName('vertical', true, true);

            expect(result).toEqual({
                container: 'content-media cursor-pointer',
                mediaContainer: 'media-container relative w-100',
                videoContainer:
                    'mod-video flex flex-column ai-center bg-neutral-light-50',
                videoPlayer:
                    'video-player ratio-9-16 flex jc-center ai-center w-100 h-100 h-478_md h-652_lg',
                facade: 'com-image',
                facadeContainer: 'w-100 ratio-9-16',
                captionClasses: 'w-100'
            });
        });

        it('returns correct class names for horizontal variant with isNotaVideo=true and isOpening=true', () => {
            const result = getConfigClassName('horizontal', true, true);

            expect(result).toEqual({
                container: 'content-media cursor-pointer container-center-100',
                mediaContainer: 'media-container relative ratio-16-9',
                videoContainer: 'mod-video',
                videoPlayer: 'video-player bg-black ratio-16-9',
                facade: 'com-image',
                facadeContainer: 'ratio-16-9',
                captionClasses: 'px-0_l mb-8'
            });
        });
    });
});
