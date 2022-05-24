import get from '../../../../../../../components/private/common/utils/get';
import articleFull from '../../../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import {
    getSubCategory,
    getPrincipalCategory
} from '../../../../../../../components/private/LN/api/v1/common/category/index';
import articleItem from '../../../../../../../components/private/LN/api/v1/common/article';

describe('Test de JSON de tags en article', () => {
    //Se puede retirar el foreach, ya que no tiene mucha cienca las categorias
    it('Elementos de categorias migradas', () => {
        const categoriesArticle = get(articleFull, 'taxonomy.sections');

        const categoriaNote = getSubCategory(categoriesArticle[1], true);
        expect(categoriaNote.slug).toBe(categoriesArticle[1]._id);
        expect(categoriaNote.valor).toBe(categoriesArticle[1].name);
        expect(categoriaNote.nivel).toBe(
            categoriesArticle[1]._id.match(new RegExp('/', 'g')).length
        );
    });

    it('Categoria principal migrada', () => {
        const category = {
            _id: '/economia',
            _website: 'la-nacion-ar',
            additional_properties: {
                original: {}
            },
            name: 'Economía',
            parent_id: '/economia',
            path: '/economia'
        };
        const categoriaNote = getPrincipalCategory(category);
        expect(categoriaNote.slug).toBe('/economia');
        expect(categoriaNote.valor).toBe('Economía');
    });

    it('Categoria principal', () => {
        const category = {
            _id: '/recetas',
            _website: 'la-nacion-ar',
            additional_properties: {
                original: {}
            },
            name: 'Recetas',
            parent_id: '/recetas',
            path: '/recetas'
        };
        const resp = getPrincipalCategory(category);
        expect(resp.slug).toBe('/recetas');
        expect(resp.valor).toBe('Recetas');
    });

    it('Valor de categoria en caso de ser null', () => {
        const categoriaNote = getSubCategory(null);
        expect(categoriaNote).toBe(null);
    });
});
