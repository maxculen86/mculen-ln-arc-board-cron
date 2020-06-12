import articleFull from '../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA4.json';
import Tag from '../../../../../../../components/private/LN/api/v1/nota/relacionados/tag';

import get from 'lodash.get';
import { getTagId } from '../../../../../../../components/private/common/utils/getElementId';

describe('Test de JSON de tags en article', () => {
    it('Elementos de tags', () => {
        const articleTags = get(articleFull, 'taxonomy.tags');
        articleTags.forEach(e => {
            const tagNote = Tag(e);
            expect(tagNote.id).toBe(getTagId(e.slug));
            expect(tagNote.valor).toBe(e.text);
            expect(tagNote.tipoId).toBe(1);
            expect(tagNote.formatoId).toBe(1);
            expect(tagNote.tipoDescripcion).toBe('Topico');
        });
    });

    it('Valor de tag en caso de ser null', () => {
        const tagNote = Tag(null);
        expect(tagNote).toBe(null);
    });
});
