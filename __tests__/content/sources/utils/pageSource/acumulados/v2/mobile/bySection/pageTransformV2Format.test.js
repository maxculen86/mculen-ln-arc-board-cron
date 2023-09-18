import pageTransformV2Format from '../../../../../../../../../content/sources/utils/pageSource/acumulados/v2/mobile/bySection/pageTransformV2Format';

describe('Test pages api transformation with V2 Format', () => {
    test('transform should returns metadata and items', () => {
        const pageItems = [{}, {}, {}];

        const sectionData = {
            slug: '/economia',
            aliasTitle: 'Economia'
        };

        const result = pageTransformV2Format(pageItems, sectionData);

        expect(Object.keys(result).sort()).toEqual(
            ['metadata', 'items'].sort()
        );
    });

    test('transform should return right values for metadata object', () => {
        const pageItems = [{}, {}, {}];

        const sectionData = {
            slug: '/economia',
            aliasTitle: 'Economia'
        };

        const result = pageTransformV2Format(pageItems, sectionData);

        expect(Object.keys(result.metadata).sort()).toEqual(
            ['paginate', 'title', 'category'].sort()
        );
    });
});
