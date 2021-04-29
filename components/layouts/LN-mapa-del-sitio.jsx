import React from 'react';
import PropTypes from 'fusion:prop-types';
//import Header from '../private/LN/common/header';
//import Footer from '../private/LN/common/footer';
//import LoginProvider from '../private/LN/common/context/loginContext';

import List from '../private/common/mod-list';
import Logo from '../private/common/com-logo';
import Title from '../private/common/com-title';
import Copyright from '../private/LN/common/footer/copyright';

import '../../resources/dist/css/ln/pages/sitemap.css';

//import GlobalProvider from '../private/common/context/globalContext';

const LNMapaDelSitio = ({ children }) => {
    const listado1 = [
        { text: 'LA NACION', href: 'https://www.lanacion.com.ar/' },
        {
            text: 'Últimas noticias',
            href: 'https://www.lanacion.com.ar/ultimas-noticias/'
        },
        { text: 'Política', href: 'https://www.lanacion.com.ar/politica/' },
        { text: 'Economía', href: 'https://www.lanacion.com.ar/economía/' },
        { text: 'El mundo', href: 'https://www.lanacion.com.ar/el-mundo/' },
        { text: 'Sociedad', href: 'https://www.lanacion.com.ar/sociedad/' },
        { text: 'Opinión', href: 'https://www.lanacion.com.ar/opinion/' },
        { text: 'Deportes', href: 'https://www.lanacion.com.ar/deportes/' },
        { text: 'Lifestyle', href: 'https://www.lanacion.com.ar/lifestyle/' },
        {
            text: 'Espectáculos',
            href: 'https://www.lanacion.com.ar/espectaculos/'
        },
        {
            text: 'Edición impresa',
            href: 'https://www.lanacion.com.ar/edicion-impresa/'
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
        { text: 'Autos', href: 'https://www.lanacion.com.ar/autos/' },
        {
            text: 'Al volante',
            href: 'https://www.lanacion.com.ar/autos/al-volante/'
        },
        { text: 'Campo', href: 'https://www.lanacion.com.ar/economia/campo/' },
        {
            text: 'Comercio exterior',
            href: 'https://www.lanacion.com.ar/economia/comercio-exterior/'
        },
        { text: 'Comunidad', href: 'https://www.lanacion.com.ar/comunidad/' },
        { text: 'Ideas', href: 'https://www.lanacion.com.ar/ideas/' },
        {
            text: 'Propiedades',
            href: 'https://www.lanacion.com.ar/propiedades/'
        },
        {
            text: 'Inmuebles comerciales',
            href:
                'https://www.lanacion.com.ar/propiedades/inmuebles-comerciales/'
        },
        {
            text: 'La Nacion revista',
            href: 'https://www.lanacion.com.ar/la-nacion-revista/'
        },
        {
            text: 'Moda y belleza',
            href: 'https://www.lanacion.com.ar/moda-y-belleza/'
        },
        { text: 'Sábado', href: 'https://www.lanacion.com.ar/sabado/' },
        { text: 'Turismo', href: 'https://www.lanacion.com.ar/turismo/' }
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
        },
        { text: 'Humor', href: 'https://www.lanacion.com.ar/humor' }
    ];

    const listado6 = [
        {
            text: 'OHLALÁ!',
            href: 'https://www.lanacion.com.ar/revista-ohlala/'
        },
        {
            text: '¡HOLA! Argentina',
            href: 'https://www.lanacion.com.ar/revista-hola/'
        },
        {
            text: 'Rolling Stone',
            href: 'https://www.lanacion.com.ar/revista-rolling-stone/'
        },
        {
            text: 'Lugares',
            href: 'https://www.lanacion.com.ar/revista-lugares/'
        },
        { text: 'Living', href: 'https://www.lanacion.com.ar/revista-living/' },
        { text: 'Brando', href: 'https://www.lanacion.com.ar/revista-brando/' },
        { text: 'Jardín', href: 'https://www.lanacion.com.ar/revista-jardin/' }
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
        { text: 'Twitter', href: 'https://twitter.com/LANACION' },
        { text: 'Facebook', href: 'https://www.facebook.com/lanacion' },
        { text: 'Instagram', href: 'https://www.instagram.com/lanacioncom/' },
        {
            text: 'Youtube',
            href: 'https://www.youtube.com/channel/UCba3hpU7EFBSk817y9qZkiA'
        }
    ];

    const listado9 = [
        { text: 'Horóscopo', href: 'https://www.lanacion.com.ar/horoscopo' },
        {
            text: 'Pronóstico',
            href: 'https://servicios.lanacion.com.ar/pronostico-del-tiempo'
        },
        { text: 'Tránsito', href: 'https://www.lanacion.com.ar/transito/' },
        { text: 'Dólar hoy', href: 'https://www.lanacion.com.ar/dolar-hoy/' },
        { text: 'Feriados', href: 'https://www.lanacion.com.ar/feriados' },
        {
            text: 'Loterías y quinielas',
            href: 'https://servicios.lanacion.com.ar/loterias'
        },
        {
            text: 'Cartelera de cine',
            href: 'https://www.lanacion.com.ar/cartelera-de-cine'
        },
        {
            text: 'Cartelera de teatro',
            href: 'https://www.lanacion.com.ar/cartelera-de-teatro'
        },
        {
            text: 'Cocina y Recetas',
            href: 'https://recetas.lanacion.com.ar/recetas/'
        },
        {
            text: 'Podcasts',
            href:
                'https://www.lanacion.com.ar/lifestyle/cuales-son-podcast-la-nacion-nid2165046/'
        },
        { text: 'Sudoku', href: 'https://www.lanacion.com.ar/sudoku-online' },
        { text: 'RSS', href: 'https://www.lanacion.com.ar/arcio/rss/' }
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
        {
            text: 'Avisos solidarios',
            href: 'http://solidarios.lanacion.com.ar/'
        },
        { text: 'HOP', href: 'https://www.hopenvios.com.ar/' }
    ];

    return (
        <>
            {/* <GlobalProvider>
            <LoginProvider> */}
            {children[0]}
            <div id="wrapper" className="sitemap">
                {/* <Header /> */}
                <header>
                    <div className="lay">
                        <Logo
                            color
                            size="--sm"
                            logoName="la-nacion"
                            href="https://www.lanacion.com.ar/"
                            title="LA NACION"
                        />
                    </div>
                </header>
                <main>
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
            {/* </LoginProvider>
        </GlobalProvider> */}
        </>
    );
};

const pageBuilderSections = ['Cuerpo'];

LNMapaDelSitio.sections = pageBuilderSections;

LNMapaDelSitio.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default LNMapaDelSitio;
