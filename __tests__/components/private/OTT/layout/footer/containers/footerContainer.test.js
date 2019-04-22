import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../../../utils/testHelper';
import Footer from '../../../../../../../components/private/OTT/layouts/footer/containers/footer';

describe('private - OTT - layouts - footer - containers - footer', () => {
    const children = <label>Soy un child</label>;
    const component = mount(<Footer>{children}</Footer>);
    const html =
        '<footer class="footer"><div class="footer__left"><div class="footer__up"><a href="http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html" target="_blank" data-event="LinkClick" data-section="FooterLN">Mapa del sitio</a>|<a href="https://micuenta.lanacion.com.ar/ayuda" target="_blank" data-event="LinkClick" data-section="FooterLN">Ayuda</a>|<a href="https://micuenta.lanacion.com.ar/tyc" target="_blank" data-event="LinkClick" data-section="FooterLN">Términos y condiciones</a>|<a href="http://www.lanacion.in/" target="_blank" data-event="LinkClick" data-section="FooterLN">¿Cómo anunciar?</a></div><div class="footer__bottom">Descargá la APP:<button class="icon-ios" id="pie-apple"></button><button class="icon-android" id="pie-android"></button><div class="footer__captcha"><p>Protegido por reCAPTCHA:</p><a href="https://policies.google.com/terms?hl=es-419" target="_blank" class="terminos-recaptcha">Terminos y Condiciones</a>-<a href="https://policies.google.com/privacy?hl=es-419" target="_blank" class="privacidad-recaptcha">Privacidad</a></div></div></div><div class="footer__center"><div class="footer__bottom"><p class="copyright">Copyright 2019 S.A. LA NACION | Todos los derechos reservados</p></div></div><div class="footer__right"><div class="footer__up"><span class="seguinos"> SEGUINOS</span><button class="icon-facebook" id="pie-facebook"></button><button class="icon-twitter" id="pie-twitter"></button><button class="icon-instagram" id="pie-instagram"></button><button class="icon-rss" id="pie-rss"></button></div><div class="footer__bottom"><span class="gda"></span><p>Miembro de GDA. Grupo de Diarios América</p><a href="http://qr.afip.gob.ar/?qr=HJMakbCpenWNdXYfqXtEDQ,," class="data-fiscal" target="_blank" data-event="LinkClick" data-section="FooterLN"></a></div></div></footer>';

    testHelper.testDoNotRenderChildren(component, 'children');

    it('testeo que contenga el html definido dentro', () => {
        testHelper.expectHTML(component, html);
    });
});
