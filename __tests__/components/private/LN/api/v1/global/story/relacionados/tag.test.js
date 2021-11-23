import articleFull from '../../../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA4.json';
import { getTag } from '../../../../../../../../../components/private/LN/api/v1/common/tag/index';
import { getTagId } from '../../../../../../../../../components/private/common/utils/getElementId';

import get from 'lodash.get';

describe('Test de JSON de tags en article', () => {
    it('Elementos de tags', () => {
        const articleTags = get(articleFull, 'taxonomy.tags');
        articleTags.forEach(e => {
            const tagNote = getTag(e);
            expect(tagNote.id).toBe(getTagId(e.slug));
            expect(tagNote.valor).toBe(e.text);
            expect(tagNote.tipoId).toBe(1);
            expect(tagNote.formatoId).toBe(1);
            expect(tagNote.tipoDescripcion).toBe('Topico');
        });
    });

    it('Valor de tag en caso de ser null', () => {
        const tagNote = getTag(null);
        expect(tagNote).toBe(null);
    });
});
