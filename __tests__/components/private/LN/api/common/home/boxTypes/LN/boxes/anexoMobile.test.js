import { anexoMobileBox } from '../../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN/boxes/anexoMobileBox';

describe('anexoMobileBox', () => {
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
            articles: [
                {
                    url:
                        'https://especialess3.lanacion.com.ar/21/08/elecciones2021_anexo_paso/index.html',
                    alto: 200,
                    additionalProperties: {
                        originPosition: 'T1',
                        diseno: null,
                        nameFeature: null,
                        idRender: null
                    }
                }
            ],
            configurations: {
                arcSite: 'la-nacion-ar'
            },
            sectionWeb: 'App_Anexo_1'
        };
        const featureInfo = {
            typeSection: {
                'ln-common/anexomobile': {
                    tipoSeccion: 'anexoMobile',
                    idSeccion: 603
                }
            }
        };
        const result = anexoMobileBox(element, featureInfo);
        expect(result).toBeNull();
    });

    it('should return the first result article when one or more are provided', () => {
        const element = {
            articles: [
                {
                    /* article object */
                }
            ]
        };
        const featureInfo = {
            /* feature info object */
        };
        const result = anexoMobileBox(element, featureInfo);
        expect(result).toEqual({
            /* expected result object with anexo property */
        });
    });
});
