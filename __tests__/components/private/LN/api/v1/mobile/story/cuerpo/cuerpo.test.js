import Cuerpo from '../../../../../../../../../components/private/LN/api/v1/mobile/story/cuerpo';
import ArticleSinCuerpo from '../../../../../../../../../__mocks__/data/nota/cuerpo/notaSinCuerpo.json';
import ArticleInfografia from '../../../../../../../../../__mocks__/data/nota/cuerpo/notaInfografia.json';
import ArticleCuerpo from '../../../../../../../../../__mocks__/data/nota/cuerpo/notaCuerpo.json';
import ArticleHtml from '../../../../../../../../../__mocks__/data/nota/cuerpo/notaHtml.json';
import ArticleFotoAlCien from '../../../../../../../../../__mocks__/data/nota/cuerpo/notaFotoAlCien.json';
import ArticleSubtypeInexistente from '../../../../../../../../../__mocks__/data/nota/cuerpo/notaSubtypeInexistente.json';
import { removeEmptyItems } from '../../../../../../../../../components/private/LN/api/common/utils/responseCleaner';

describe('Test Json Text del cuerpo de la nota', () => {
    it('Test para validar si el cuerpo es null', () => {
        try {
            const resp = Cuerpo(ArticleSinCuerpo);
            expect(resp.elements.length).toBe(1);
        } catch (err) {
            expect(err.message).toBe('The story does not have body');
        }
    });

    it('Test para template inexistente', () => {
        try {
            const resp = Cuerpo(ArticleSubtypeInexistente);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe(`The story does not have subtype`);
        }
    });

    it('Test para validar la cantidad de elementos del cuerpo', () => {
        const resp = Cuerpo(ArticleCuerpo);
        expect(resp.elements.length).toBe(
            ArticleCuerpo.content_elements.length
        );
    });

    it('Test para validar si es infografia el contenido debe ser igual al contenido + 1', () => {
        const originalLength = ArticleInfografia.content_elements.length;
        const resp = Cuerpo(ArticleInfografia);

        expect(resp.elements.length).toBe(originalLength + 1);
    });

    it('Test para validar el contenido de una nota con template foto al cien', () => {
        const resp = Cuerpo(ArticleFotoAlCien);
        expect(removeEmptyItems(resp.elements).length).toBe(8);
    });

    it('Validacion del cuerpo de una nota HtmlLibre', () => {
        const resp = Cuerpo(ArticleHtml);
        const contentHtml = Buffer.from(
            ArticleHtml.content_elements[0].content
        ).toString('base64');
        expect(resp.elements).toBe(contentHtml);
    });

    it('Debe incluir la tabla en el cuerpo cuando exista un elemento _t = table', () => {
        const articleConTabla = {
            subtype: '1',
            content_elements: [
                { type: 'text', content: 'Primer texto' },
                {
                    type: 'table',
                    header: ['Col 1', 'Col 2'],
                    rows: [
                        ['A1', 'A2'],
                        ['B1', 'B2']
                    ]
                },
                { type: 'text', content: 'Último texto' }
            ]
        };

        const resp = Cuerpo(articleConTabla);
        const tabla = resp.elements[1];

        expect(tabla._t).toBe('table');
        expect(tabla.header).toEqual(['Col 1', 'Col 2']);
        expect(tabla.rows).toEqual([
            ['A1', 'A2'],
            ['B1', 'B2']
        ]);
    });
});
