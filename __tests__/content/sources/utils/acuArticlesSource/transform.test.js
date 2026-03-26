import transform from '../../../../../content/sources/utils/acuArticlesSource/transform';
import { processVolanta } from '../../../../../content/sources/utils/common/volantaHelper';

jest.mock('../../../../../content/sources/utils/common/volantaHelper');
jest.mock('fusion:properties', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue({
        imageConfig: {
            resize: {
                default: {
                    promo_items: {
                        sizes: [
                            { width: 320, height: 180 },
                            { width: 640, height: 360 }
                        ]
                    }
                }
            }
        }
    })
}));

describe('ACU Articles Transform', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should process volanta for each content element', async () => {
        const mockData = {
            content_elements: [
                {
                    headlines: { web: 'Test Headline 1' },
                    label: { text: 'Label 1' }
                },
                {
                    headlines: { web: 'Test Headline 2' },
                    label: { text: 'Label 2' }
                }
            ]
        };

        const mockSiteProps = {
            'arc-site': 'la-nacion-ar'
        };

        const mockCachedCall = jest.fn();

        processVolanta.mockImplementation(result => ({
            ...result.label,
            volanta: {
                display: true,
                text: result.headlines.web
            }
        }));

        const result = await transform(mockData, mockSiteProps, mockCachedCall);

        expect(processVolanta).toHaveBeenCalledTimes(2);
        expect(result.content_elements[0].label).toHaveProperty('volanta');
        expect(result.content_elements[1].label).toHaveProperty('volanta');
    });

    it('should handle content elements without headlines.web', async () => {
        const mockData = {
            content_elements: [
                {
                    label: { text: 'Label 1' }
                }
            ]
        };

        const mockSiteProps = {
            'arc-site': 'la-nacion-ar'
        };

        const mockCachedCall = jest.fn();

        processVolanta.mockImplementation(result => result.label);

        const result = await transform(mockData, mockSiteProps, mockCachedCall);

        expect(processVolanta).toHaveBeenCalledTimes(1);
        expect(result.content_elements[0].label).not.toHaveProperty('volanta');
    });

    it('should handle empty content elements array', async () => {
        const mockData = {
            content_elements: []
        };

        const mockSiteProps = {
            'arc-site': 'la-nacion-ar'
        };

        const mockCachedCall = jest.fn();

        const result = await transform(mockData, mockSiteProps, mockCachedCall);

        expect(processVolanta).not.toHaveBeenCalled();
        expect(result.content_elements).toEqual([]);
    });

    it('should normalize numeric_rating in the source response', async () => {
        const mockData = {
            content_elements: [
                {
                    headlines: { web: 'Test Headline 1' },
                    label: { text: 'Label 1' },
                    content_elements: [
                        { type: 'text', content: 'Primer parrafo' },
                        {
                            type: 'numeric_rating',
                            numeric_rating: 0
                        }
                    ]
                }
            ]
        };

        const mockSiteProps = {
            'arc-site': 'la-nacion-ar'
        };

        processVolanta.mockImplementation(result => result.label);

        const result = await transform(mockData, mockSiteProps, jest.fn());

        expect(result.content_elements[0].content_elements).toEqual([
            { type: 'text', content: 'Primer parrafo' },
            {
                type: 'numeric_rating',
                numeric_rating: 0.5
            }
        ]);
    });
});
