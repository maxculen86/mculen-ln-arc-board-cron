import React from 'react';

const LINK_LA_NACION = 'https://www.lanacion.com.ar';

export default function Footer(props) {
    return (
        // <footer className="footer">
        //     <div className="container">
        //         <h5>
        //             Segu&iacute; informado las 24 horas en: &nbsp;
        //             <a className="footer-link" href={LINK_LA_NACION}>
        //                 www.lanacion.com.ar
        //             </a>
        //         </h5>
        //         <p className="footer-copyright-main">
        //             Copyright {props.year} S.A. LA NACION
        //         </p>
        //         <p className="footer-copyright-text">
        //             Todos los derechos reservados
        //         </p>
        //     </div>
        // </footer>
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
                    <button className="icon-ios" id="pie-apple" />
                    <button className="icon-android" id="pie-android" />
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
                    <button className="icon-facebook" id="pie-facebook" />
                    <button className="icon-twitter" id="pie-twitter" />
                    <button className="icon-instagram" id="pie-instagram" />
                    <button className="icon-rss" id="pie-rss" />
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
