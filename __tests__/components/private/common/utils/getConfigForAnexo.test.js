import getConfigForAnexo from '../../../../../components/private/common/utils/getConfigForAnexo';

describe('getConfigForAnexo must throw the correct config for anexo', () => {
    const anexoinferior =
        'https://especialeslntools.lanacion.com.ar/generic-anexo_confianza/index.html|250px';
    const anexosuperior = '';

    const anexoinferior2 =
        'https://especialeslntools.lanacion.c     om.ar/generic-anex o_confianza/ index.html|   250  px';
    const anexosuperior2 =
        'https://especialeslntools.lanacion.com.ar/generic-anexo_confianza/index.html|450px';

    it('Expect the config for anexo or an empty string, also must erase the white spaces', () => {
        const anexoSuperiorConfig1 = getConfigForAnexo(anexosuperior);
        const anexoSuperiorConfig2 = getConfigForAnexo(anexosuperior2);
        const anexoInferiorConfig1 = getConfigForAnexo(anexoinferior);
        const anexoInferiorConfig2 = getConfigForAnexo(anexoinferior2);

        expect(anexoSuperiorConfig1.anexoUrl).toBe('');

        expect(anexoSuperiorConfig1.anexoHeight).toBe('');

        expect(anexoSuperiorConfig2.anexoUrl).toBe(
            'https://especialeslntools.lanacion.com.ar/generic-anexo_confianza/index.html'
        );

        expect(anexoSuperiorConfig2.anexoHeight).toBe('450px');

        expect(anexoInferiorConfig1.anexoUrl).toBe(
            'https://especialeslntools.lanacion.com.ar/generic-anexo_confianza/index.html'
        );

        expect(anexoInferiorConfig1.anexoHeight).toBe('250px');

        expect(anexoInferiorConfig2.anexoUrl).toBe(
            'https://especialeslntools.lanacion.com.ar/generic-anexo_confianza/index.html'
        );

        expect(anexoInferiorConfig2.anexoHeight).toBe('250px');
    });
});
