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

describe('Components - Private - Common - videoPlayerJw - Utils', () => {
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

        const title = 'Test Title';
        const idVideo = 'testId';

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
        });

        it('should setup JWPlayer and handle video events on click', () => {
            jest.useFakeTimers();
            const title = 'Test Title';
            const player = 'testPlayer';
            const playlist = ['video1', 'video2'];
            const hasAutoplay = true;
            const idVideo = 'testId';
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
                    videoName: 'Test Title',
                    videoID: 'testId'
                }
            ]);
        });

        it('should add event listener if autoplay is false', () => {
            const title = 'Test Title';
            const player = 'testPlayer';
            const playlist = ['video1', 'video2'];
            const hasAutoplay = false;
            const idVideo = 'testId';
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
                    videoName: 'Test Title',
                    videoID: 'testId'
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
                videoContainer: 'mod-video flex flex-column ai-center bg-black',
                videoPlayer:
                    'video-player w-100 ratio-9-16 flex jc-center ai-center h-640 w-320',
                facade: 'com-image',
                facadeContainer: 'w-320 ratio-9-16',
                captionClasses: 'w-100'
            });
        });

        it('returns correct class names for vertical variant with isNotaVideo=true and isOpening=true', () => {
            const result = getConfigClassName('vertical', true, true);

            expect(result).toEqual({
                container: 'content-media cursor-pointer',
                mediaContainer: 'media-container relative w-100',
                videoContainer: 'mod-video flex flex-column ai-center bg-black',
                videoPlayer:
                    'video-player w-100 ratio-9-16 flex jc-center ai-center h-640 h-478_md h-652_lg',
                facade: 'com-image',
                facadeContainer: 'w-320 ratio-9-16',
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
