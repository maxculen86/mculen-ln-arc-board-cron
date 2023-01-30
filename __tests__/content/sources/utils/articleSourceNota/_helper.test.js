import {
    addHttpsInterstitialLink,
    addHttpsLinkInParagraphs
} from '../../../../../content/sources/utils/articleSourceNota/_helper';

describe('Tests addHttpsInterstitialLink function', () => {
    it('Should return https when the url has http', () => {
        expect(
            addHttpsInterstitialLink(
                'http://www.lanacion.com.ar/sabado/en-florida-la-isla-deshabitada-y-paradisiaca-que-cautiva-a-los-turistas-nid07012023/'
            )
        ).toStrictEqual(
            'https://www.lanacion.com.ar/sabado/en-florida-la-isla-deshabitada-y-paradisiaca-que-cautiva-a-los-turistas-nid07012023/'
        );
    });

    it('Should return https when the url has no protocol', () => {
        expect(
            addHttpsInterstitialLink(
                '//www.lanacion.com.ar/sabado/en-florida-la-isla-deshabitada-y-paradisiaca-que-cautiva-a-los-turistas-nid07012023/'
            )
        ).toStrictEqual(
            'https://www.lanacion.com.ar/sabado/en-florida-la-isla-deshabitada-y-paradisiaca-que-cautiva-a-los-turistas-nid07012023/'
        );
    });

    it('Should return the url exactly the same when it has https', () => {
        expect(
            addHttpsInterstitialLink(
                'https://www.lanacion.com.ar/sabado/en-florida-la-isla-deshabitada-y-paradisiaca-que-cautiva-a-los-turistas-nid07012023/'
            )
        ).toStrictEqual(
            'https://www.lanacion.com.ar/sabado/en-florida-la-isla-deshabitada-y-paradisiaca-que-cautiva-a-los-turistas-nid07012023/'
        );
    });
});

describe('Tests addHttpsLinkInParagraphs function', () => {
    it('Should return https when the url has no protocol', () => {
        expect(
            addHttpsLinkInParagraphs(
                'Agregar este almíbar a las claras mientras se van batiendo por unos 7 minutos. Luego colocar un papel film en <a href="//lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">contacto</a>.'
            )
        ).toStrictEqual(
            'Agregar este almíbar a las claras mientras se van batiendo por unos 7 minutos. Luego colocar un papel film en <a href="https://lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">contacto</a>.'
        );
    });

    it('Should return https when the url has http', () => {
        expect(
            addHttpsLinkInParagraphs(
                'Agregar este almíbar a las claras mientras se van batiendo por unos 7 minutos. Luego colocar un papel film en <a href="http://lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">contacto</a>.'
            )
        ).toStrictEqual(
            'Agregar este almíbar a las claras mientras se van batiendo por unos 7 minutos. Luego colocar un papel film en <a href="https://lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">contacto</a>.'
        );
    });

    it('Should return https when you succeed more than two urls without protocol or with http', () => {
        expect(
            addHttpsLinkInParagraphs(
                'Cuando se lleva el relleno a la masa, es <a href="http://www.lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">conveniente</a> colocar una base de almendras trituradas para evitar que el merengue se <a href="//www.lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">deslice</a>.'
            )
        ).toStrictEqual(
            'Cuando se lleva el relleno a la masa, es <a href="https://www.lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">conveniente</a> colocar una base de almendras trituradas para evitar que el merengue se <a href="https://www.lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">deslice</a>.'
        );
    });

    it('Should return the url exactly the same when it has https', () => {
        expect(
            addHttpsLinkInParagraphs(
                'Agregar este almíbar a las claras mientras se van batiendo por unos 7 minutos. Luego colocar un papel film en <a href="https://lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">contacto</a>.'
            )
        ).toStrictEqual(
            'Agregar este almíbar a las claras mientras se van batiendo por unos 7 minutos. Luego colocar un papel film en <a href="https://lanacion.com.ar/sabado/esta-prohibido-en-18-paises-pero-lograron-recrear-este-controversial-alimento-y-ya-es-un-hit-en-nid20012023/" target="_blank">contacto</a>.'
        );
    });
});
