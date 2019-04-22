import React from 'react';
import IosButton from '../../../../common/containers/iosButton';
import AndroidButton from '../../../../common/containers/androidButton';
import FacebookButton from '../../../../common/containers/facebookButton';
import TwitterButton from '../../../../common/containers/twitterButton';
import InstagramButton from '../../../../common/containers/instagramButton';
import RssButton from '../../../../common/containers/rssButton';

const LINK_LA_NACION = 'https://www.lanacion.com.ar';

export default function Footer(props) {
    return (
        <footer className="footer">
            <div className="footer__left">
                <div className="footer__up">
                    <a
                        href="http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html"
                        target="_blank"
                        data-event="LinkClick"
                        data-section="FooterLN"
                    >
                        Mapa del sitio
                    </a>
                    |
                    <a
                        href="https://micuenta.lanacion.com.ar/ayuda"
                        target="_blank"
                        data-event="LinkClick"
                        data-section="FooterLN"
                    >
                        Ayuda
                    </a>
                    |
                    <a
                        href="https://micuenta.lanacion.com.ar/tyc"
                        target="_blank"
                        data-event="LinkClick"
                        data-section="FooterLN"
                    >
                        Términos y condiciones
                    </a>
                    |
                    <a
                        href="http://www.lanacion.in/"
                        target="_blank"
                        data-event="LinkClick"
                        data-section="FooterLN"
                    >
                        ¿Cómo anunciar?
                    </a>
                </div>
                <div className="footer__bottom">
                    Descargá la APP:
                    <IosButton />
                    <AndroidButton />
                    <div className="footer__captcha">
                        <p>Protegido por reCAPTCHA:</p>
                        <a
                            href="https://policies.google.com/terms?hl=es-419"
                            target="_blank"
                            className="terminos-recaptcha"
                        >
                            Terminos y Condiciones
                        </a>
                        -
                        <a
                            href="https://policies.google.com/privacy?hl=es-419"
                            target="_blank"
                            className="privacidad-recaptcha"
                        >
                            Privacidad
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer__center">
                <div className="footer__bottom">
                    <p className="copyright">
                        Copyright {props.year} S.A. LA NACION | Todos los
                        derechos reservados
                    </p>
                </div>
            </div>
            <div className="footer__right">
                <div className="footer__up">
                    <span className="seguinos"> SEGUINOS</span>
                    <FacebookButton />
                    <TwitterButton />
                    <InstagramButton />
                    <RssButton />
                </div>
                <div className="footer__bottom">
                    <span className="gda" />
                    <p>Miembro de GDA. Grupo de Diarios América</p>
                    <a
                        href="http://qr.afip.gob.ar/?qr=HJMakbCpenWNdXYfqXtEDQ,,"
                        className="data-fiscal"
                        target="_blank"
                        data-event="LinkClick"
                        data-section="FooterLN"
                    />
                </div>
            </div>
        </footer>
    );
}
