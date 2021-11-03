import Cuerpo from '../../../../../../../../components/private/LN/api/global/v1/nota/cuerpo';
import ArticleSinCuerpo from '../../../../../../../../__mocks__/data/nota/cuerpo/notaSinCuerpo.json';
import ArticleInfografia from '../../../../../../../../__mocks__/data/nota/cuerpo/notaInfografia.json';
import ArticleCuerpo from '../../../../../../../../__mocks__/data/nota/cuerpo/notaCuerpo.json';
import ArticleHtml from '../../../../../../../../__mocks__/data/nota/cuerpo/notaHtml.json';
import ArticleFotoAlCien from '../../../../../../../../__mocks__/data/nota/cuerpo/notaFotoAlCien.json';
import ArticleSubtypeInexistente from '../../../../../../../../__mocks__/data/nota/cuerpo/notaSubtypeInexistente.json';
import { removeEmptyItems } from '../../../../../../../../components/private/LN/api/common/utils/responseCleaner';

describe('Test Json Text del cuerpo de la nota', () => {
    it('Test para validar si el cuerpo es null', () => {
        try {
            const resp = Cuerpo(ArticleSinCuerpo);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe('Esta nota no posee cuerpo');
        }
    });

    it('Test para template inexistente', () => {
        try {
            const resp = Cuerpo(ArticleSubtypeInexistente);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe(`El ID de template 100 no esta declarado`);
        }
    });

    it('Test para validar la cantidad de elementos del cuerpo', () => {
        const resp = Cuerpo(ArticleCuerpo);
        expect(resp.length).toBe(ArticleCuerpo.content_elements.length - 1);
    });

    it('Test para validar si es infografia el contenido debe ser igual al contenido + 1', () => {
        const originalLength = ArticleInfografia.content_elements.length;
        const resp = Cuerpo(ArticleInfografia);

        expect(resp.length).toBe(originalLength + 1);
    });

    it('Test para validar el contenido de una nota con template foto al cien', () => {
        const resp = Cuerpo(ArticleFotoAlCien);
        expect(removeEmptyItems(resp).length).toBe(8);
    });

    it('Validacion del cuerpo de una nota HtmlLibre', () => {
        const resp = Cuerpo(ArticleHtml);
        const contentHtml = Buffer.from(
            ArticleHtml.content_elements[0].content
        ).toString('base64');
        expect(resp).toBe(contentHtml);
    });
});
