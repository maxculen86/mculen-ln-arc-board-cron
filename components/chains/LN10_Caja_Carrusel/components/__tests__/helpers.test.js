import { handleEventSwipeVideo, resetTracking } from '../helpers';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

jest.mock('../../../../private/LN/common/utils/addEventToDataLayer', () => ({
    addEventToDataLayerV2: jest.fn()
}));

describe('handleEventSwipeVideo', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        resetTracking();
    });

    it('should trigger video_view for the first video observed', () => {
        handleEventSwipeVideo({
            videoIdObserved: 'video1',
            videoTitle: 'Title 1',
            origin: 'home'
        });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'video_view',
            contentType: 'video_story',
            rest: {
                page_title: 'Title 1',
                id_video: 'video1',
                origin: 'home',
                category_video: 'No tiene'
            }
        });
    });

    it('should trigger video_view when navigating back to a previously seen video', () => {
        // Step 1: See video 1
        handleEventSwipeVideo({
            videoIdObserved: 'video1',
            videoTitle: 'Title 1',
            origin: 'home'
        });

        // Step 2: See video 2
        handleEventSwipeVideo({
            videoIdObserved: 'video2',
            videoTitle: 'Title 2',
            origin: 'home'
        });

        // Step 3: Go back to video 1
        handleEventSwipeVideo({
            videoIdObserved: 'video1',
            videoTitle: 'Title 1',
            origin: 'home'
        });

        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(3);
        expect(addEventToDataLayerV2).toHaveBeenLastCalledWith({
            event: 'video_view',
            contentType: 'video_story',
            rest: {
                page_title: 'Title 1',
                id_video: 'video1',
                origin: 'home',
                category_video: 'No tiene'
            }
        });
    });

    it('should NOT trigger video_view if videoIdObserved is the same as the last tracked one', () => {
        handleEventSwipeVideo({
            videoIdObserved: 'video1',
            videoTitle: 'Title 1',
            origin: 'home'
        });

        handleEventSwipeVideo({
            videoIdObserved: 'video1',
            videoTitle: 'Title 1',
            origin: 'home'
        });

        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
    });

    it('should handle session resets via resetTracking', () => {
        handleEventSwipeVideo({
            videoIdObserved: 'video1',
            videoTitle: 'Title 1',
            origin: 'home'
        });

        resetTracking();

        handleEventSwipeVideo({
            videoIdObserved: 'video1',
            videoTitle: 'Title 1',
            origin: 'home'
        });

        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(2);
    });

    it('should include origin in the rest object when triggered', () => {
        handleEventSwipeVideo({
            videoIdObserved: 'targetVideo',
            videoTitle: 'Target Title',
            origin: 'acu'
        });

        expect(addEventToDataLayerV2).toHaveBeenCalledWith(
            expect.objectContaining({
                rest: expect.objectContaining({
                    origin: 'acu'
                })
            })
        );
    });
});
