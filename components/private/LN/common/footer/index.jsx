import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Icon from '../../../common/icon';
import Text from '../../../common/text';
import List from '../../../common/mod-list';
import Copyright from './copyright';
import ComLogo from '../../../common/com-logo';
import commonProps from './helpers/commonProps';
import { SITIO_SEGURO_REGISTRACION, SITE_LANACION } from 'fusion:environment';

const Index = ({ home }) => {
    const listText = [
        commonProps(
            'Últimas noticias',
            'Ir a Últimas noticias',
            `${SITE_LANACION}/ultimas-noticias/`
        ),
        commonProps('Política', 'Ir a Política', `${SITE_LANACION}/politica/`),
        commonProps('Economía', 'Ir a Economía', `${SITE_LANACION}/economia/`),
        commonProps('El mundo', 'Ir a El mundo', `${SITE_LANACION}/el-mundo/`),
        commonProps('Sociedad', 'Ir a Sociedad', `${SITE_LANACION}/sociedad/`),
        commonProps('Opinión', 'Ir a Opinión', `${SITE_LANACION}/opinion/`),
        commonProps('Deportes', 'Ir a Deportes', `${SITE_LANACION}/deportes/`),
        commonProps(
            'Lifestyle',
            'Ir a Lifestyle',
            `${SITE_LANACION}/lifestyle/`
        ),
        commonProps(
            'Espectáculos',
            'Ir a Espectáculos',
            `${SITE_LANACION}/espectaculos/`
        ),
        commonProps(
            'Edición impresa',
            'Ir a Edición impresa',
            'https://edicionimpresa.lanacion.com.ar/la-nacion'
        ),
        commonProps('LN+', 'Ir a LN+', 'https://lnmas.lanacion.com.ar/'),
        commonProps(
            'Club LA NACION',
            'Ir a Club LA NACION',
            'https://club.lanacion.com.ar/'
        )
    ];

    const listText1 = [
        commonProps('Revistas'),
        commonProps(
            'OHLALÁ!',
            'Ir a Revista OHLALÁ',
            `${SITE_LANACION}/revista-ohlala/`
        ),
        commonProps(
            '¡HOLA!',
            'Ir a Revista HOLA',
            `${SITE_LANACION}/revista-hola/`
        ),
        commonProps(
            'ROLLING STONE',
            'Ir a Revista Rolling Stone',
            `${SITE_LANACION}/revista-rolling-stone/`
        ),
        commonProps(
            'LIVING',
            'Ir a Revista Living',
            `${SITE_LANACION}/revista-living/`
        ),
        commonProps(
            'BRANDO',
            'Ir a Revista Brando',
            `${SITE_LANACION}/revista-brando/`
        ),
        commonProps(
            'JARDÍN',
            'Ir a Revista Jardín',
            `${SITE_LANACION}/revista-jardin/`
        ),
        commonProps(
            'LUGARES',
            'Ir a Revista Lugares',
            `${SITE_LANACION}/revista-lugares/`
        )
    ];

    const listText2 = [
        commonProps('Club del vino:'),
        commonProps(
            'Bon vivir',
            'Ir a tienda online de Bonvivir',
            'https://bonvivir.com/',
            '_blank'
        )
    ];

    const listText2b = [
        commonProps('Envíos:'),
        commonProps(
            'HOP',
            'Ir a página de envíos de HOP',
            'https://www.hopenvios.com.ar/',
            '_blank'
        ),
        commonProps(
            'Colecciones',
            'Ir a tienda online de Colecciones LA NACION',
            'https://colecciones.lanacion.com.ar',
            '_blank'
        ),
        commonProps(
            'Máster en periodismo',
            'Ir a la Maestría en periodismo',
            'https://www.utdt.edu/ver_contenido.php?id_contenido=1111&id_item_menu=2327',
            '_blank'
        ),
        commonProps(
            'Fundación LA NACION',
            'Ir a la Fundación LA NACION',
            'https://fundacionlanacion.org.ar/',
            '_blank'
        )
    ];

    const listText3 = [
        commonProps(
            'Mapa del sitio',
            'Ir al mapa del sitio de LA NACION',
            `${SITE_LANACION}/mapa-del-sitio/`
        ),
        commonProps(
            'Ayuda',
            'Ir a las preguntas frecuentes',
            'https://www.contacto.lanacion.com.ar/ayuda'
        ),
        commonProps(
            'Términos y condiciones',
            'Ir a los términos y condiciones',
            'https://www.contacto.lanacion.com.ar/tyc'
        ),
        commonProps(
            '¿Cómo anunciar?',
            'Cómo anunciar en el sitio de LA NACION',
            'https://www.lanacion.in/',
            '_blank'
        ),
        commonProps(
            'Suscribirse al diario impreso',
            'Ir a las suscripciones al diario',
            `${SITIO_SEGURO_REGISTRACION}/suscribirme`
        )
    ];

    const listText4 = [
        commonProps('Protegido por reCAPTCHA:'),
        commonProps(
            'Condiciones',
            'Ir a las condiciones de Google',
            'https://policies.google.com/terms?hl=es-419',
            '_blank'
        ),
        commonProps(
            'Privacidad',
            'Ir a la privacidad de Google',
            'https://policies.google.com/privacy?hl=es-419',
            '_blank'
        )
    ];

    return (
        <footer id="footer" className="footer-site --threexs --no-app">
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
                                name="twitter"
                                href="https://twitter.com/LANACION"
                                target="_blank"
                                rel
                                title="Seguirnos en X"
                            />
                            <Icon
                                name="instagram"
                                href="https://www.instagram.com/lanacioncom/"
                                target="_blank"
                                rel
                                title="Seguirnos en Instagram"
                            />
                            <Icon
                                name="rss"
                                href={`${SITE_LANACION}/arc/outboundfeeds/rss/?outputType=xml`}
                                target="_blank"
                                rel
                                title="Ir a Rss"
                            />
                        </div>
                        <div className="col-desksm-4 --center">
                            <ComLogo
                                href={`${SITE_LANACION}/`}
                                logoName="la-nacion"
                                size="--sm"
                                title="Ir a la página principal"
                            />
                        </div>
                        <div className="col-desksm-4 --right">
                            <ComLogo
                                logoName="android-store"
                                title="Descargar nuestra app en Google Play"
                                width="120"
                                height="35"
                                href="https://play.google.com/store/apps/details?id=app.lanacion.activity&hl=es_419"
                                target="_blank"
                            />
                            <ComLogo
                                logoName="ios-store"
                                title="Descargar nuestra app en el App Store"
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
                                href="https://gda.com/"
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
                                href="https://seti.afip.gob.ar/padron-puc-constancia-internet/ConsultaConstanciaAction.do"
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
    home: PropTypes.bool.isRequired
};

export default Consumer(Index);
