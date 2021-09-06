import articlesRecetas from '../../../../../../../__mocks__/data/articleCollections/recetas.json';
import AcuIndex from '../../../../../../../components/private/LN/api/v2/accumulated/index';
import { getFeaturedTag } from '../../../../../../../components/private/LN/api/common/tag/index';
import ArticleTagDestacado from '../../../../../../../__mocks__/data/nota/apertura/tagDestacado/tagDestacado.json';

describe('Test unitarios para espacio patrocinado y content lab', () => {
    it('test unitario en caso de enviar un null', () => {
        const respNull = getFeaturedTag(null);
        expect(respNull).toBe(null);
    });
    it('test datos de contentLab', () => {
        const resp = getFeaturedTag(ArticleTagDestacado[0]);
        expect(resp.formatoId).toBe(1);
        expect(resp.tipoDescripcion).toBe('contentLab');
        expect(resp.valor).toBe(
            ArticleTagDestacado[0].label.marca_anunciante.text
        );
    });
});

describe('Json Acumulado section. Test de integracion', () => {
    const acuData = {
        name: 'Recetas',
        articles: articlesRecetas,
        paginator: 100,
        total: 2667,
        configuration: undefined
    };
    const resp = AcuIndex(acuData);
    test('Test name', () => {
        expect('Recetas').toMatch(acuData.name);
    });

    test('Test total', () => {
        expect(acuData.articles.length).toBeGreaterThan(0);
        expect(resp[0].notas);
        expect(resp[0].notas[0].id).toBe('B2EMM366VFGVHEPJDUVGBLCYX4');
        expect(resp[0].notas[0].templateId).toBe('4');
        expect(resp[0].notas[0].url).toBe('/autos/test-de-generacion-de-url/');
        expect(resp[0].notas[0].titulo).toBe('Test de generacion de url');
        expect(resp[0].notas[0].bajada).toBe('subheadline');
        expect(resp[0].notas[0].marquesina).toBe(
            'Por Diego Cabot y Diego Lopez'
        );
    });
});
