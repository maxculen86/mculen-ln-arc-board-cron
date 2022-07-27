import articlesRecetas from '../../../../../../../../__mocks__/data/articleCollections/recetas.json';
import AcuIndex from '../../../../../../../../components/private/LN/api/v1/mobile/accumulated/index';

describe('Banners en Json acumulado', () => {
    test('Si se recibe showBanner en false (como sucede en el feature seguir) no se deben agregar los banners', () => {
        const acuData = {
            name: 'Recetas',
            articles: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            paginator: 10,
            total: 2667,
            configuration: undefined,
            showBanner: false
        };
        const resp = AcuIndex(acuData);
        expect(resp[0].banners).toBeUndefined();
    });
    test('Si se recibe showBanner en true se deben agregar los banners', () => {
        const acuData = {
            name: 'Recetas',
            articles: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            paginator: 10,
            total: 2667,
            configuration: undefined,
            showBanner: true
        };
        const resp = AcuIndex(acuData);
        expect(resp[0].banners).toBeDefined();
    });
});
