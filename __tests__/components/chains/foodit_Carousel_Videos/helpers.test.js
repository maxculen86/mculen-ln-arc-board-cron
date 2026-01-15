import {
    handleEventVideoView,
    registeredVideoIds
} from '../../../../components/chains/foodit_Carousel_Videos/_helper';
import { addEventToDataLayerV2 } from '../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('foodit_Carousel_Videos helpers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        registeredVideoIds.clear();
    });

    describe('handleEventVideoView', () => {
        it('should push video_view event to dataLayer when video is viewed', () => {
            const videoIdObserved = 'video123';
            const videoTitle = 'Test Video Title';

            handleEventVideoView({ videoIdObserved, videoTitle });

            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'video_view',
                contentType: 'video_story',
                origin: 'home',
                rest: {
                    page_title: videoTitle,
                    id_video: videoIdObserved
                }
            });
        });

        it('should not push duplicate events for the same video', () => {
            const videoIdObserved = 'video123';
            const videoTitle = 'Test Video Title';

            handleEventVideoView({ videoIdObserved, videoTitle });
            handleEventVideoView({ videoIdObserved, videoTitle });

            expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
        });

        it('should push events for different videos', () => {
            handleEventVideoView({
                videoIdObserved: 'video1',
                videoTitle: 'Video 1'
            });
            handleEventVideoView({
                videoIdObserved: 'video2',
                videoTitle: 'Video 2'
            });

            expect(addEventToDataLayerV2).toHaveBeenCalledTimes(2);
        });

        it('should register video id in the Set', () => {
            const videoIdObserved = 'newVideo';

            handleEventVideoView({
                videoIdObserved,
                videoTitle: 'New Video'
            });

            expect(registeredVideoIds.has(videoIdObserved)).toBe(true);
        });

        it('should not push event if video id is already registered', () => {
            const videoIdObserved = 'existingVideo';
            registeredVideoIds.add(videoIdObserved);

            handleEventVideoView({
                videoIdObserved,
                videoTitle: 'Existing Video'
            });

            expect(addEventToDataLayerV2).not.toHaveBeenCalled();
        });
    });
});
