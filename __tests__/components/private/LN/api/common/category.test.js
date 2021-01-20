import get from 'lodash.get';
import env from '../../../../../../__mocks__/fusion:environment';
import articleFull from '../../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import {
    getSubCategory,
    getPrincipalCategory
} from '../../../../../../components/private/LN/api/v1/common/category';
import articleItem from '../../../../../../components/private/LN/api/v1/common/articles/index';
import {
    getCategory,
    isMigratedCategory
} from '../../../../../../components/private/common/utils/migratedCategoriesHelper';

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

    it('Elementos de categorias migradas', () => {
        const categoriesArticle = get(articleFull, 'taxonomy.sections');

        const categoriaNote = getSubCategory(categoriesArticle[1], false);
        expect(categoriaNote.id).toBe(68);
        expect(categoriaNote.valor).toBe('Ajedrez');
        expect(categoriaNote.nivel).toBe(2);
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
        expect(resp.id).toBe(43);
        expect(resp.valor).toBe('Recetas');
    });

    it('Valor de categoria en caso de ser null', () => {
        const categoriaNote = getSubCategory(null);
        expect(categoriaNote).toBe(null);
    });

    it('Test para validar si categoria enviada a IsMigratedCategory existe', () => {
        const category = {
            _id: '/categoria-inexistente',
            _website: 'la-nacion-ar',
            additional_properties: {
                original: {}
            },
            name: 'Categoria Inexistente',
            parent_id: '/categoria-inexistente',
            path: '/categoria-inexistente'
        };
        try {
            const resp = getPrincipalCategory(category);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe(
                `La categoria '/categoria-inexistente' no existe en el diccionario`
            );
        }
    });

    it('Test para validar si categoria enviada a getCategory existe', () => {
        const category = {
            _id: '/categoria-inexistente',
            _website: 'la-nacion-ar',
            additional_properties: {
                original: {}
            },
            name: 'Categoria Inexistente',
            parent_id: '/categoria-inexistente',
            path: '/categoria-inexistente'
        };
        try {
            const resp = getSubCategory(category, false);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe(
                `La categoria '/categoria-inexistente' no existe en el diccionario`
            );
        }
    });

    it('Test para validar si se envia null al buscador de categorias secundarias', () => {
        try {
            const resp = getCategory(null, false);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe(`No se admiten categorias null`);
        }
    });

    it('Test para validar si se envia null al buscador de categorias principal', () => {
        try {
            const resp = getCategory(null, true);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe(`No se admiten categorias null`);
        }
    });

    it('Test para validar categorias secundarias mal formateadas', () => {
        try {
            const resp = isMigratedCategory('categoria-inexistente', false);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe(
                `La categoria 'categoria-inexistente' no existe en el diccionario`
            );
        }
    });

    it('Test para validar categorias principales mal formateadas', () => {
        try {
            const resp = isMigratedCategory('categoria-inexistente', true);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe(
                `La categoria 'categoria-inexistente' no existe en el diccionario`
            );
        }
    });

    it('Test para validar categorias secundarias sin enviar parametro', () => {
        const resp = isMigratedCategory('/recetas');
        expect(resp).toBe(false);
    });
});
