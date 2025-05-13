import { boxInfoComplete } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10v2/boxes/boxInfoComplete';
import configInfoSectionsByLayout from '../../../../../../../../../../components/private/LN/api/common/home/config/configInfoSectionsByLayout';

describe('boxInfoComplete test suite', () => {
    test('Should return right values', () => {
        const typeSection = configInfoSectionsByLayout('LN10-Home_Main-V2');
        const section = 'ln10_caja_manual';
        const information = {
            layout: 'bn_1_4_grid',
            link: 'https://www.lanacion.com.ar/juegos/',
            logoId: 'mockLogoId',
            buttonLogo: 'mockbuttonLogo',
            chapita: 'chapita',
            chapitaStyle: 'chapitaStyle'
        };

        const result = boxInfoComplete(information, section, typeSection);

        expect(result).toEqual({
            diagramacion: 'bn_1_4_grid',
            tipoSeccion: 'tema',
            idSeccion: 305,
            parameters: {
                badge: 'chapita',
                badgeStyle: 'chapitaStyle',
                title: '',
                url: 'https://www.lanacion.com.ar/juegos/',
                logoId: 'mockLogoId',
                buttonLogo: 'mockbuttonLogo'
            }
        });
    });
});
