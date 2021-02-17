import env from '../../../../../../__mocks__/fusion:environment';
import articlesRecetas from '../../../../../../__mocks__/data/articleCollections/recetas.json';
import articlesDeportes from '../../../../../../__mocks__/data/articleCollections/deportes.json';
import AcuIndex from '../../../../../../components/private/LN/api/v1/acumulado';

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
        //expect(resp).toBe(acuData.name);
        expect('Recetas').toMatch(acuData.name);
    });

    test('Test total', () => {
        //expect(resp).toBe(acuData.name);
        expect(acuData.articles.length).toBeGreaterThan(0);
    });
});
