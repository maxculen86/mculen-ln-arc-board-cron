import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Logo from '../../../common/com-logo';
import Icon from '../../../common/icon';
import Text from '../../../common/text';
import Image from '../../../common/com-image';
import List from '../../../common/mod-list';
import Copyright from './copyright';
import getAssetsPath from '../../../common/utils/getAssetsPath';

import '../../../../../resources/dist/css/ln/modules/mod-footer.css';

//const Footer = ({ children }) => {
const Index = ({
    outputType,
    siteProperties: { host },
    contextPath,
    home,
    deployment
}) => {
    const listText = [
        {
            text: 'Últimas noticias',
            alt: 'Ir a Últimas noticias',
            href: 'https://www.lanacion.com.ar/ultimas-noticias/'
        },
        {
            text: 'Política',
            alt: 'Ir a Política',
            href: 'https://www.lanacion.com.ar/politica/'
        },
        {
            text: 'Economía',
            alt: 'Ir a Economía',
            href: 'https://www.lanacion.com.ar/economia/'
        },
        {
            text: 'El mundo',
            alt: 'Ir a El mundo',
            href: 'https://www.lanacion.com.ar/el-mundo/'
        },
        {
            text: 'Sociedad',
            alt: 'Ir a Sociedad',
            href: 'https://www.lanacion.com.ar/sociedad/'
        },
        {
            text: 'Opinión',
            alt: 'Ir a Opinión',
            href: 'https://www.lanacion.com.ar/opinion/'
        },
        {
            text: 'Deportes',
            alt: 'Ir a Deportes',
            href: 'https://www.lanacion.com.ar/deportes/'
        },
        {
            text: 'Lifestyle',
            alt: 'Ir a Lifestyle',
            href: 'https://www.lanacion.com.ar/lifestyle/'
        },
        {
            text: 'Espectáculos',
            alt: 'Ir a Espectáculos',
            href: 'https://www.lanacion.com.ar/espectaculos/'
        },
        {
            text: 'Edición impresa',
            alt: 'Ir a Edición impresa',
            href: 'https://www.lanacion.com.ar/edicion-impresa/'
        },
        {
            text: 'LN+',
            alt: 'Ir a LN+',
            href: 'https://lnmas.lanacion.com.ar/'
        },
        {
            text: 'Club LA NACION',
            alt: 'Ir a Club LA NACION',
            href: 'https://club.lanacion.com.ar/'
        }
    ];

    const listText1 = [
        { text: 'Revistas' },
        {
            text: 'OHLALÁ!',
            alt: 'Ir a Revista OHLALÁ',
            href: 'https://www.lanacion.com.ar/revista-ohlala/'
        },
        {
            text: '¡HOLA!',
            alt: 'Ir a Revista HOLA',
            href: 'https://www.lanacion.com.ar/revista-hola/'
        },
        {
            text: 'ROLLING STONE',
            alt: 'Ir a Revista Rolling Stone',
            href: 'https://www.lanacion.com.ar/revista-rolling-stone/'
        },
        {
            text: 'LIVING',
            alt: 'Ir a Revista Living',
            href: 'https://www.lanacion.com.ar/revista-living/'
        },
        {
            text: 'BRANDO',
            alt: 'Ir a Revista Brando',
            href: 'https://www.lanacion.com.ar/revista-brando/'
        },
        {
            text: 'JARDÍN',
            alt: 'Ir a Revista Jardín',
            href: 'https://www.lanacion.com.ar/revista-jardin/'
        },
        {
            text: 'LUGARES',
            alt: 'Ir a Revista Lugares',
            href: 'https://www.lanacion.com.ar/revista-lugares/'
        }
    ];

    const listText2 = [
        { text: 'Club del vino:' },
        {
            text: 'Bon vivir',
            alt: 'Ir a tienda online de Bonvivir',
            href: 'https://www.bonvivir.com/',
            target: '_blank'
        }
    ];

    const listText2b = [
        { text: 'Envíos:' },
        {
            text: 'HOP',
            alt: 'Ir a página de envíos de HOP',
            href: 'https://www.hopenvios.com.ar/',
            target: '_blank'
        },
        {
            text: 'Colecciones',
            alt: 'Ir a tienda online de Colecciones LA NACION',
            href: 'https://colecciones.lanacion.com.ar/',
            target: '_blank'
        },
        {
            text: 'Máster en periodismo',
            alt: 'Ir a la Maestría en periodismo',
            href:
                'https://www.utdt.edu/ver_contenido.php?id_contenido=1111&id_item_menu=2327',
            target: '_blank'
        },
        {
            text: 'Fundación LA NACION',
            alt: 'Ir a la Fundación LA NACION',
            href: 'https://fundacionlanacion.org.ar/',
            target: '_blank'
        },
        {
            text: 'Avisos solidarios',
            alt: 'Ir a los clasificados solidarios',
            href: 'https://solidarios.lanacion.com.ar/',
            target: '_blank'
        }
    ];

    const listText3 = [
        {
            text: 'Mapa del sitio',
            alt: 'Ir al mapa del sitio de LA NACION',
            href: 'https://www.lanacion.com.ar/mapa-del-sitio/'
        },
        {
            text: 'Ayuda',
            alt: 'Ir a las preguntas frecuentes',
            href: 'https://micuenta.lanacion.com.ar/ayuda/'
        },
        {
            text: 'Términos y condiciones',
            alt: 'Ir a los términos y condiciones',
            href: 'https://micuenta.lanacion.com.ar/tyc/'
        },
        {
            text: '¿Cómo anunciar?',
            alt: 'Cómo anunciar en el sitio de LA NACION',
            href: 'https://www.lanacion.in/',
            target: '_blank'
        },
        {
            text: 'Suscribirse al diario impreso',
            alt: 'Ir a las suscripciones al diario',
            href: 'https://suscripciones.lanacion.com.ar/suscribirme/'
        }
    ];

    const listText4 = [
        { text: 'Protegido por reCAPTCHA:' },
        {
            text: 'Condiciones',
            alt: 'Ir a las condiciones de Google',
            href: 'https://policies.google.com/terms?hl=es-419',
            target: '_blank'
        },
        {
            text: 'Privacidad',
            alt: 'Ir a la privacidad de Google',
            href: 'https://policies.google.com/privacy?hl=es-419',
            target: '_blank'
        }
    ];

    //const year = new Date().getFullYear();
    //const copyrightText = `Copyright ${year} SA LA NACION | Todos los derechos reservados`;

    // if (outputType === 'amp')
    //     return <FooterAMP copyrightText={copyrightText} />;
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
                                title="Seguirnos en Facebook"
                            />
                            <Icon
                                name="twitter-filled"
                                href="https://twitter.com/LANACION"
                                target="_blank"
                                title="Seguirnos en Twitter"
                            />
                            <Icon
                                name="instagram"
                                href="https://www.instagram.com/lanacioncom"
                                target="_blank"
                                title="Seguirnos en Instagram"
                            />
                            <Icon
                                name="rss"
                                //href="https://servicios.lanacion.com.ar/herramientas/rss/ayuda"
                                href="https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml"
                                target="_blank"
                                title="Ir a Rss"
                            />
                        </div>
                        <div className="col-desksm-4 --center">
                            <Logo
                                logoName="la-nacion"
                                color
                                size="--sm"
                                href="https://www.lanacion.com.ar/"
                                target="_top"
                                title="Ir a la página principal"
                            />
                        </div>
                        <div className="col-desksm-4 --right">
                            <Image
                                src={getAssetsPath(contextPath)(deployment)(
                                    'google-play.svg'
                                )}
                                alt="Descargar nuestra app en Google Play"
                                width="120"
                                height="35"
                                href="https://play.google.com/store/apps/details?id=app.lanacion.activity&hl=es_419"
                                target="_blank"
                                amp={outputType === 'amp'}
                            />
                            <Image
                                src={getAssetsPath(contextPath)(deployment)(
                                    'app-store.svg'
                                )}
                                alt="Descargar nuestra app en el App Store"
                                width="120"
                                height="35"
                                href="https://apps.apple.com/ar/app/la-nacion/id410689702"
                                target="_blank"
                                amp={outputType === 'amp'}
                            />
                        </div>
                    </div>
                </section>
                {home && (
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
                            <List
                                inline
                                size="--fourxs"
                                mod="--club --font-bold"
                            >
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
                )}
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
                                src={getAssetsPath(contextPath)(deployment)(
                                    'gda.svg'
                                )}
                                alt="gda"
                                classCondition="--gda"
                                width="36"
                                height="20"
                                amp={outputType === 'amp'}
                            />
                            <Text>
                                Miembro de GDA. Grupo de Diarios América
                            </Text>
                            <Image
                                href="http://qr.afip.gob.ar/?qr=HJMakbCpenWNdXYfqXtEDQ,,"
                                target="_blank"
                                src={getAssetsPath(contextPath)(deployment)(
                                    'data-fiscal.svg'
                                )}
                                alt="Data fiscal"
                                classCondition="--data"
                                width="28"
                                height="38"
                                amp={outputType === 'amp'}
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

Index.propTypes = {
    outputType: PropTypes.string.isRequired,
    siteProperties: PropTypes.shape({
        host: PropTypes.string
    }).isRequired
};
export default Consumer(Index);
