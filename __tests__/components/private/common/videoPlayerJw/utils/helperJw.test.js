import {
    transformImages,
    formatJwPlayerDate,
    getJWScript,
    handleVideoEventsScript
} from '../../../../../../components/private/common/videoPlayerJw/utils/helperJw';

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

        expect(formattedDate).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });

    it('should handle video events correctly', () => {
        window.jwplayer = jest.fn().mockReturnValue({
            on: jest.fn()
        });
        window.isInDatalayerEvent = jest.fn(() => false);
        window.addToDataLayer = jest.fn();

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

        window.addToDataLayer = jest.fn();

        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('should setup JWPlayer and handle video events on click', () => {
            const title = 'Test Title';
            const player = 'testPlayer';
            const playlist = ['video1', 'video2'];
            const hasAutoplay = true;
            const idVideo = 'testId';
            const tagsUrl = 'testUrl';

            getJWScript(title, player, playlist, hasAutoplay, idVideo, tagsUrl);

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
});
