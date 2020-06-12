import get from 'lodash.get';
import articleFull from '../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA4.json';
import Categoria from '../../../../../../../components/private/LN/api/v1/nota/relacionados/categoria';

describe('Test de JSON de tags en article', () => {
    //Se puede retirar el foreach, ya que no tiene mucha cienca las categorias
    it('Elementos de categorias', () => {
        const categoriesArticle = get(articleFull, 'taxonomy.sections');
        categoriesArticle.forEach(e => {
            const categoriaNote = Categoria(e);
            expect(categoriaNote.id).toBe(e._id);
            expect(categoriaNote.valor).toBe(e.name);
            expect(categoriaNote.nivel).toBe(
                e._id.match(new RegExp('/', 'g')).length
            );
        });
    });

    it('Valor de categoria en caso de ser null', () => {
        const categoriaNote = Categoria(null);
        expect(categoriaNote).toBe(null);
    });
});
