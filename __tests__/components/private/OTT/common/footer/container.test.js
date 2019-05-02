import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../../utils/testHelper';
import Footer from '../../../../../../components/private/OTT/common/footer/container';

describe('private - OTT - layouts - footer - containers - footer', () => {
    const children = <label>Soy un child</label>;
    const component = mount(<Footer>{children}</Footer>);
    const html =
        '<footer class="footer"><div class="footer__left"><div class="footer__up"><span class="seguinos"> Seguinos:</span><button class="icon-facebook" id="pie-facebook" type="button"></button><button class="icon-twitter" id="pie-twitter" type="button"></button><button class="icon-instagram" id="pie-instagram" type="button"></button><button class="icon-rss" id="pie-rss" type="button"></button></div></div><div class="footer__center"><div class="footer__up"><a href="https://micuenta.lanacion.com.ar/ayuda" target="_blank" data-event="LinkClick" data-section="FooterLN">Ayuda</a><a href="http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html" target="_blank" data-event="LinkClick" data-section="FooterLN">Mapa del sitio</a><a href="https://micuenta.lanacion.com.ar/tyc" target="_blank" data-event="LinkClick" data-section="FooterLN">Términos y condiciones</a><a href="http://www.lanacion.in/" target="_blank" data-event="LinkClick" data-section="FooterLN">¿Cómo anunciar?</a></div><div class="footer__bottom"><p class="copyright">Copyright 2019 SA LA NACION. Todos los derechos reservados</p></div></div><div class="footer__right"><div class="footer__up"><button class="icon-ios" id="pie-apple" target="_blank" type="button"></button><button class="icon-android" id="pie-android" target="_blank" type="button"></button><div class="footer__captcha"></div></div><div class="footer__bottom"><a href="http://qr.afip.gob.ar/?qr=HJMakbCpenWNdXYfqXtEDQ,," class="data-fiscal" target="_blank" data-event="LinkClick" data-section="FooterLN"></a></div></div></footer>';

    testHelper.testDoNotRenderChildren(component, 'children');

    it('testeo que contenga el html definido dentro', () => {
        testHelper.expectHTML(component, html);
    });
});
