import getAnexoConfig from '../../../../../../components/private/common/utils/anexo/getAnexoConfig';

describe('getAnexoConfig must return the corrects configurations', () => {
    // Los espacios en blanco son adrede para confirmar que la funcion getAnexoConfig los borra.
    const doubleAnexo =
        'https://espec ialesln tools.lanacion .com.ar/ge neric-  anexo _confi  anza/index.html| S | https://especialeslntools.lanacion.com.ar/generic-anexo_confianza/index.html|I';
    const singleAnexo =
        'https://especialeslntools.lanacion.com.ar/generic-anexo_confianza/index.html|S';
    const noAnexo = '';
    it('Expect to throw correct configurations for both anexos', () => {
        const anexos = getAnexoConfig(doubleAnexo);
        const { anexoSuperior, anexoInferior } = anexos;
        expect(anexoSuperior.length).toBe(2);
        expect(anexoSuperior[1]).toBe('S');
        expect(anexoInferior.length).toBe(2);
        expect(anexoInferior[1]).toBe('I');
    });
    it('Expect an empty array for anexoInferior and the correct config for anexoSuperior', () => {
        const anexos = getAnexoConfig(singleAnexo);
        const { anexoSuperior, anexoInferior } = anexos;
        expect(anexoSuperior.length).toBe(2);
        expect(anexoSuperior[1]).toBe('S');
        expect(anexoInferior.length).toBe(0);
    });
    it('Expect two empty arrays for both anexos', () => {
        const anexos = getAnexoConfig(noAnexo);
        const { anexoSuperior, anexoInferior } = anexos;
        expect(anexoSuperior.length).toBe(0);
        expect(anexoInferior.length).toBe(0);
    });
});
