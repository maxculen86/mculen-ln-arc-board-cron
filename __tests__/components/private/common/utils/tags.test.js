import {
    getOrderAndCountTags,
    transformTagsForAcu
} from '../../../../../components/private/common/utils/tags';
import mockTags from '../../../../../__mocks__/data/tags/mockTags';
import mockTransformedTags from '../../../../../__mocks__/data/tags/mockTransformedTags';

const orderedAndCountedTags = [
    { count: 3, slug: 'manteca-tid47257', text: 'Manteca' },
    { count: 2, slug: 'jugo-de-limon-tid49241', text: 'Jugo de limón' },
    { count: 2, slug: 'pollo-tid47399', text: 'pollo' },
    { count: 2, slug: 'cebolla-tid47174', text: 'Cebolla' },
    { count: 2, slug: 'frutas-tid67217', text: 'Frutas' },
    { count: 2, slug: 'yema-tid47350', text: 'Yema' },
    {
        count: 1,
        slug: 'castanas-de-caju-tid47172',
        text: 'Castañas de cajú'
    },
    { count: 1, slug: 'yogur-tid47351', text: 'Yogur' },
    { count: 1, slug: 'limon-tid47252', text: 'limón' },
    { count: 1, slug: 'pasas-de-uva-tid47291', text: 'Pasas de uva' }
];

describe('Private - Common - Utils - tags.js', () => {
    it('should test getOrderAndCountTags func', () => {
        expect(getOrderAndCountTags(mockTags)).toStrictEqual(
            orderedAndCountedTags
        );
    });
    it('should test orderAndCountTags func', () => {
        expect(transformTagsForAcu(orderedAndCountedTags, '')).toStrictEqual(
            mockTransformedTags
        );
    });
});
