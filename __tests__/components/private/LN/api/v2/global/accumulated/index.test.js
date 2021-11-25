import articlesRecetas from '../../../../../../../../__mocks__/data/articleCollections/recetas.json';
import AcuIndex from '../../../../../../../../components/private/LN/api/v2/global/accumulated/index';
import { getFeaturedTag } from '../../../../../../../../components/private/LN/api/v1/common/tag/index';
import ArticleTagDestacado from '../../../../../../../../__mocks__/data/nota/apertura/tagDestacado/tagDestacado.json';

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
describe('Banners en Json acumulado', () => {
    test('Si es la pagina 1 y se solicitan 10 notas se enviaran los objetos banners con id 402, 403 y 404', () => {
        const acuData = {
            name: 'Recetas',
            articles: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            paginator: 10,
            total: 2667,
            configuration: undefined
        };
        const resp = AcuIndex(acuData);
        expect(resp[0].banners.length).toBe(3);
        expect(resp[0].banners[0].idSeccion).toBe(402);
        expect(resp[0].banners[1].idSeccion).toBe(403);
        expect(resp[0].banners[2].idSeccion).toBe(404);
    });
    test('Si es la pagina 2 y se solicitan 10 notas se enviara el resto de banners faltantes 13 y 16', () => {
        const acuData = {
            name: 'Recetas',
            articles: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            paginator: 20,
            total: 2667,
            configuration: undefined
        };
        const resp = AcuIndex(acuData);
        expect(resp[0].banners.length).toBe(2);
        expect(resp[0].banners[0].idSeccion).toBe(405);
        expect(resp[0].banners[1].idSeccion).toBe(406);
    });
    test('Si es la pagina 1 y se solicitan 30 notas se enviaran todo el objeto completo', () => {
        const acuData = {
            name: 'Recetas',
            articles: [
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {}
            ],
            paginator: 30,
            total: 2667,
            configuration: undefined
        };
        const resp = AcuIndex(acuData);
        expect(resp[0].banners.length).toBe(5);
        expect(resp[0].banners[0].idSeccion).toBe(402);
        expect(resp[0].banners[1].idSeccion).toBe(403);
        expect(resp[0].banners[2].idSeccion).toBe(404);
        expect(resp[0].banners[3].idSeccion).toBe(405);
        expect(resp[0].banners[4].idSeccion).toBe(406);
    });
    test('Se enviaran banners segun notas existan. Si el acumulado solo trae 5 notas entonces solo se enviara el banner idSeccion 402', () => {
        const acuData = {
            name: 'Recetas',
            articles: [{}, {}, {}, {}, {}],
            paginator: 5,
            total: 2667,
            configuration: undefined
        };
        const resp = AcuIndex(acuData);
        expect(resp[0].banners.length).toBe(1);
        expect(resp[0].banners[0].idSeccion).toBe(402);
    });
    test('Se enviaran banners segun notas existan. Si el acumulado retorna 3 notas entonces el objeto banners no debe ser retornado.', () => {
        const acuData = {
            name: 'Recetas',
            articles: [{}, {}, {}],
            paginator: 3,
            total: 2667,
            configuration: undefined
        };
        const resp = AcuIndex(acuData);
        expect(resp[0].banners).toBeUndefined();
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
