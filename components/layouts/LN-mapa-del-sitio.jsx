import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';
import List from '../private/common/mod-list';
import Title from '../private/common/com-title';
import Copyright from '../private/LN/common/footer/copyright';
import PwaModals from '../private/LN/common/pwaModals';

import '../../resources/dist/css/ln/pages/sitemap.css';
import ComLogo from '../private/common/com-logo';

const LNMapaDelSitio = ({ children }) => {
    const listado1 = [
        { text: 'LA NACION', href: `${SITE_LANACION}/` },
        {
            text: 'Últimas noticias',
            href: `${SITE_LANACION}/ultimas-noticias/`
        },
        { text: 'Política', href: `${SITE_LANACION}/politica/` },
        { text: 'Economía', href: `${SITE_LANACION}/economía/` },
        { text: 'El mundo', href: `${SITE_LANACION}/el-mundo/` },
        { text: 'Sociedad', href: `${SITE_LANACION}/sociedad/` },
        { text: 'Opinión', href: `${SITE_LANACION}/opinion/` },
        { text: 'Deportes', href: `${SITE_LANACION}/deportes/` },
        { text: 'Lifestyle', href: `${SITE_LANACION}/lifestyle/` },
        {
            text: 'Espectáculos',
            href: `${SITE_LANACION}/espectaculos/`
        },
        {
            text: 'Edición impresa',
            href: 'https://edicionimpresa.lanacion.com.ar/la-nacion'
        },
        { text: 'Club LA NACION', href: 'https://club.lanacion.com.ar/' }
    ];

    const listado2 = [
        { text: 'LN+', href: 'https://lnmas.lanacion.com.ar/' },
        {
            text: 'Suscribite',
            href: 'https://suscripciones.lanacion.com.ar/suscribirme/'
        },
        {
            text: 'Acceso a PDF',
            href: 'https://edicionimpresa.lanacion.com.ar/la-nacion/'
        },
        { text: 'Ayuda', href: 'https://www.contacto.lanacion.com.ar/ayuda/' },
        { text: 'Cómo anunciar', href: 'https://www.lanacion.in/' }
    ];

    const listado3 = [
        {
            text: 'Todos los títulos',
            href: 'https://edicionimpresa.lanacion.com.ar/la-nacion/'
        }
    ];

    const listado4 = [
        { text: 'Autos', href: `${SITE_LANACION}/autos/` },
        {
            text: 'Al volante',
            href: `${SITE_LANACION}/autos/al-volante/`
        },
        { text: 'Campo', href: `${SITE_LANACION}/economia/campo/` },
        {
            text: 'Comercio exterior',
            href: `${SITE_LANACION}/economia/comercio-exterior/`
        },
        { text: 'Comunidad', href: `${SITE_LANACION}/comunidad/` },
        { text: 'Ideas', href: `${SITE_LANACION}/ideas/` },
        {
            text: 'Propiedades',
            href: `${SITE_LANACION}/propiedades/`
        },
        {
            text: 'Inmuebles comerciales',
            href: `${SITE_LANACION}/propiedades/inmuebles-comerciales/`
        },
        {
            text: 'La Nacion revista',
            href: `${SITE_LANACION}/la-nacion-revista/`
        },
        {
            text: 'Moda y belleza',
            href: `${SITE_LANACION}/moda-y-belleza/`
        },
        { text: 'Sábado', href: `${SITE_LANACION}/sabado/` },
        { text: 'Turismo', href: `${SITE_LANACION}/turismo/` }
    ];

    const listado5 = [
        {
            text: 'Fúnebres',
            href:
                'https://servicios.lanacion.com.ar/edicion-impresa/avisos-funebres'
        },
        {
            text: 'Sociales',
            href:
                'https://servicios.lanacion.com.ar/edicion-impresa/avisos-sociales'
        }
    ];

    const listado6 = [
        {
            text: 'OHLALÁ!',
            href: `${SITE_LANACION}/revista-ohlala/`
        },
        {
            text: '¡HOLA! Argentina',
            href: `${SITE_LANACION}/revista-hola/`
        },
        {
            text: 'Rolling Stone',
            href: `${SITE_LANACION}/revista-rolling-stone/`
        },
        {
            text: 'Lugares',
            href: `${SITE_LANACION}/revista-lugares/`
        },
        { text: 'Living', href: `${SITE_LANACION}/revista-living/` },
        { text: 'Brando', href: `${SITE_LANACION}/revista-brando/` },
        { text: 'Jardín', href: `${SITE_LANACION}/revista-jardin/` }
    ];

    const listado7 = [
        { text: 'Inicio', href: 'https://club.lanacion.com.ar/' },
        {
            text: 'Gastronomía',
            href:
                'https://club.lanacion.com.ar/search?benefits.category.keyword=Gastronom%C3%ADa'
        },
        {
            text: 'Entretenimiento',
            href:
                'https://club.lanacion.com.ar/search?benefits.category.keyword=Entretenimiento'
        },
        {
            text: 'Turismo',
            href:
                'https://club.lanacion.com.ar/search?benefits.category.keyword=Viajes'
        },
        {
            text: 'Moda',
            href:
                'https://club.lanacion.com.ar/search?benefits.category.keyword=Moda'
        },
        {
            text: 'Belleza',
            href:
                'https://club.lanacion.com.ar/search?benefits.category.keyword=Bienestar'
        },
        {
            text: 'Deco y Hogar',
            href:
                'https://club.lanacion.com.ar/search?benefits.category.keyword=Deco%20%26%20Hogar'
        },
        {
            text: 'Automóvil',
            href:
                'https://club.lanacion.com.ar/search?benefits.category.keyword=Autom%C3%B3vil'
        },
        {
            text: 'ECO Sustentable',
            href:
                'https://club.lanacion.com.ar/search?benefits.category.keyword=ECO%20Sustentable'
        },
        {
            text: 'Supermercados',
            href:
                'https://club.lanacion.com.ar/search?benefits.category.keyword=Supermercados'
        },
        {
            text: 'Otros beneficios',
            href:
                'https://club.lanacion.com.ar/search?benefits.category.keyword=Otros%20beneficios'
        },
        {
            text: 'Pedí tu tarjeta',
            href:
                'https://miclub.lanacion.com.ar/?utm_source=sitio%20club&utm_medium=organico%20-%20boton&utm_term=peditutarjeta&utm_campaign=autogestion'
        }
    ];

    const listado8 = [
        {
            text: 'Twitter',
            href: 'https://twitter.com/LANACION',
            rel: 'nofollow',
            target: '_blank'
        },
        {
            text: 'Facebook',
            href: 'https://www.facebook.com/lanacion',
            rel: 'nofollow',
            target: '_blank'
        },
        {
            text: 'Instagram',
            href: 'https://www.instagram.com/lanacioncom/',
            rel: 'nofollow',
            target: '_blank'
        },
        {
            text: 'Youtube',
            href: 'https://www.youtube.com/channel/UCba3hpU7EFBSk817y9qZkiA',
            rel: 'nofollow',
            target: '_blank'
        }
    ];

    const listado9 = [
        { text: 'Horóscopo', href: `${SITE_LANACION}/horoscopo/` },
        {
            text: 'Clima',
            href: `${SITE_LANACION}/clima/`
        },
        { text: 'Tránsito', href: `${SITE_LANACION}/transito/` },
        { text: 'Dólar hoy', href: `${SITE_LANACION}/dolar-hoy/` },
        { text: 'Feriados', href: `${SITE_LANACION}/feriados` },
        {
            text: 'Loterías y quinielas',
            href: `${SITE_LANACION}/loterias/`
        },
        {
            text: 'Cartelera de cine',
            href: `${SITE_LANACION}/cartelera-de-cine/`
        },
        {
            text: 'Cartelera de teatro',
            href: `${SITE_LANACION}/cartelera-de-teatro/`
        },
        {
            text: 'Recetas',
            href: `${SITE_LANACION}/recetas/`
        },
        {
            text: 'Podcasts',
            href: `${SITE_LANACION}/tema/podcasts-tid64878/`
        },
        { text: 'Sudoku', href: `${SITE_LANACION}/sudoku-online` },
        { text: 'RSS', href: `${SITE_LANACION}/arcio/rss/` },
        { text: 'Agencias', href: `${SITE_LANACION}/agencias/` }
    ];

    const listado10 = [
        { text: 'Bonvivir', href: 'https://www.bonvivir.com/' },
        { text: 'Colecciones', href: 'https://colecciones.lanacion.com.ar/' },
        {
            text: 'Máster en periodismo',
            href:
                'https://www.utdt.edu/ver_contenido.php?id_contenido=1111&id_item_menu=2327'
        },
        {
            text: 'Fundación LA NACION',
            href: 'https://fundacionlanacion.org.ar/'
        },
        { text: 'HOP', href: 'https://www.hopenvios.com.ar/' }
    ];

    return (
        <>
            {children[0]}
            <div id="wrapper" className="sitemap">
                {/* <Header /> */}
                <header>
                    <div className="lay">
                        <ComLogo
                            logoName="la-nacion"
                            href="SITE_LANACION/"
                            title="LA NACION"
                        />
                    </div>
                </header>
                <main id="content">
                    <div className="lay">
                        <Title tag="h1" size="--l" content="Mapa del sitio" />
                        <div className="row">
                            <div className="col-6 col-tablet-3">
                                <List mod="--font-bold" size="">
                                    {listado1}
                                </List>
                                <List mod="">{listado2}</List>
                                <Title
                                    content="LA NACION en las redes"
                                    tag="h2"
                                />
                                <List mod="">{listado8}</List>
                            </div>
                            <div className="col-6 col-tablet-3">
                                <Title content="Edición impresa" tag="h2" />
                                <List mod="">{listado3}</List>
                                <List mod="">{listado4}</List>
                                <List mod="">{listado5}</List>
                            </div>

                            <div className="col-6 col-tablet-3">
                                <Title content="Revistas" tag="h2" />
                                <List mod="">{listado6}</List>
                                <Title content="Club LA NACION" tag="h2" />
                                <List mod="">{listado7}</List>
                            </div>

                            <div className="col-6 col-tablet-3">
                                <Title content="Servicios" tag="h2" />
                                <List mod="">{listado9}</List>
                                <Title content="Sitios del Grupo" tag="h2" />
                                <List mod="">{listado10}</List>
                            </div>
                        </div>
                    </div>
                </main>
                {/* <Footer /> */}
                <footer>
                    <div className="lay">
                        <Copyright />
                    </div>
                </footer>
            </div>
            <PwaModals />
        </>
    );
};

const pageBuilderSections = ['Cuerpo'];

LNMapaDelSitio.sections = pageBuilderSections;

LNMapaDelSitio.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default LNMapaDelSitio;
