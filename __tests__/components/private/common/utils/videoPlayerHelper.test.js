import {
    isInDatalayerEvent,
    addVideoDisplayEvent,
    registerJwVideoControlsTracking,
    registerVideoResumeTracking
} from '../../../../../components/private/common/utils/videoPlayerHelper';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

const VIDEO_NAME = '¿A qué debe su particular apariencia el Palacio de aguas?';
const VIDEO_ID = 'aomrvRI3';
const NEXT_VIDEO_NAME = 'El Obelisco: historia y secretos de un icono porteño';
const NEXT_VIDEO_ID = 'bQp9xYt2';

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
        const title = VIDEO_NAME;
        const idVideo = VIDEO_ID;

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
            defaultTitle: VIDEO_NAME,
            defaultId: VIDEO_ID
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
            videoName: VIDEO_NAME,
            videoID: VIDEO_ID
        });
    });

    it('should not fire resume event if not paused previously', () => {
        registerVideoResumeTracking({
            player: playerMock,
            defaultTitle: VIDEO_NAME,
            defaultId: VIDEO_ID
        });

        events.play();
        events.play();

        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });

    it('should handle seek correctly (prevent resume on seek)', () => {
        registerVideoResumeTracking({
            player: playerMock,
            defaultTitle: VIDEO_NAME,
            defaultId: VIDEO_ID
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
            videoName: VIDEO_NAME,
            videoID: VIDEO_ID
        });
    });

    it('should update current media on playlist item change', () => {
        registerVideoResumeTracking({
            player: playerMock,
            defaultTitle: VIDEO_NAME,
            defaultId: VIDEO_ID
        });

        // Change video
        events.playlistItem({
            title: NEXT_VIDEO_NAME,
            mediaid: NEXT_VIDEO_ID
        });

        // Play new video
        events.play();
        events.pause();
        events.play(); // Resume new video

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'videoResume',
            videoName: NEXT_VIDEO_NAME,
            videoID: NEXT_VIDEO_ID
        });
    });
});

describe('registerJwVideoControlsTracking', () => {
    let playerMock;
    let events = {};
    let onSeekMock;
    let onPlaylistItemMock;

    beforeEach(() => {
        jest.clearAllMocks();
        events = {};
        onSeekMock = jest.fn();
        onPlaylistItemMock = jest.fn();
        playerMock = {
            on: jest.fn((event, callback) => {
                events[event] = callback;
            }),
            off: jest.fn(),
            getPlaylistItem: jest.fn(() => ({
                title: VIDEO_NAME,
                mediaid: VIDEO_ID
            })),
            getPlugin: jest.fn()
        };
    });

    it('should register seek and playlist item listeners', () => {
        registerJwVideoControlsTracking({
            player: playerMock,
            defaultTitle: VIDEO_NAME,
            defaultId: VIDEO_ID,
            onSeek: onSeekMock,
            onPlaylistItem: onPlaylistItemMock
        });

        expect(playerMock.on).toHaveBeenCalledWith(
            'seek',
            expect.any(Function)
        );
        expect(playerMock.on).toHaveBeenCalledWith(
            'playlistItem',
            expect.any(Function)
        );
    });

    it('should push videoSeek and call onSeek when seek happens', () => {
        registerJwVideoControlsTracking({
            player: playerMock,
            defaultTitle: VIDEO_NAME,
            defaultId: VIDEO_ID,
            onSeek: onSeekMock,
            onPlaylistItem: onPlaylistItemMock
        });

        events.seek({ position: 10, offset: 20, duration: 100 });

        expect(onSeekMock).toHaveBeenCalledWith({
            position: 10,
            offset: 20,
            duration: 100
        });
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'videoSeek',
            videoName: VIDEO_NAME,
            videoID: VIDEO_ID
        });
    });
});
