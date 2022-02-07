import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Icon from '../../../common/icon';
import Text from '../../../common/text';
import List from '../../../common/mod-list';
import Image from '../../../common/com-image';
import Copyright from './copyright';
import ComLogo from '../../../common/com-logo';
import getAssetsPath from '../../../common/utils/getAssetsPath';

import '../../../../../resources/dist/css/ln/modules/mod-footer.css';

const Index = ({ outputType, contextPath, home, deployment }) => {
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
            href: 'https://edicionimpresa.lanacion.com.ar/la-nacion'
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

    return (
        <footer id="footer" className="footer-site --threexs">
            <div className="lay">
                <section className="top">
                    <div className="row">
                        <div className="col-desksm-4 --left">
                            <Icon
                                name="facebook-filled"
                                href="https://www.facebook.com/lanacion"
                                target="_blank"
                                rel
                                title="Seguirnos en Facebook"
                            />
                            <Icon
                                name="twitter-filled"
                                href="https://twitter.com/LANACION"
                                target="_blank"
                                rel
                                title="Seguirnos en Twitter"
                            />
                            <Icon
                                name="instagram"
                                href="https://www.instagram.com/lanacioncom"
                                target="_blank"
                                rel
                                title="Seguirnos en Instagram"
                            />
                            <Icon
                                name="rss"
                                href="https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml"
                                target="_blank"
                                rel
                                title="Ir a Rss"
                            />
                        </div>
                        <div className="col-desksm-4 --center">
                            <ComLogo
                                href="https://www.lanacion.com.ar/"
                                logoName="la-nacion"
                                size="--sm"
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
                            <ComLogo
                                logoName="gda"
                                title="gda"
                                width="36"
                                height="20"
                                href="http://gda.com/"
                                target="_blank"
                            />
                            <Text>
                                Miembro de GDA. Grupo de Diarios América
                            </Text>
                            <ComLogo
                                logoName="data-fiscal"
                                title="Data fiscal"
                                width="28"
                                height="38"
                                href="http://qr.afip.gob.ar/?qr=HJMakbCpenWNdXYfqXtEDQ,,"
                                target="_blank"
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
