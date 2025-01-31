import {
    handleEventSwipeVideo,
    registeredIdsSetAndInteractions
} from '../../../../../components/chains/LN10_Caja_Carrusel/components/helpers';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('handleEventSwipeVideo', () => {
    beforeEach(() => {
        global.registeredIdsSetAndInteractions = new Set();
        jest.clearAllMocks();
    });

    it('adds a new video event to the data layer if not already registered', () => {
        registeredIdsSetAndInteractions.add('clickEventRegistered'); // coming from the click to avoid event duplication
        registeredIdsSetAndInteractions.add('video1'); // coming from the click, video view
        const videoIdObserved = 'video2';
        const videoTitle = 'Sample Video Title';

        handleEventSwipeVideo({ videoIdObserved, videoTitle });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            contentType: 'video_story',
            event: 'video_view',
            origin: 'video_story',
            rest: {
                page_title: videoTitle,
                id_video: videoIdObserved
            }
        });
    });

    it('does not add the event if videoIdObserved is already registered', () => {
        const videoIdObserved = 'video123';
        const videoTitle = 'Sample Video Title';

        registeredIdsSetAndInteractions.add(videoIdObserved);

        handleEventSwipeVideo({ videoIdObserved, videoTitle });

        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });

    it('does not add the event if registeredId is undefined or not initialized', () => {
        global.registeredId = undefined;

        const videoIdObserved = 'video123';
        const videoTitle = 'Sample Video Title';

        handleEventSwipeVideo({ videoIdObserved, videoTitle });

        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });
});
