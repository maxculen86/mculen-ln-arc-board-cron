import getPresets from '../../../../../content/sources/utils/presets';
import transformData from '../../../../../content/sources/utils/relatedContentSource/_helper';
import { getAllImagesAuth } from '../../../../../content/sources/utils/signingServiceSource/getImagesAuth';
import { addResizedUrls } from '../../../../../components/private/common/utils/image/resizer/addResizerUrls';
import relatedContentSource from '../../../../../__mocks__/data/relatedContentSource/relatedContentSource.json';

jest.mock(
    '../../../../../components/private/common/utils/image/resizer/addResizerUrls',
    () => ({
        addResizedUrls: jest.fn()
    })
);
jest.mock('../../../../../content/sources/utils/presets', () => jest.fn());
jest.mock(
    '../../../../../content/sources/utils/signingServiceSource/getImagesAuth',
    () => ({
        getAllImagesAuth: jest.fn()
    })
);

describe('transformData', () => {
    const query = {
        id: 'XL4ECIXVXFDPHMKFC3GBVG5IOQ',
        imageConfig: 'boxArticles',
        'arc-site': 'la-nacion-ar'
    };
    const cachedCall = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return an empty array if response.basic is not defined', async () => {
        const result = await transformData({}, query, cachedCall);
        expect(result).toEqual([]);
    });

    it('should filter only published items and limit to 3', async () => {
        const response = relatedContentSource;
        getPresets.mockReturnValue({
            presets: { promo_items: 'mockPresets' },
            presetsDefault: 'defaultPresets'
        });
        getAllImagesAuth.mockResolvedValue({});
        addResizedUrls.mockReturnValue({ resized: true });

        const result = await transformData(response, query, cachedCall);

        expect(result.length).toBe(3);
        expect(result[0]._id).toBe('R2CCFG4D6JCOBLK7A73DHEDPAQ');
        expect(result[1]._id).toBe('RVR3C77WONFPLOKRN745LBQR7Q');
        expect(result[2]._id).toBe('E24CB2BRBNDFPOROFQ7HNHGDPA');
    });

    it('should transform all elements correctly when promises resolve', async () => {
        const responseMock = {
            basic: [
                {
                    revision: { published: true },
                    promo_items: 'mockItems',
                    credits: 'mockCredits'
                }
            ]
        };

        getPresets.mockReturnValue({
            presets: { promo_items: 'presetItems' },
            presetsDefault: 'defaultPresets'
        });
        getAllImagesAuth.mockResolvedValue({ image: 'auth-image' });
        addResizedUrls.mockReturnValue({
            resizedUrls: ['resizedUrl']
        });

        const result = await transformData(responseMock, query, cachedCall);

        expect(result).toEqual([
            {
                credits: 'mockCredits',
                image: 'auth-image',
                promo_items: 'mockItems',
                resizedUrls: ['resizedUrl'],
                revision: { published: true }
            }
        ]);
    });
});
