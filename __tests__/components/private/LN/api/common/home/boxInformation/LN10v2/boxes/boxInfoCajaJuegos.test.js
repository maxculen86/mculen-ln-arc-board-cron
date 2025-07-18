import { boxInfoCajaJuegos } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10v2/boxes/boxInfoCajaJuegos';
import configInfoSectionsByLayout from '../../../../../../../../../../components/private/LN/api/common/home/config/configInfoSectionsByLayout';

describe('boxInfoCajaJuegos test suite', () => {
    it('Should return right values', () => {
        const typeSection = configInfoSectionsByLayout('LN10-Home_Main-V2');
        const section = 'ln10_caja_juegos_v2';
        const information = {
            link: 'https://www.lanacion.com.ar/juegos/'
        };

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

    it('Should return idSeccion 705', () => {
        const typeSection = configInfoSectionsByLayout('LN10-Home_Main-V2');
        const section = 'ln10_caja_juegos_v2';
        const information = {};

        const result = boxInfoCajaJuegos(information, section, typeSection);

        expect(result.idSeccion).toBe(705);
    });

    it('Should return logoId', () => {
        const typeSection = configInfoSectionsByLayout('LN10-Home_Main-V2');
        const section = 'ln10_caja_juegos_v2';
        const information = {
            logoId: 'logo123'
        };

        const result = boxInfoCajaJuegos(information, section, typeSection);

        expect(result.idSeccion).toBe(705);
        expect(result.parameters.logoId).toBe('logo123');
    });
});
