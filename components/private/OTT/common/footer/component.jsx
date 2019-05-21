import React from 'react';
import IosButton from '../../../common/iosButton';
import AndroidButton from '../../../common/androidButton';
import FacebookButton from '../../../common/facebookButton';
import TwitterButton from '../../../common/twitterButton';
import InstagramButton from '../../../common/instagramButton';

export default function Footer({ year, handleOpenWindowEvent }) {
    return (
        <footer className="footer">
            <div className="footer__left">
                <div className="footer__up">
                    <span className="seguinos"> Seguinos:</span>
                    <FacebookButton
                        onClick={handleOpenWindowEvent(
                            'https://www.facebook.com/lanacionmas/'
                        )}
                    />
                    <TwitterButton
                        onClick={handleOpenWindowEvent(
                            'https://twitter.com/lanacionmas'
                        )}
                    />
                    <InstagramButton
                        onClick={handleOpenWindowEvent(
                            'https://www.instagram.com/lanacionmas'
                        )}
                    />
                </div>
            </div>
            <div className="footer__center">
                <div className="footer__up">
                    <a
                        href="https://micuenta.lanacion.com.ar/ayuda"
                        target="_blank"
                        data-event="LinkClick"
                        data-section="FooterLN"
                    >
                        Ayuda
                    </a>
                    <a
                        href="http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html"
                        target="_blank"
                        data-event="LinkClick"
                        data-section="FooterLN"
                    >
                        Mapa del sitio
                    </a>
                    <a
                        href="https://micuenta.lanacion.com.ar/tyc"
                        target="_blank"
                        data-event="LinkClick"
                        data-section="FooterLN"
                    >
                        Términos y condiciones
                    </a>
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
                    <p className="copyright">
                        Copyright {year} SA LA NACION. Todos los derechos
                        reservados
                    </p>
                </div>
            </div>
            <div className="footer__right">
                <div className="footer__up">
                    <IosButton />
                    <AndroidButton />
                    <div className="footer__captcha" />
                </div>
                <div className="footer__bottom">
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
