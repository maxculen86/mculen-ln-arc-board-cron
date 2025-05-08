import get from '../../../../../components/private/common/utils/get';
import { getAllImagesAuth } from '../../../../../content/sources/utils/signingServiceSource/getImagesAuth';
import { addResizedUrls } from '../../../../../components/private/common/utils/image/resizer/addResizerUrls';
import getPresets from '../../../../../content/sources/utils/presets';
import transformLnAcu from '../../../../../content/sources/utils/lnAcuSources/helper';

jest.mock('../../../../../components/private/common/utils/get', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock(
    '../../../../../content/sources/utils/signingServiceSource/getImagesAuth',
    () => ({
        getAllImagesAuth: jest.fn()
    })
);

jest.mock(
    '../../../../../components/private/common/utils/image/resizer/addResizerUrls',
    () => ({
        addResizedUrls: jest.fn()
    })
);

jest.mock('../../../../../content/sources/utils/presets', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Content - Sources - Utils - LnAcuSources - transformLnAcu', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should transform content elements successfully', async () => {
        const data = {
            content_elements: [
                {
                    id: 1,
                    promo_items: { basic: { url: 'test.jpg' } },
                    subtype: 'article'
                }
            ]
        };
        const siteProps = {
            'arc-site': 'lanacion'
        };
        const cachedCall = jest.fn();

        getAllImagesAuth.mockResolvedValue({ image: 'auth-image' });
        addResizedUrls.mockReturnValue({ resizedUrls: ['resizedUrl'] });
        getPresets.mockReturnValue({
            presets: { promo_items: { basic: { width: 800 } } },
            presetsDefault: { width: 400 }
        });
        get.mockImplementation((obj, path, defaultValue) => {
            if (path === 'promo_items') return obj.promo_items;
            if (path === 'subtype') return obj.subtype;
            return defaultValue;
        });

        const result = await transformLnAcu(cachedCall, data, siteProps);

        expect(result).toEqual({
            content_elements: [
                {
                    id: 1,
                    promo_items: { basic: { url: 'test.jpg' } },
                    subtype: 'article',
                    image: 'auth-image',
                    resizedUrls: ['resizedUrl']
                }
            ]
        });

        expect(getAllImagesAuth).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 1,
                promo_items: { basic: { url: 'test.jpg' } },
                subtype: 'article'
            }),
            cachedCall
        );
        expect(addResizedUrls).toHaveBeenCalledWith(
            {
                promo_items: { basic: { url: 'test.jpg' } }
            },
            {
                presets: {
                    promoItems: { basic: { width: 800 } },
                    presetsDefault: { width: 400 }
                },
                subtype: 'article',
                arcSite: 'lanacion'
            }
        );
    });

    it('should handle empty content elements', async () => {
        const data = { content_elements: [] };
        const siteProps = { 'arc-site': 'lanacion' };
        const cachedCall = jest.fn();

        const result = await transformLnAcu(cachedCall, data, siteProps);

        expect(result).toEqual({ content_elements: [] });
        expect(getAllImagesAuth).not.toHaveBeenCalled();
        expect(addResizedUrls).not.toHaveBeenCalled();
    });

    it('should handle errors gracefully', async () => {
        const data = {
            content_elements: [
                {
                    id: 1,
                    promo_items: { basic: { url: 'test.jpg' } }
                }
            ]
        };
        const siteProps = { 'arc-site': 'lanacion' };
        const cachedCall = jest.fn();

        getAllImagesAuth.mockRejectedValue(new Error('Auth failed'));

        await expect(
            transformLnAcu(cachedCall, data, siteProps)
        ).rejects.toThrow('Auth failed');
    });

    it('should work with default parameters', async () => {
        const cachedCall = jest.fn();
        const result = await transformLnAcu(cachedCall);

        expect(result).toEqual({ content_elements: [] });
        expect(getAllImagesAuth).not.toHaveBeenCalled();
        expect(addResizedUrls).not.toHaveBeenCalled();
    });
});
