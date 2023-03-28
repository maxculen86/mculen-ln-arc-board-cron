import { anexoMobileBox } from '../../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN/boxes/anexoMobileBox';
import { cardAnexoItemMobile } from '../../../../../../../../../../components/private/LN/api/common/article/cardAnexo/index';

describe('anexoMobileBox LN9', () => {
    it('should return null when no articles are provided', () => {
        const element = {
            index: 29,
            type: 2,
            sectionAliasMobile: 'ln-common/anexomobile',
            information: {
                hideCaja: false,
                layout: 'grilla1',
                nameFeature: 'LN-common/anexoMobile',
                idRender: 'f0ft67VXRbWkaTp'
            },
            articles: [{}],
            configurations: {
                arcSite: 'la-nacion-ar'
            },
            sectionWeb: 'App_Anexo_1'
        };
        const featureInfo = {
            tipoSeccion: 'anexoMobile',
            idSeccion: 603
        };
        const result = anexoMobileBox(
            element,
            featureInfo,
            cardAnexoItemMobile
        );
        expect(result).toBeNull();
    });

    it('should return the first result article when one or more are provided', () => {
        const element = {
            articles: [
                {
                    url:
                        'https://especialess3.lanacion.com.ar/21/08/elecciones2021_anexo_paso/index.html',
                    alto: 200
                }
            ]
        };
        const featureInfo = {
            tipoSeccion: 'anexoMobile',
            idSeccion: 603
        };
        const result = anexoMobileBox(
            element,
            featureInfo,
            cardAnexoItemMobile
        );
        expect(result).toEqual({
            anexo: {
                url:
                    'https://especialess3.lanacion.com.ar/21/08/elecciones2021_anexo_paso/index.html',
                alto: 200
            },
            tipoSeccion: 'anexoMobile',
            idSeccion: 603
        });
    });

    it('should return null from result when the height is not provided', () => {
        const element = {
            articles: [
                {
                    url:
                        'https://especialess3.lanacion.com.ar/21/08/elecciones2021_anexo_paso/index.html'
                }
            ]
        };
        const featureInfo = {
            tipoSeccion: 'anexoMobile',
            idSeccion: 603
        };
        const result = anexoMobileBox(
            element,
            featureInfo,
            cardAnexoItemMobile
        );
        expect(result).toBeNull();
    });
});
