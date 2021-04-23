import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Header from './header';
import FooterAMP from './footerAMP';
import ComLink from '../../../common/com-link';
import ComImage from '../../../common/com-image';

import '../../../../../resources/dist/css/ln/components/footer.css';
import SvgFiscal from '../../../common/svgDataFiscal';
import SvgGda from '../../../common/svgGda';

const Index = ({ outputType, siteProperties: { host } }) => {
    const year = new Date().getFullYear();
    const copyrightText = `Copyright ${year} SA LA NACION | Todos los derechos
                            reservados`;
    if (outputType === 'amp')
        return <FooterAMP copyrightText={copyrightText} />;
    return (
        <footer>
            <div className="lay">
                <Header host={host} />
                <section className="row footer-sitio">
                    <section className="col-desksm-9 col-deskxl-8 footer-sitio__links">
                        <ComLink
                            link="http://www.lanacion.com.ar/mapa-del-sitio/"
                            classCondition="item_link"
                        >
                            Mapa del sitio
                        </ComLink>
                        <ComLink
                            link="https://micuenta.lanacion.com.ar/ayuda"
                            classCondition="item_link"
                        >
                            Ayuda
                        </ComLink>
                        <ComLink
                            link="https://micuenta.lanacion.com.ar/tyc"
                            classCondition="item_link"
                        >
                            Términos y condiciones
                        </ComLink>
                        <ComLink
                            link="https://www.lanacion.in/"
                            classCondition="item_link"
                            target="_blank"
                        >
                            ¿Cómo anunciar?
                        </ComLink>
                        <ComLink
                            link="https://suscripciones.lanacion.com.ar/suscribirme/"
                            classCondition="item_link"
                        >
                            Suscribirse al diario impreso
                        </ComLink>
                    </section>
                    <section className="col-desksm-3 col-deskxl-4 footer-sitio__captcha">
                        <p>
                            <span>Protegido por reCAPTCHA:</span>
                            <ComLink
                                link="https://policies.google.com/terms?hl=es-419"
                                classCondition="condition"
                                target="_blank"
                            >
                                Condiciones
                            </ComLink>
                            <ComLink
                                link="https://policies.google.com/privacy?hl=es-419"
                                classCondition="private"
                                target="_blank"
                            >
                                Privacidad
                            </ComLink>
                        </p>
                    </section>
                </section>
                <section className="row footer-copyright">
                    <section className="col-desksm-6 col-desk-6 footer-copyright__fiscal">
                        <p>
                            {/*                             <ComImage
                                src="https://static.glanacion.com/v2/ln/img/gda.jpg"
                                alt="gda"
                                classCondition="img_gda"
                            /> */}
                            <SvgGda />
                            Miembro de GDA.Grupo de Diarios América
                            <ComLink
                                link="https://serviciosweb.afip.gob.ar/clavefiscal/qr/publicInfoD.aspx"
                                target="_blank"
                            >
                                {/*                                 <ComImage
                                    src="https://static.glanacion.com/v2/ln/img/data.jpg"
                                    alt="Data fiscal"
                                    classCondition="img_data-fiscal"
                                /> */}
                                <SvgFiscal />
                            </ComLink>
                        </p>
                    </section>
                    <section className="col-desksm-6 col-desk-6 footer-copyright__reserved">
                        <p>{copyrightText}</p>
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
