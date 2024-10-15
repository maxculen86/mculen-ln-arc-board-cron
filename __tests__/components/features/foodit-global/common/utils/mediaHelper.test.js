import getFooditMediaContent from '../../../../../../components/features/foodit-global/common/utils/mediaHelper';
import getSourcesJw from '../../../../../../components/private/LN/common/utils/getSourcesJw';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../../../components/private/LN/common/utils/mediaHelper';

jest.mock('../../../../../../components/private/LN/common/utils/mediaHelper');
jest.mock('../../../../../../components/private/LN/common/utils/getSourcesJw');

describe('getFooditMediaContent', () => {
    const mockImage = {
        url: 'https://example.com/default-image.jpg',
        resized_urls: [
            { url: 'https://example.com/resized-image-1.jpg' },
            { url: 'https://example.com/resized-image-2.jpg' }
        ]
    };

    const mockVideo = {
        poster: 'https://example.com/video-poster.jpg',
        sources: [{ file: 'https://example.com/video-file.mp4' }]
    };

    const mockResizedImages = [
        {
            minWidth: undefined,
            maxWidth: 767,
            srcSet: 'https://example.com/resized-image-1.jpg'
        }
    ];

    beforeEach(() => {
        getImagesToLoadWithPicture.mockReturnValue(mockResizedImages);
        getShortestImage.mockReturnValue({
            resizedUrl: 'https://example.com/resized-image-1.jpg'
        });
        getSourcesJw.mockReturnValue({
            file: 'https://example.com/video-file.mp4'
        });
    });

    it('should return video content when video is provided', () => {
        const content = getFooditMediaContent({ video: mockVideo });
        expect(content).toEqual({
            mediaVariant: 'video',
            poster: mockVideo.poster,
            type: 'video',
            src: 'https://example.com/video-file.mp4'
        });
    });

    it('should return image content when image is provided', () => {
        const content = getFooditMediaContent({ image: mockImage });
        expect(content).toEqual({
            mediaVariant: 'image',
            src: 'https://example.com/resized-image-1.jpg',
            alt: '',
            sources: mockResizedImages,
            loading: 'lazy',
            fetchPriority: 'low'
        });
    });

    it('should return video content when both image and video are provided', () => {
        const content = getFooditMediaContent({
            image: mockImage,
            video: mockVideo
        });
        expect(content).toEqual({
            mediaVariant: 'video',
            poster: mockVideo.poster,
            type: 'video',
            src: 'https://example.com/video-file.mp4'
        });
    });

    it('should return empty content when neither image nor video are provided', () => {
        const content = getFooditMediaContent({});
        expect(content).toEqual({});
    });

    it('should return image content with eager loading and high priority when isOpening is true', () => {
        const content = getFooditMediaContent({
            image: mockImage,
            isOpening: true
        });
        expect(content).toEqual({
            mediaVariant: 'image',
            src: 'https://example.com/resized-image-1.jpg',
            alt: '',
            sources: mockResizedImages,
            loading: 'eager',
            fetchPriority: 'high'
        });
    });
});
