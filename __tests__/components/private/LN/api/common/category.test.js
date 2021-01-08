import get from 'lodash.get';
import articleFull from '../../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import {
    getSubCategory,
    getPrincipalCategory
} from '../../../../../../components/private/LN/api/v1/common/category';
import articleItem from '../../../../../../components/private/LN/api/v1/common/articles/index';
import { isMigratedCategory } from '../../../../../../components/private/common/utils/migratedCategoriesHelper';

describe('Test de JSON de tags en article', () => {
    it('Elementos de categorias no migradas', () => {
        const categoriesArticle = get(articleFull, 'taxonomy.sections');
        const categoriaNote = getSubCategory(categoriesArticle[0]);
        expect(categoriaNote.id).toBe(
            categoriesArticle[0].additional_properties.original.migration
                .id_section_ln9
        );
        expect(categoriaNote.valor).toBe(categoriesArticle[0].name);
        expect(categoriaNote.nivel).toBe(
            categoriesArticle[0]._id.match(new RegExp('/', 'g')).length
        );
    });

    it('Elementos de categorias migradas', () => {
        const categoriesArticle = get(articleFull, 'taxonomy.sections');
        const categoriaNote = getSubCategory(categoriesArticle[1]);
        expect(categoriaNote.slug).toBe(categoriesArticle[1]._id);
        expect(categoriaNote.valor).toBe(categoriesArticle[1].name);
    });

    it('Elementos de categorias que no existe la propiedad migration', () => {
        try {
            const categoriesArticle = get(articleFull, 'taxonomy.sections');
            const categoriaNote = getSubCategory(categoriesArticle[2]);
            expect(categoriaNote).toBe(undefined);
        } catch (err) {
            expect(err.message).toBe(
                `La categoria '/economia' no posee la propiedad migration`
            );
        }
    });

    it('Categoria principal migrada', () => {
        const categoriesArticle = get(articleFull, 'taxonomy.primary_section');
        const categoriaNote = getPrincipalCategory(categoriesArticle);
        expect(categoriaNote.slug).toBe(categoriesArticle._id);
        expect(categoriaNote.valor).toBe(categoriesArticle.name);
    });

    it('Valor de SubCategoria en caso de ser null', () => {
        try {
            const subCategoria = getSubCategory(null);
            expect(subCategoria).toBe(null);
        } catch (err) {
            expect(err.message).toBe(
                `La SubCategoria viene en null o undefined`
            );
        }
    });

    it('Valor de categoria principal en caso de ser null', () => {
        try {
            const categoriaPrincipal = getPrincipalCategory(null);
            expect(categoriaPrincipal).toBe(null);
        } catch (err) {
            expect(err.message).toBe(
                'La categoria principal viene en null o undefined'
            );
        }
    });

    it('Test para validar categorias en null', () => {
        try {
            const migration = {
                migration: {
                    id_section_ln9: 1,
                    migrated_mob: true
                }
            };
            const resp = isMigratedCategory(null, migration);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe('La categoria viene en null o undefined');
        }
    });
});
