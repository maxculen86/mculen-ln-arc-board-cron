import { fetchVideo } from '../../../../../../components/private/common/utils/video/getVideoPosterResized';
import { useContent } from 'fusion:content';
import responseVideoSource from '../../../../../../__mocks__/data/videos/responseVideoSource.json';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

describe('Test return fetchVideo', () => {
    test('Reutrn fetchVideo when id is not defined', () => {
        expect(fetchVideo(undefined)).toEqual({});
    });
    test('Return fetchVideo when id is correct', () => {
        useContent.mockReturnValueOnce(responseVideoSource);
        const videoID = '26280ea8-b29d-4961-b019-a998da7f3252';
        expect(fetchVideo(videoID)).toEqual(responseVideoSource);
    });
});
