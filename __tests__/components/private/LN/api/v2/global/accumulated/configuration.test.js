import Configuration from '../../../../../../../../components/private/LN/api/v1/common/accumulated/configuration';

describe('Test de configuracion', () => {
    const acuData = {
        configuration: {
            header_class_name: '--light',
            background_color: '#6092CD',
            navigation_color: '#FFFFFF',
            navigation_color_tags: '#FFFFFF',
            id_logo_image: '3OZ4BBHM6RAGZNU2GHAQ3P4SHA'
        }
    };
    const resp = Configuration(acuData.configuration);
    test('Test Configuracion aplicada', () => {
        expect(resp.headerClass).toBe(acuData.configuration.header_class_name);
        expect(resp.backgroundColor).toBe(
            acuData.configuration.background_color
        );
        expect(resp.navigationColor).toBe(
            acuData.configuration.navigation_color
        );
        expect(resp.colorTags).toBe(
            acuData.configuration.navigation_color_tags
        );
        expect(resp.imagen).toBe(acuData.configuration.id_logo_image);
    });
});
