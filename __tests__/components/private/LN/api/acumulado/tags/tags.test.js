import AcuTags from '../../../../../../../__mocks__/data/articleTagsCollections/tags.json';
import TagsIndex from '../../../../../../../components/private/LN/api/v1/accumulated';

describe('Test de index en Json Tags', () => {
    test('Test propiedad Tema existente', () => {
        const resp = TagsIndex(AcuTags);
        expect(resp.tema).toBeDefined();
    });

    test('Test propiedad Tags Undefined', () => {
        const resp = TagsIndex(AcuTags);
        expect(resp.tags).toBeUndefined();
    });
});
