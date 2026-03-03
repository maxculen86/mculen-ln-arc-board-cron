import {
    isInDatalayerEvent,
    addVideoDisplayEvent,
    registerVideoResumeTracking
} from '../../../../../components/private/common/utils/videoPlayerHelper';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('Private - Common - Utils - VideoPlayerHelper', () => {
    beforeEach(() => {
        global.window.document.body.innerHTML = '';
        global.window.dataLayer = [];
    });

    it('should test isInDatalayerEvent function', () => {
        const _event = {
            videoID: 'powa-9062483a-1cd9-4a5d-8656-380f2b675abf-0',
            event: 'event'
        };

        global.window.dataLayer = [_event];

        expect(
            isInDatalayerEvent(
                'event',
                'powa-9062483a-1cd9-4a5d-8656-380f2b675abf-0'
            )
        ).toStrictEqual(true);

        expect(isInDatalayerEvent({}, 'powa-undefined')).toStrictEqual(false);
    });

    it('should add a videoDisplay event to the dataLayer if not already present', () => {
        const title = 'Sample Video';
        const idVideo = 'video-12345';

        addVideoDisplayEvent({ title, idVideo });

        expect(global.window.dataLayer).toContainEqual({
            event: 'videoDisplay',
            videoName: title,
            videoID: idVideo
        });
    });
});

describe('registerVideoResumeTracking', () => {
    let playerMock;
    let events = {};

    beforeEach(() => {
        jest.clearAllMocks();
        events = {};
        playerMock = {
            on: jest.fn((event, callback) => {
                events[event] = callback;
            }),
            off: jest.fn(),
            getPlaylistItem: jest.fn()
        };
    });

    it('should calculate resume event correctly', () => {
        registerVideoResumeTracking({
            player: playerMock,
            defaultTitle: 'Video 1',
            defaultId: '123'
        });

        // Simulate Play
        events.play();
        expect(addEventToDataLayerV2).not.toHaveBeenCalled();

        // Simulate Pause
        events.pause();

        // Simulate Play (Resume)
        events.play();

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'videoResume',
            videoName: 'Video 1',
            videoID: '123'
        });
    });

    it('should not fire resume event if not paused previously', () => {
        registerVideoResumeTracking({
            player: playerMock,
            defaultTitle: 'Video 1',
            defaultId: '123'
        });

        events.play();
        events.play();

        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });

    it('should handle seek correctly (prevent resume on seek)', () => {
        registerVideoResumeTracking({
            player: playerMock,
            defaultTitle: 'Video 1',
            defaultId: '123'
        });

        events.play();
        events.pause(); // Paused

        events.seek(); // Seek triggers internal flag
        events.play(); // Play after seek should NOT trigger resume

        expect(addEventToDataLayerV2).not.toHaveBeenCalled();

        // Next play after pause should work
        events.pause();
        events.play();

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'videoResume',
            videoName: 'Video 1',
            videoID: '123'
        });
    });

    it('should update current media on playlist item change', () => {
        registerVideoResumeTracking({
            player: playerMock,
            defaultTitle: 'Video 1',
            defaultId: '123'
        });

        // Change video
        events.playlistItem({ title: 'Video 2', mediaid: '456' });

        // Play new video
        events.play();
        events.pause();
        events.play(); // Resume new video

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'videoResume',
            videoName: 'Video 2',
            videoID: '456'
        });
    });
});
