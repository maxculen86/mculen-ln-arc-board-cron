import replaceProductiveImgDomain from '../../../../../components/private/common/utils/replaceProductiveImgDomain';

jest.mock(
    'fusion:environment',
    () => ({
        __esModule: true,
        SITE_LANACION: 'https://sandbox.lanacion.com.ar'
    }),
    { virtual: true }
);

describe('Tests - function - replaceProductiveImgDomain - sandbox environment', () => {
    test('should keep productive image urls with www when SITE_LANACION is sandbox', () => {
        expect(
            replaceProductiveImgDomain(
                'https://resizer.glanacion.com/resizer/v2/productive-image.jpg?auth=test&width=300&quality=80&smart=false'
            )
        ).toStrictEqual(
            'https://www.lanacion.com.ar/resizer/v2/productive-image.jpg?auth=test&width=300&quality=80&smart=false'
        );
    });
});
