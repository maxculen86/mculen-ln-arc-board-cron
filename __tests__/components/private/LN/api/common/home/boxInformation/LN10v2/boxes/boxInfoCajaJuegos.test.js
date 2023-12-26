import { boxInfoCajaJuegos } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10v2/boxes/boxInfoCajaJuegos';
import configInfoSectionsByLayout from '../../../../../../../../../../components/private/LN/api/common/home/config/configInfoSectionsByLayout';

describe('boxInfoCajaJuegos test suite', () => {
    test('Should return right values', () => {
        const typeSection = configInfoSectionsByLayout('LN10-Home_Main-V2');
        const section = 'ln10_caja_juegos';
        const information = {};

        const result = boxInfoCajaJuegos(information, section, typeSection);

        expect(result).toEqual({
            tipoSeccion: 'juegos',
            idSeccion: 705,
            parameters: {
                title: 'Juegos',
                url: 'https://www.lanacion.com.ar/juegos/'
            }
        });
    });

    test('Should return idSeccion 705', () => {
        const typeSection = configInfoSectionsByLayout('LN10-Home_Main-V2');
        const section = 'ln10_caja_juegos';
        const information = {};

        const result = boxInfoCajaJuegos(information, section, typeSection);

        expect(result.idSeccion).toBe(705);
    });
});
