import trasformBookmarkContent, {
    getHeightOfUrl
} from '../../../../../../components/private/common/utils/bookmark/trasformBookmarkContent';
import responseApiBookmark from '../../../../../../__mocks__/data/bookmark/responseApiBookmark.json';
import responseTransformBookmarkContent from '../../../../../../__mocks__/data/bookmark/responseTransformBookmarkContent.json';

jest.mock('fusion:environment', () => {
    return {
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com'
    };
});

describe('Tests transformBookmarkContent', () => {
    test('Return test when data exists', () => {
        expect(trasformBookmarkContent(responseApiBookmark)).toStrictEqual(
            responseTransformBookmarkContent
        );
    });

    test('Return test when data not defined', () => {
        expect(trasformBookmarkContent()).toStrictEqual([]);
    });

    test('Return test when receiving a data type other than an array', () => {
        expect(trasformBookmarkContent({})).toStrictEqual([]);
    });
});

describe('Tests getHeightOfUrl', () => {
    const url =
        'https://resizer.glanacion.com/resizer/lW7qG2X_dHzU9b8TF0x9bIRQlTk=/351x234/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/5UH2M5EWTZBIJE6LCGMRZCUEW4.jpg';

    test('Test with correct url', () => {
        expect(getHeightOfUrl(url)).toStrictEqual(234);
    });

    test('Test when url is undefined, should return a zero', () => {
        expect(getHeightOfUrl()).toStrictEqual(0);
    });

    test('Test when the url has no measures, should return a zero', () => {
        const url =
            'https://resizer.glanacion.com/resizer/lW7qG2X_dHzU9b8TFbIRQlTk=/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/5UH2M5EWTZBIJE6LCGMRZCUEW4.jpg';

        expect(getHeightOfUrl(url)).toStrictEqual(0);
    });
});
