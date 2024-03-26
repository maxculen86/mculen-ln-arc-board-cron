import {
    setVideoEvents,
    addToDataLayer,
    isInDatalayerEvent,
    setProgressEvent
} from '../../../../../components/private/common/utils/videoPlayerHelper';
import '@testing-library/jest-dom';

describe('Private - Common - Utils - VideoPlayerHelper', () => {
    global.window.document.body.innerHTML = '';

    it('should test addToDataLayer function', () => {
        global.window.dataLayer = [];

        addToDataLayer('play', 'titulo', 'id');

        expect(window.dataLayer).toStrictEqual([
            { event: 'play', videoID: 'id', videoName: 'titulo' }
        ]);
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
        ).toStrictEqual(_event);

        expect(isInDatalayerEvent({}, 'powa-undefined')).toStrictEqual(false);
    });

    it('should test setProgresEvent function', () => {
        global.window.dataLayer = [];

        const player = {
            on: () => {
                if (
                    !isInDatalayerEvent(
                        '25',
                        'powa-9062483a-1cd9-4a5d-8656-380f2b675abf-0'
                    )
                ) {
                    addToDataLayer(
                        '25',
                        'tituloVideo',
                        'powa-9062483a-1cd9-4a5d-8656-380f2b675abf-0'
                    );
                }
            }
        };

        setProgressEvent(player, '', '');

        expect(window.dataLayer).toStrictEqual([
            {
                event: '25',
                videoID: 'powa-9062483a-1cd9-4a5d-8656-380f2b675abf-0',
                videoName: 'tituloVideo'
            }
        ]);
    });

    it('should test setVideoEvents function', () => {
        const event = {
            detail: {
                id: 'powa-9062483a-1cd9-4a5d-8656-380f2b675abf-0',
                powa: { on: jest.fn() }
            }
        };

        expect(
            setVideoEvents(
                event,
                'powa-9062483a-1cd9-4a5d-8656-380f2b675abf-0',
                'tituloId',
                false
            )
        ).toStrictEqual(null);
    });
});
