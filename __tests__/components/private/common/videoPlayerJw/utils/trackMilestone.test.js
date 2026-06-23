import { trackMilestone } from '../../../../../../components/private/common/videoPlayerJw/utils/helperJw';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('trackMilestone', () => {
    let sentProgressRef;

    beforeEach(() => {
        jest.clearAllMocks();
        sentProgressRef = {
            current: new Set()
        };
    });

    it('should track a new milestone and add it to sentProgressRef', () => {
        const percentage = 25;
        const videoId = '12345';
        const title = 'Test Video';

        trackMilestone({
            sentProgressRef,
            percentage,
            videoId,
            title
        });

        expect(sentProgressRef.current.has(percentage)).toBe(true);
        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: '25',
            rest: {
                videoID: '12345',
                videoName: 'Test Video'
            }
        });
    });

    it('should not track a milestone if it was already tracked', () => {
        const percentage = 50;
        const videoId = '12345';
        const title = 'Test Video';

        sentProgressRef.current.add(percentage);

        trackMilestone({
            sentProgressRef,
            percentage,
            videoId,
            title
        });

        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });

    it('should handle percentage equal to 100 as videoComplete event', () => {
        const percentage = 100;
        const videoId = '98765';
        const title = 'Another Test Video';

        trackMilestone({
            sentProgressRef,
            percentage,
            videoId,
            title
        });

        expect(sentProgressRef.current.has(100)).toBe(true);
        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'videoComplete',
            rest: {
                videoID: '98765',
                videoName: 'Another Test Video'
            }
        });
    });

    it('should fallback to empty strings if videoId and title are missing', () => {
        const percentage = 75;

        trackMilestone({
            sentProgressRef,
            percentage
        });

        expect(sentProgressRef.current.has(75)).toBe(true);
        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: '75',
            rest: {
                videoID: '',
                videoName: ''
            }
        });
    });

    it('should convert videoId and title to String if they are of other types', () => {
        const percentage = 25;
        const videoId = 99999;
        const title = true;

        trackMilestone({
            sentProgressRef,
            percentage,
            videoId,
            title
        });

        expect(sentProgressRef.current.has(25)).toBe(true);
        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: '25',
            rest: {
                videoID: '99999',
                videoName: 'true'
            }
        });
    });
});
