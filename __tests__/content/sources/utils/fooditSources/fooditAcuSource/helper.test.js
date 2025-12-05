import get from '../../../../../../components/private/common/utils/get';
import { addResizedUrls } from '../../../../../../components/private/common/utils/image/resizer/addResizerUrls';
import { transformFooditAcu } from '../../../../../../content/sources/utils/fooditSources/acuArticleSourceV2/helper';
import {
    getImageConfig,
    getArticleSubtype
} from '../../../../../../content/sources/utils/fooditSources/fooditArticleSource';
import { getAllImagesAuth } from '../../../../../../content/sources/utils/signingServiceSource/getImagesAuth';

jest.mock(
    '../../../../../../content/sources/utils/signingServiceSource/getImagesAuth'
);
jest.mock('../../../../../../components/private/common/utils/get');
jest.mock(
    '../../../../../../components/private/common/utils/image/resizer/addResizerUrls'
);
jest.mock(
    '../../../../../../content/sources/utils/fooditSources/fooditArticleSource'
);

describe('Content - Sources - Utils - FooditSources - transformFooditAcu', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        console.error = jest.fn();
    });

    it('should handle promise rejection gracefully', async () => {
        const response = {
            content_elements: [
                { id: 1, promo_items: {} },
                { id: 2, promo_items: {} }
            ]
        };

        const query = { 'arc-site': 'foodit' };
        const cachedCall = jest.fn();

        getAllImagesAuth.mockImplementation((elem, cachedCall) => {
            if (elem.id === 1) {
                return Promise.reject(new Error('Error fetching images'));
            }
            return Promise.resolve({ image: 'auth-image' });
        });

        addResizedUrls.mockReturnValue({});
        getArticleSubtype.mockReturnValue('default-subtype');
        getImageConfig.mockReturnValue({});
        get.mockReturnValue('subtype');

        const result = await transformFooditAcu(response, query, cachedCall);

        expect(result).toEqual({
            ...response,
            content_elements: [
                {
                    ...response.content_elements[0],
                    promo_items: {}
                },
                {
                    ...response.content_elements[1],
                    image: 'auth-image',
                    promo_items: {}
                }
            ]
        });

        expect(getAllImagesAuth).toHaveBeenCalledWith(
            response.content_elements[0],
            cachedCall
        );
        expect(getAllImagesAuth).toHaveBeenCalledWith(
            response.content_elements[1],
            cachedCall
        );
        expect(console.error).toHaveBeenCalledWith(
            'fooditAcuSource - transformFooditAcu - getImagesAuth error',
            expect.any(Error)
        );
    });

    it('should transform all elements correctly when promises resolve', async () => {
        const response = {
            content_elements: [
                { id: 1, promo_items: {} },
                { id: 2, promo_items: {} }
            ]
        };

        const query = { 'arc-site': 'foodit' };
        const cachedCall = jest.fn();

        getAllImagesAuth.mockResolvedValue({ image: 'auth-image' });
        addResizedUrls.mockReturnValue({
            resizedUrls: ['resizedUrl', 'resizedUrl2']
        });
        getArticleSubtype.mockReturnValue('default-subtype');
        getImageConfig.mockReturnValue({ config: 'config' });
        get.mockReturnValue('subtype');

        const result = await transformFooditAcu(response, query, cachedCall);

        expect(result).toEqual({
            ...response,
            content_elements: [
                {
                    ...response.content_elements[0],
                    image: 'auth-image',
                    promo_items: {},
                    resizedUrls: ['resizedUrl', 'resizedUrl2']
                },
                {
                    ...response.content_elements[1],
                    image: 'auth-image',
                    promo_items: {},
                    resizedUrls: ['resizedUrl', 'resizedUrl2']
                }
            ]
        });

        expect(getAllImagesAuth).toHaveBeenCalledWith(
            response.content_elements[0],
            cachedCall
        );
        expect(getAllImagesAuth).toHaveBeenCalledWith(
            response.content_elements[1],
            cachedCall
        );
    });
});
