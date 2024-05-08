import { anexoMobileBox } from '../../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/boxes/anexoMobileBox';
import { CardAnexo as cardAnexo } from '../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/cardAnexo/index';
describe('cardAnexo v2 LN10', () => {
    it('should return null when no articles are provided', () => {
        const element = {
            articles: [{}]
        };
        const featureInfo = {
            typeSection: {
                'ln-common/anexomobile': {
                    tipoSeccion: 'anexoMobile',
                    idSeccion: 603
                }
            }
        };
        const result = anexoMobileBox(element, featureInfo, cardAnexo);
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
        const result = anexoMobileBox(element, featureInfo, cardAnexo);
        expect(result).toEqual({
            anexo: {
                src:
                    'https://especialess3.lanacion.com.ar/21/08/elecciones2021_anexo_paso/index.html',
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
        const result = anexoMobileBox(element, featureInfo, cardAnexo);
        expect(result).toBeNull();
    });

    it('should return the first result item with html content iframe', () => {
        const element = {
            articles: [
                {
                    html:
                        '<iframe width="560" height="315" src="https://www.youtube.com/embed/6tXZfcCV4ZY?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                }
            ]
        };
        const featureInfo = {
            tipoSeccion: 'anexoMobile',
            idSeccion: 603
        };
        const result = anexoMobileBox(element, featureInfo, cardAnexo);

        expect(result).toEqual({
            anexo: {
                src: 'https://www.youtube.com/embed/6tXZfcCV4ZY?controls=0',
                url: 'https://www.youtube.com/embed/6tXZfcCV4ZY?controls=0',
                alto: 300
            },
            tipoSeccion: 'anexoMobile',
            idSeccion: 603
        });
    });

    it('should return first result element with html content with high 400', () => {
        const element = {
            articles: [
                {
                    html:
                        '<style> #ln-anexo-copa-america-container{ height:180px; overflow:hidden; background-color:#f0f2f6;}@media (max-width: 768px) {#ln-anexo-copa-america-container{height:265px;}}</style><div id="ln-anexo-copa-america-container" high="300" high-mobile="400"><ln-anexo-copa-america env="dev"></ln-anexo-copa-america></div><script type="module" src="https://especialess3.lanacion.com.ar/interactivos/24/06/anexo-copa-america-2024/ln-anexo-copa-america.js" async></script>'
                }
            ]
        };
        const featureInfo = {
            tipoSeccion: 'anexoMobile',
            idSeccion: 603
        };
        const result = anexoMobileBox(element, featureInfo, cardAnexo);

        expect(result).toEqual({
            anexo: {
                src:
                    '<style> #ln-anexo-copa-america-container{ height:180px; overflow:hidden; background-color:#f0f2f6;}@media (max-width: 768px) {#ln-anexo-copa-america-container{height:265px;}}</style><div id="ln-anexo-copa-america-container" high="300" high-mobile="400"><ln-anexo-copa-america env="dev"></ln-anexo-copa-america></div><script type="module" src="https://especialess3.lanacion.com.ar/interactivos/24/06/anexo-copa-america-2024/ln-anexo-copa-america.js" async></script>',
                alto: 400
            },
            tipoSeccion: 'anexoMobile',
            idSeccion: 603
        });
    });

    it('should return first result element with html content with high 600', () => {
        const element = {
            articles: [
                {
                    html:
                        '<style> #ln-anexo-copa-america-container{ height:180px; overflow:hidden; background-color:#f0f2f6;}@media (max-width: 768px) {#ln-anexo-copa-america-container{height:265px;}}</style><div id="ln-anexo-copa-america-container" high="600"><ln-anexo-copa-america env="dev"></ln-anexo-copa-america></div><script type="module" src="https://especialess3.lanacion.com.ar/interactivos/24/06/anexo-copa-america-2024/ln-anexo-copa-america.js" async></script>'
                }
            ]
        };
        const featureInfo = {
            tipoSeccion: 'anexoMobile',
            idSeccion: 603
        };
        const result = anexoMobileBox(element, featureInfo, cardAnexo);

        expect(result).toEqual({
            anexo: {
                src:
                    '<style> #ln-anexo-copa-america-container{ height:180px; overflow:hidden; background-color:#f0f2f6;}@media (max-width: 768px) {#ln-anexo-copa-america-container{height:265px;}}</style><div id="ln-anexo-copa-america-container" high="600"><ln-anexo-copa-america env="dev"></ln-anexo-copa-america></div><script type="module" src="https://especialess3.lanacion.com.ar/interactivos/24/06/anexo-copa-america-2024/ln-anexo-copa-america.js" async></script>',
                alto: 600
            },
            tipoSeccion: 'anexoMobile',
            idSeccion: 603
        });
    });

    it('should return null because it does not have the high or high-mobile properties', () => {
        const element = {
            articles: [
                {
                    html:
                        '<style> #ln-anexo-copa-america-container{ height:180px; overflow:hidden; background-color:#f0f2f6;}@media (max-width: 768px) {#ln-anexo-copa-america-container{height:265px;}}</style><div id="ln-anexo-copa-america-container"><ln-anexo-copa-america env="dev"></ln-anexo-copa-america></div><script type="module" src="https://especialess3.lanacion.com.ar/interactivos/24/06/anexo-copa-america-2024/ln-anexo-copa-america.js" async></script>'
                }
            ]
        };
        const featureInfo = {
            tipoSeccion: 'anexoMobile',
            idSeccion: 603
        };
        const result = anexoMobileBox(element, featureInfo, cardAnexo);

        expect(result).toBeNull();
    });
});
