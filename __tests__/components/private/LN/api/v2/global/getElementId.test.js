import { getTagId } from '../../../../../../../components/private/common/utils/getElementId';
describe('Test de getTagId', () => {
    test('Test getTagId correcto', () => {
        expect(getTagId('matias-tid47265')).toBe(47265);
    });
    test('Test getTagId correcto', () => {
        expect(getTagId('matiastid47265')).toBe(0);
    });
});
