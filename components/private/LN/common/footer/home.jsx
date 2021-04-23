import React from 'react';
import PropTypes from 'fusion:prop-types';
// import Consumer from 'fusion:consumer';
// import Header from './header';
// import FooterAMP from './footerAMP';
import Logo from '../../../common/com-logo';
import Icon from '../../../common/icon';
import Text from '../../../common/text';
import Image from '../../../common/com-image';
import List from '../../../common/mod-list';
import Copyright from './copyright';

import '../../../../../resources/dist/css/ln/modules/mod-footer.css';
// import SvgFiscal from '../../../common/svgDataFiscal';
// import SvgGda from '../../../common/svgGda';

const Footer = ({ children }) => {
    // if (outputType === 'amp')
    //     return <FooterAMP copyrightText={copyrightText} />;

    const listText = [
        {
            text: 'Últimas noticias',
            href: 'https://www.lanacion.com.ar/ultimas-noticias'
        },
        { text: 'Política', href: 'https://www.lanacion.com.ar/politica' },
        { text: 'Economía', href: 'https://www.lanacion.com.ar/economía' },
        { text: 'El mundo', href: 'https://www.lanacion.com.ar/el-mundo' },
        { text: 'Sociedad', href: 'https://www.lanacion.com.ar/sociedad' },
        { text: 'Opinión', href: 'https://www.lanacion.com.ar/opinion' },
        { text: 'Deportes', href: 'https://www.lanacion.com.ar/deportes' },
        { text: 'Lifestyle', href: 'https://www.lanacion.com.ar/lifestyle' },
        {
            text: 'Espectáculos',
            href: 'https://www.lanacion.com.ar/espectaculos'
        },
        {
            text: 'Edición impresa',
            href: 'https://www.lanacion.com.ar/edicion-impresa'
        },
        { text: 'LN+', href: 'https://lnmas.lanacion.com.ar/' },
        { text: 'Club LA NACION', href: 'https://club.lanacion.com.ar/' }
    ];

    const listText1 = [
        { text: 'Revistas' },
        { text: 'OHLALÁ!', href: '#' },
        { text: '¡HOLA!', href: '#' },
        { text: 'ROLLING STONE', href: '#' },
        { text: 'LIVING', href: '#' },
        { text: 'BRANDO', href: '#' },
        { text: 'JARDÍN', href: '#' },
        { text: 'LUGARES', href: '#' }
    ];

    const listText2 = [
        { text: 'Club del vino:' },
        { text: 'Bon vivir', href: '#' }
    ];

    const listText2b = [
        { text: 'Envíos:' },
        { text: 'HOP', href: '#' },
        { text: 'Colecciones', href: '#' },
        { text: 'Máster en periodismo', href: '#' },
        { text: 'Fundación LA NACION', href: '#' },
        { text: 'Avisos solidarios', href: '#' }
    ];

    const listText3 = [
        {
            text: 'Mapa del sitio',
            href: 'https://www.lanacion.com.ar/mapa-del-sitio'
        },
        { text: 'Ayuda', href: 'https://micuenta.lanacion.com.ar/ayuda' },
        {
            text: 'Términos y condiciones',
            href: 'https://micuenta.lanacion.com.ar/tyc'
        },
        {
            text: '¿Cómo anunciar?',
            href: 'https://www.lanacion.in/',
            target: '_blank'
        },
        {
            text: 'Suscribirse al diario impreso',
            href: 'https://suscripciones.lanacion.com.ar/suscribirme/'
        }
    ];

    const listText4 = [
        { text: 'Protegido por reCAPTCHA:' },
        {
            text: 'Condiciones',
            href: 'https://policies.google.com/terms?hl=es-419',
            target: '_blank'
        },
        {
            text: 'Privacidad',
            href: 'https://policies.google.com/privacy?hl=es-419',
            target: '_blank'
        }
    ];

    return (
        <footer className="footer-site --threexs">
            <div className="lay">
                <section className="top">
                    <div className="row">
                        <div className="col-desksm-4 --left">
                            <Icon
                                name="facebook-filled"
                                href="https://www.facebook.com/lanacion"
                                target="_blank"
                            />
                            <Icon
                                name="twitter-filled"
                                href="https://twitter.com/LANACION"
                                target="_blank"
                            />
                            <Icon
                                name="instagram"
                                href="https://www.instagram.com/lanacioncom/"
                                target="_blank"
                            />
                            <Icon
                                name="rss"
                                href="http://servicios.lanacion.com.ar/herramientas/rss/ayuda"
                                target="_blank"
                            />
                        </div>
                        <div className="col-desksm-4 --center">
                            <Logo
                                logoName="la-nacion"
                                color
                                size="--sm"
                                href="https://www.lanacion.com.ar/"
                                title="LA NACION"
                            ></Logo>
                        </div>
                        <div className="col-desksm-4 --right"></div>
                    </div>
                </section>
                <section className="middle">
                    <div className="row">
                        <List inline mod="--font-bold">
                            {listText}
                        </List>
                        <List
                            inline
                            size="--fourxs"
                            mod="--magazine --font-bold"
                        >
                            {listText1}
                        </List>
                        <List inline size="--fourxs" mod="--club --font-bold">
                            {listText2}
                        </List>
                        <List
                            inline
                            size="--fourxs"
                            mod="--delivery --font-bold"
                        >
                            {listText2b}
                        </List>
                    </div>
                </section>
                <section className="bottom">
                    <div className="row">
                        <div className="col-desksm-9 col-deskxl-8 --left">
                            <List mod="--bullet-xs" inline>
                                {listText3}
                            </List>
                        </div>
                        <div className="col-desksm-3 col-deskxl-4 --right">
                            <List inline>{listText4}</List>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-desksm-6 --right">
                            <Image
                                src="https://static.glanacion.com/v2/ln/img/gda.jpg"
                                alt="gda"
                                mod="img_gda"
                            />
                            <Text>
                                Miembro de GDA. Grupo de Diarios América
                            </Text>
                            <Image
                                href="https://serviciosweb.afip.gob.ar/clavefiscal/qr/publicInfoD.aspx"
                                target="_blank"
                                src="https://static.glanacion.com/v2/ln/img/data.jpg"
                                alt="Data fiscal"
                                width="35"
                                height="47"
                            />
                        </div>
                        <div className="col-desksm-6 --left">
                            <Copyright />
                        </div>
                    </div>
                </section>
            </div>
        </footer>
    );
};

// Footer.propTypes = {
//     outputType: PropTypes.string.isRequired,
//     siteProperties: PropTypes.shape({
//         host: PropTypes.string
//     }).isRequired
// };
export default Footer;
