import dataAuthor from '../../../../../../../__mocks__/data/author/author.json';
import articlesAuthor from '../../../../../../../__mocks__/data/author/articlesbyAuthor.json';
import AcuIndex from '../../../../../../../components/private/LN/api/global/v1/accumulated';

describe('Json Acumulado Autor. Test de integracion información Autor y Articulos del Autor', () => {
    it('Test de Acumulado Autor', () => {
        const acuDataAuthor = {
            tipoAcumulado: 3,
            name: dataAuthor[0].byline,
            articles: articlesAuthor.content_elements,
            paginator: articlesAuthor.next,
            total: articlesAuthor.count,
            author: dataAuthor[0]
        };

        const resp = AcuIndex(acuDataAuthor);
        expect(resp.tipoAcumulado).toBe(3);
        expect(resp.acumuladoTotal).toBe(
            articlesAuthor.content_elements.length
        );
        expect(resp.paginar).toBe(true);
        expect(resp.titulo).toBe('Vinciane Smeets');
        expect(resp.autor.id).toBe(9110);
        expect(resp.autor.valor).toBe('Vinciane Smeets');
    });

    it('Test de Acumulado Autor sin nombre', () => {
        const acuDataAuthor = {
            tipoAcumulado: 3,
            name: null,
            articles: articlesAuthor.content_elements,
            paginator: articlesAuthor.next,
            total: articlesAuthor.count,
            author: dataAuthor
        };
        try {
            const resp = AcuIndex(acuDataAuthor);
        } catch (err) {
            expect(err.message).toBe('Nombre de Autor Inexistente');
        }
    });
});
