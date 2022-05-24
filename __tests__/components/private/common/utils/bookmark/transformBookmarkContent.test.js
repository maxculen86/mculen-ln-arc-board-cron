import trasformBookmarkContent from '../../../../../../components/private/common/utils/bookmark/trasformBookmarkContent';
import responseApiBookmark from '../../../../../../__mocks__/data/bookmark/responseApiBookmark.json';
import responseTransformBookmarkContent from '../../../../../../__mocks__/data/bookmark/responseTransformBookmarkContent.json';

jest.mock('fusion:environment', () => {
    return {
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com'
    };
});

describe('Tests transformBookmarkContent', () => {
    const result = test('Return test when data exists', () => {
        expect(trasformBookmarkContent(responseApiBookmark)).toStrictEqual(
            responseTransformBookmarkContent
        );
    });

    test('Return test when data not defined', () => {
        expect(trasformBookmarkContent()).toStrictEqual([]);
    });
});
