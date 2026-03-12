import getOpeningMediaData from './getOpeningMediaData';
import * as mediaHelpers from './mediaHelpers';
import getOpeningResizedUrls from './getOpeningResizedUrls';

jest.mock('./mediaHelpers');
jest.mock('./getOpeningResizedUrls');
jest.mock('../../../../../private/LN/common/utils/mediaHelper', () => ({
    getImagesToLoadWithPicture: jest.fn(() => []),
    getShortestImage: jest.fn(() => ({}))
}));

describe('getOpeningMediaData', () => {
    beforeEach(() => {
        mediaHelpers.getOpeningMediaItems.mockReturnValue({
            desktopImageItem: {},
            mobileImageItem: {}
        });
        mediaHelpers.getNormalizedImageData.mockReturnValue({
            resizedUrls: [],
            url: '',
            caption: '',
            altText: ''
        });
        getOpeningResizedUrls.mockReturnValue([]);
    });

    it('should return diagram from custom_storytelling_opening if present', () => {
        const promoItems = {
            custom_storytelling_opening: {
                embed: {
                    config: {
                        diagram: 'image-100-title-centered'
                    }
                }
            }
        };
        const result = getOpeningMediaData(promoItems);
        expect(result.diagram).toBe('image-100-title-centered');
    });

    it('should return default diagram if custom_storytelling_opening is missing', () => {
        const promoItems = {};
        const result = getOpeningMediaData(promoItems);
        expect(result.diagram).toBe('image-100-title-below');
    });
});
