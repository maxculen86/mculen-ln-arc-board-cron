import get from 'lodash.get';

import Relacionados from '../../../../../../../components/private/LN/api/global/v1/nota/relacionados';
import articleFull from '../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA4.json';
import articleNoElements from '../../../../../../../__mocks__/data/articles/FM2M3Y4ZXZD6VGONEPLLSQJWVA.json';
import articleRelatedNotes from '../../../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import articleRelatedNotesWithoutPrincipalCategory from '../../../../../../../__mocks__/data/articles/XCLX5M6MHJAMHIGD6S2BOF3L3Y.json';

describe('Test de JSON de relacionados en article', () => {
    it('Valor de categoria en caso de ser vacios los tags', () => {
        const resp = Relacionados(articleNoElements);
        expect(resp.tags).toBeUndefined();
    });

    it('Valor de categoria en caso de ser vacio las notas relacionados', () => {
        const resp = Relacionados(articleNoElements);
        expect(resp.categorias).toBeUndefined();
    });

    it('Valor de categoria en caso de ser vacias las categorias', () => {
        const resp = Relacionados(articleNoElements);
        expect(resp.notas).toBeUndefined();
    });

    it('Test si la longitud de las categorias tiene la longitud incluyendo la categoria principal', () => {
        const resp = Relacionados(articleFull);
        const categories = get(articleFull, 'taxonomy.sections');
        expect(resp.categorias).toHaveLength(categories.length);
    });

    it('Test si la longitud de los tags es igual', () => {
        const resp = Relacionados(articleFull);
        const tags = get(articleFull, 'taxonomy.tags');
        expect(resp.tags).toHaveLength(tags.length);
    });

    it('Test si la longitud de las notas es igual', () => {
        const resp = Relacionados(articleRelatedNotes);
        const relatedNotes = get(articleRelatedNotes, 'related_content.basic');
        expect(resp.notas).toHaveLength(relatedNotes.length - 1);
    });

    it('Validar si la categoria principal no esta en la array de categorias', () => {
        const resp = Relacionados(articleFull).categorias.map(e => e.id);
        const principalCategory = [
            get(articleFull, 'taxonomy.primary_section._id')
        ];

        expect(resp).toEqual(expect.not.arrayContaining(principalCategory));
    });

    it('Validar si la nota no posee categoria principal', () => {
        const resp = Relacionados(articleRelatedNotesWithoutPrincipalCategory);

        const relatedNotes = get(
            articleRelatedNotesWithoutPrincipalCategory,
            'taxonomy.sections'
        );

        expect(resp.categorias).toHaveLength(relatedNotes.length);
    });
});
