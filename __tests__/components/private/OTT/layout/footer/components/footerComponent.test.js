import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../../../utils/testHelper';
import Footer from '../../../../../../../components/private/OTT/layouts/footer/components/footer';

describe('private - OTT - layouts - footer - components - footer', () => {
    const year = new Date().getFullYear();
    const children = <label>Soy un child</label>;
    const component = mount(<Footer year={year}>{children}</Footer>);
    const footer = component.find('footer');

    const html =
        '<footer class="footer"><div class="footer__left"><div class="footer__up"><span class="seguinos"> Seguinos:</span><button class="icon-facebook" id="pie-facebook"></button><button class="icon-twitter" id="pie-twitter"></button><button class="icon-instagram" id="pie-instagram"></button><button class="icon-rss" id="pie-rss"></button></div></div><div class="footer__center"><div class="footer__up"><a href="https://micuenta.lanacion.com.ar/ayuda" target="_blank" data-event="LinkClick" data-section="FooterLN">Ayuda</a><a href="http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html" target="_blank" data-event="LinkClick" data-section="FooterLN">Mapa del sitio</a><a href="https://micuenta.lanacion.com.ar/tyc" target="_blank" data-event="LinkClick" data-section="FooterLN">Términos y condiciones</a><a href="http://www.lanacion.in/" target="_blank" data-event="LinkClick" data-section="FooterLN">¿Cómo anunciar?</a></div><div class="footer__bottom"><p class="copyright">Copyright 2019 SA LA NACION. Todos los derechos reservados</p></div></div><div class="footer__right"><div class="footer__up"><button class="icon-ios" id="pie-apple" target="_blank"></button><button class="icon-android" id="pie-android" target="_blank"></button><div class="footer__captcha"></div></div><div class="footer__bottom"><a href="http://qr.afip.gob.ar/?qr=HJMakbCpenWNdXYfqXtEDQ,," class="data-fiscal" target="_blank" data-event="LinkClick" data-section="FooterLN"></a></div></div></footer>';

    it('testeo que dibuje el año pasado', () => {
        testHelper.expectProp(component, 'year', year);
    });

    it('testeo que contenga el html definido dentro', () => {
        testHelper.expectHTML(component, html);
    });

    it('testeo que se dibuje el footer y su clase', () => {
        testHelper.expectSameValue(footer.length, 1);
        const footerClass = footer.hasClass('footer');
        testHelper.expectSameValue(footerClass, true);
    });

    it('testeo que tenga 3 divs', () => {
        testHelper.expectSameValue(footer.children().length, 3);
    });

    it('testeo que cada div tenga los class que corresponde', () => {
        const div1 = footer.children().at(0);
        const div2 = footer.children().at(1);
        const div3 = footer.children().at(2);

        testHelper.expectSameValue(
            div1
                .children()
                .at(0)
                .hasClass('footer__up'),
            true
        );
        testHelper.expectSameValue(
            div2
                .children()
                .at(0)
                .hasClass('footer__up'),
            true
        );
        testHelper.expectSameValue(
            div2
                .children()
                .at(1)
                .hasClass('footer__bottom'),
            true
        );

        testHelper.expectSameValue(
            div3
                .children()
                .at(0)
                .hasClass('footer__up'),
            true
        );
        testHelper.expectSameValue(
            div3
                .children()
                .at(1)
                .hasClass('footer__bottom'),
            true
        );
    });

    it('testeo que cada div tenga la cantidad de botones que corresponde', () => {
        const div1 = footer.children().at(0);
        const div3 = footer.children().at(2);

        testHelper.expectSameValue(
            div1
                .children()
                .at(0)
                .find('button').length,
            4
        );
        testHelper.expectSameValue(
            div3
                .children()
                .at(0)
                .find('button').length,
            2
        );
    });

    it('testeo que el orden de los botones sea el definido en la maqueta', () => {
        const div1 = footer.children().at(0);
        const div3 = footer.children().at(2);

        testHelper.expectSameValue(
            div3
                .children()
                .at(0)
                .find('button')
                .at(0)
                .hasClass('icon-ios'),
            true
        );
        testHelper.expectSameValue(
            div3
                .children()
                .at(0)
                .find('button')
                .at(1)
                .hasClass('icon-android'),
            true
        );

        testHelper.expectSameValue(
            div1
                .children()
                .at(0)
                .find('button')
                .at(0)
                .hasClass('icon-facebook'),
            true
        );
        testHelper.expectSameValue(
            div1
                .children()
                .at(0)
                .find('button')
                .at(1)
                .hasClass('icon-twitter'),
            true
        );
        testHelper.expectSameValue(
            div1
                .children()
                .at(0)
                .find('button')
                .at(2)
                .hasClass('icon-instagram'),
            true
        );
        testHelper.expectSameValue(
            div1
                .children()
                .at(0)
                .find('button')
                .at(3)
                .hasClass('icon-rss'),
            true
        );
    });

    testHelper.testDoNotRenderChildren(component, 'children');
});

/*
testear que se dibuje...
-footer con su clase..
-3 divs dentro del footer con sus respectivas clases
-primer div tiene up y bottom
-segundo div tiene bottom
-tercer div tiene up y bottom
--up tiene 4 anchors
--bottom tiene 2 botones
--el up tiene los botones en el orden indicado
*/
