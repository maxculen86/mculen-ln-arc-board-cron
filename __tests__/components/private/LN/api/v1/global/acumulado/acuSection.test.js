import AcuIndex from '../../../../../../../../components/private/LN/api/v1/global/accumulated';

describe('Test de index en Json acumulado', () => {
    const dataMock = {
        name: 'Acu Test',
        articles: [],
        paginator: 5,
        total: 100,
        configuration: {
            header_class_name: '--light',
            background_color: '#6092CD',
            navigation_color: '#FFFFFF',
            navigation_color_tags: '#FFFFFF',
            id_logo_image: '3OZ4BBHM6RAGZNU2GHAQ3P4SHA'
        }
    };

    const dataMockNoConfiguration = {
        name: 'Acu Test',
        articles: [],
        paginator: 5,
        total: 100
    };

    test('Test render', () => {
        const resp = AcuIndex(dataMock);
        expect(resp.paginar).toBe(true);
        expect(resp.titulo).toBe(dataMock.name);
        expect(resp.configuracion.headerClass).toBe(
            dataMock.configuration.header_class_name
        );
        expect(resp.configuracion.backgroundColor).toBe(
            dataMock.configuration.background_color
        );
        expect(resp.configuracion.navigationColor).toBe(
            dataMock.configuration.navigation_color
        );
        expect(resp.configuracion.colorTags).toBe(
            dataMock.configuration.navigation_color_tags
        );
        expect(resp.configuracion.imagen).toBe(
            dataMock.configuration.id_logo_image
        );
    });

    test('Test render', () => {
        const resp = AcuIndex(dataMockNoConfiguration);
        expect(resp.configuracion).toBeUndefined();
    });
});
