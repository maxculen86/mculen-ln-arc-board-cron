import {
    getArticleSubtype,
    getImageConfig
} from '../../../../../../content/sources/utils/fooditSources/fooditArticleSource';
import get from '../../../../../../components/private/common/utils/get';
import { getAllImagesAuth } from '../../../../../../content/sources/utils/signingServiceSource/getImagesAuth';
import { addResizedUrls } from '../../../../../../components/private/common/utils/image/resizer/addResizerUrls';
import { transformFooditAcu } from '../../../../../../content/sources/utils/fooditSources/acuArticleSourceV2/helper';

jest.mock(
    '../../../../../../content/sources/utils/fooditSources/fooditArticleSource',
    () => ({
        getArticleSubtype: jest.fn(),
        getImageConfig: jest.fn()
    })
);

jest.mock('../../../../../../components/private/common/utils/get', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock(
    '../../../../../../content/sources/utils/signingServiceSource/getImagesAuth',
    () => ({
        getAllImagesAuth: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/common/utils/image/resizer/addResizerUrls',
    () => ({
        addResizedUrls: jest.fn()
    })
);

describe('Content - Sources - Utils - FooditSources - AcuArticleSourceV2 - transformFooditAcu', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        console.error = jest.fn();
    });

    it('should transform content elements successfully', async () => {
        const response = {
            content_elements: [
                {
                    id: 1,
                    promo_items: { basic: { url: 'test.jpg' } },
                    subtype: 'article'
                }
            ]
        };
        const query = { site: 'lanacion' };
        const cachedCall = jest.fn();

        getAllImagesAuth.mockResolvedValue({ image: 'auth-image' });
        addResizedUrls.mockReturnValue({ resizedUrls: ['resizedUrl'] });
        getArticleSubtype.mockReturnValue('article');
        getImageConfig.mockReturnValue({
            presets: { basic: { width: 800 } },
            presetsDefault: { width: 400 }
        });
        get.mockImplementation((obj, path, defaultValue) => {
            if (path === 'promo_items') return obj.promo_items;
            if (path === 'subtype') return obj.subtype;
            return defaultValue;
        });

        const result = await transformFooditAcu(response, query, cachedCall);

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
    });

    it('should handle empty content elements', async () => {
        const response = { content_elements: [] };
        const query = { site: 'lanacion' };
        const cachedCall = jest.fn();

        const result = await transformFooditAcu(response, query, cachedCall);

        expect(result).toEqual({ content_elements: [] });
        expect(getAllImagesAuth).not.toHaveBeenCalled();
        expect(addResizedUrls).not.toHaveBeenCalled();
    });

    it('should handle errors gracefully', async () => {
        const response = {
            content_elements: [
                {
                    id: 1,
                    promo_items: { basic: { url: 'test.jpg' } }
                }
            ]
        };
        const query = { site: 'lanacion' };
        const cachedCall = jest.fn();

        getAllImagesAuth.mockRejectedValue(new Error('Auth failed'));

        const result = await transformFooditAcu(response, query, cachedCall);

        expect(result).toEqual({
            content_elements: [
                {
                    id: 1,
                    promo_items: { basic: { url: 'test.jpg' } }
                }
            ]
        });
        expect(getAllImagesAuth).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 1,
                promo_items: { basic: { url: 'test.jpg' } }
            }),
            cachedCall
        );
        expect(console.error).toHaveBeenCalledWith(
            'fooditAcuSource - transformFooditAcu - getImagesAuth error',
            expect.any(Error)
        );
    });

    it('should work with default parameters', async () => {
        const response = { content_elements: [] };
        const cachedCall = jest.fn();
        const result = await transformFooditAcu(response, cachedCall);

        expect(result).toEqual({ content_elements: [] });
        expect(getAllImagesAuth).not.toHaveBeenCalled();
        expect(addResizedUrls).not.toHaveBeenCalled();
    });
});
