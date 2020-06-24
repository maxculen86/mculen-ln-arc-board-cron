import get from 'lodash.get';
import articleFull from '../../../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import Categoria from '../../../../../../../components/private/LN/api/v1/nota/relacionados/categoria';

describe('Test de JSON de tags en article', () => {
    //Se puede retirar el foreach, ya que no tiene mucha cienca las categorias
    it('Elementos de categorias migradas', () => {
        const categoriesArticle = get(articleFull, 'taxonomy.sections');

        const categoriaNote = Categoria(categoriesArticle[1], true);
        expect(categoriaNote.slug).toBe(categoriesArticle[1]._id);
        expect(categoriaNote.valor).toBe(categoriesArticle[1].name);
        expect(categoriaNote.nivel).toBe(
            categoriesArticle[1]._id.match(new RegExp('/', 'g')).length
        );
    });

    it('Elementos de categorias migradas', () => {
        const categoriesArticle = get(articleFull, 'taxonomy.sections');

        const categoriaNote = Categoria(categoriesArticle[1], false);
        expect(categoriaNote.id).toBe(68);
        expect(categoriaNote.valor).toBe('Ajedrez');
        expect(categoriaNote.nivel).toBe(2);
    });

    it('Valor de categoria en caso de ser null', () => {
        const categoriaNote = Categoria(null);
        expect(categoriaNote).toBe(null);
    });
});
