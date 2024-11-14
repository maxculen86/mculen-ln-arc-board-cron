import {
    isInDatalayerEvent,
    addVideoDisplayEvent
} from '../../../../../components/private/common/utils/videoPlayerHelper';

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
