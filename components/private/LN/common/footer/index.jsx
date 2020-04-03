import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Header from './header';
import FooterAMP from './footerAMP';
import '../../../../../resources/dist/css/ln/components/footer.css';

const Index = ({ outputType, siteProperties: { host } }) => {
    if (outputType === 'amp') return <FooterAMP />;
    return (
        <footer>
            <div className="lay">
                <Header host={host} />
                <section className="row footer-sitio">
                    <section className="col-desksm-9 col-deskxl-8 footer-sitio__links">
                        <a
                            href="http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html"
                            className="item_link"
                        >
                            Mapa del sitio
                        </a>
                        <a
                            href="https://micuenta.lanacion.com.ar/ayuda"
                            className="item_link"
                        >
                            Ayuda
                        </a>
                        <a
                            href="https://micuenta.lanacion.com.ar/tyc"
                            className="item_link"
                        >
                            Términos y condiciones
                        </a>
                        <a
                            href="https://www.lanacion.in/"
                            className="item_link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ¿Cómo anunciar?
                        </a>
                        <a
                            href="https://suscripciones.lanacion.com.ar/suscribirme/"
                            className="item_link"
                        >
                            Suscribirse al diario impreso
                        </a>
                    </section>
                    <section className="col-desksm-3 col-deskxl-4 footer-sitio__captcha">
                        <p>
                            <span>Protegido por reCAPTCHA:</span>
                            <a
                                href="https://policies.google.com/terms?hl=es-419"
                                className="condition"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Condiciones
                            </a>
                            <a
                                href="https://policies.google.com/privacy?hl=es-419"
                                className="private"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Privacidad
                            </a>
                        </p>
                    </section>
                </section>
                <section className="row footer-copyright">
                    <section className="col-desksm-6 col-desk-6 footer-copyright__fiscal">
                        <p>
                            <img
                                src="https://static.glanacion.com/v2/ln/img/gda.jpg"
                                alt="gda"
                                className="img_gda"
                            />
                            Miembro de GDA.Grupo de Diarios América
                            <a
                                href="https://serviciosweb.afip.gob.ar/clavefiscal/qr/publicInfoD.aspx"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://static.glanacion.com/v2/ln/img/data.jpg"
                                    alt="Data fiscal"
                                    className="img_data-fiscal"
                                />
                            </a>
                        </p>
                    </section>
                    <section className="col-desksm-6 col-desk-6 footer-copyright__reserved">
                        <p>
                            Copyright 2020 SA LA NACION | Todos los derechos
                            reservados
                        </p>
                    </section>
                </section>
            </div>
        </footer>
    );
};

Index.propTypes = {
    outputType: PropTypes.string.isRequired,
    siteProperties: PropTypes.shape({
        host: PropTypes.string
    }).isRequired
};
export default Consumer(Index);
