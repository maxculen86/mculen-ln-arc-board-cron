import { getImageData } from '../../../../../../../components/features/LN/common/image/_helpers/getImageData';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../../../../components/private/LN/common/utils/mediaHelper';

jest.mock(
    '../../../../../../../components/private/LN/common/utils/mediaHelper',
    () => ({
        getImagesToLoadWithPicture: jest.fn(),
        getShortestImage: jest.fn()
    })
);

describe('components - features - LN - common - image - _helpers - getImageData', () => {
    const dataMock = {
        _id: 'OKE6DQX7ANFLXILFX363CZCMUU',
        height: 100,
        width: 800,
        url: 'https://sandbox-resizer.glanacion.com/resizer/v2/OKE6DQX7ANFLXILFX363CZCMUU.png?width=768',
        resized_urls: [
            {
                option: {
                    height: 520,
                    media_preload: '(min-width: 768px)',
                    minScreenWidth: 768,
                    width: 780
                },
                resizedUrl:
                    'https://sandbox-resizer.glanacion.com/resizer/v2/OKE6DQX7ANFLXILFX363CZCMUU.png?auth=ff7acff1f516bd0e275e0a3c3b624921bcd7b57f96e0417ca5138d7b7db069d8&width=780&height=98&quality=70&smart=true'
            },
            {
                option: {
                    height: 280,
                    media_preload: '(max-width: 767px)',
                    width: 420
                },
                resizedUrl:
                    'https://sandbox-resizer.glanacion.com/resizer/v2/OKE6DQX7ANFLXILFX363CZCMUU.png?auth=ff7acff1f516bd0e275e0a3c3b624921bcd7b57f96e0417ca5138d7b7db069d8&width=420&height=53&quality=70&smart=true'
            }
        ]
    };

    const pictureSourcesMock = [
        {
            minWidth: 768,
            srcSet: 'https://sandbox-resizer.glanacion.com/resizer/v2/OKE6DQX7ANFLXILFX363CZCMUU.png?auth=ff7acff1f516bd0e275e0a3c3b624921bcd7b57f96e0417ca5138d7b7db069d8&width=780&height=98&quality=70&smart=true'
        }
    ];

    const resizedUrlMock =
        'https://sandbox-resizer.glanacion.com/resizer/v2/OKE6DQX7ANFLXILFX363CZCMUU.png?auth=ff7acff1f516bd0e275e0a3c3b624921bcd7b57f96e0417ca5138d7b7db069d8&width=420&height=53&quality=70&smart=true';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return image data using resizedUrl and pictureSources', () => {
        getShortestImage.mockReturnValue({
            resizedUrl: resizedUrlMock
        });

        getImagesToLoadWithPicture.mockReturnValue(pictureSourcesMock);

        const result = getImageData(dataMock);

        expect(getShortestImage).toHaveBeenCalledWith(dataMock.resized_urls);
        expect(getImagesToLoadWithPicture).toHaveBeenCalledWith(
            false,
            dataMock.resized_urls
        );

        expect(result).toEqual({
            src: resizedUrlMock,
            width: 800,
            height: 100,
            alt: '',
            pictureSources: pictureSourcesMock
        });
    });

    it('falls back to original url when getShortestImage does not return resizedUrl', () => {
        getShortestImage.mockReturnValue({});
        getImagesToLoadWithPicture.mockReturnValue(pictureSourcesMock);

        const result = getImageData(dataMock);

        expect(result.src).toBe(dataMock.url);
    });

    it('returns null when data is undefined', () => {
        expect(getImageData()).toBeNull();
    });

    it('returns null when data.url is missing', () => {
        expect(getImageData({})).toBeNull();
    });

    it('uses alt_text over caption and titleText', () => {
        getShortestImage.mockReturnValue({ resizedUrl: resizedUrlMock });
        getImagesToLoadWithPicture.mockReturnValue([]);

        const dataWithAlt = {
            ...dataMock,
            alt_text: 'Alt text',
            caption: 'Caption text',
            titleText: 'Title text'
        };

        const result = getImageData(dataWithAlt);

        expect(result.alt).toBe('Alt text');
    });

    it('uses caption when alt_text is missing', () => {
        getShortestImage.mockReturnValue({ resizedUrl: resizedUrlMock });
        getImagesToLoadWithPicture.mockReturnValue([]);

        const dataWithCaption = {
            ...dataMock,
            caption: 'Caption text',
            titleText: 'Title text'
        };

        const result = getImageData(dataWithCaption);

        expect(result.alt).toBe('Caption text');
    });

    it('uses titleText when alt_text and caption are missing', () => {
        getShortestImage.mockReturnValue({ resizedUrl: resizedUrlMock });
        getImagesToLoadWithPicture.mockReturnValue([]);

        const dataWithTitle = {
            ...dataMock,
            titleText: 'Title text'
        };

        const result = getImageData(dataWithTitle);

        expect(result.alt).toBe('Title text');
    });
});
