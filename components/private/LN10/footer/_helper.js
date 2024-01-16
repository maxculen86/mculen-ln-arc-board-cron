import React from 'react';
import { Facebook, Twitter, Instagram, Rss } from '@ln/contenidos-ui-assets';
import getAssetsPath from '../../common/utils/getAssetsPath';

export const optionsIcons = (contextPath, deployment) => {
    const url = asset => getAssetsPath(contextPath)(deployment)(asset);
    return {
        laNacion: (
            <img
                src={url('la-nacion.webp')}
                alt="Logo de LA NACION"
                className="w-100"
                loading="lazy"
                fetchpriority="low"
                decoding="async"
            />
        ),
        facebook: <Facebook />,
        twitter: <Twitter />,
        instagram: <Instagram />,
        rss: <Rss />,
        storesAndroid: (
            <img
                src={url('android-store.webp')}
                alt="Google app store"
                className="w-100"
                loading="lazy"
                fetchpriority="low"
                decoding="async"
            />
        ),
        storesIos: (
            <img
                src={url('app-store.webp')}
                alt="App store"
                className="w-100"
                loading="lazy"
                fetchpriority="low"
                decoding="async"
            />
        ),
        gdaXs: (
            <img
                src={url('gda.webp')}
                alt="Grupo de Diarios América"
                className="w-100"
                loading="lazy"
                fetchpriority="low"
                decoding="async"
            />
        ),
        dataFiscal: (
            <img
                src={url('data-fiscal.webp')}
                alt="Data fiscal"
                className="w-100"
                loading="lazy"
                fetchpriority="low"
                decoding="async"
            />
        )
    };
};

export const commonPropsFooter = (text, href) => {
    return {
        ...(text && { text }),
        ...(href && { href })
    };
};

export const secciones = [
    commonPropsFooter(
        'Últimas noticias',
        'https://www.lanacion.com.ar/ultimas-noticias/'
    ),
    commonPropsFooter('Política', 'https://www.lanacion.com.ar/politica/'),
    commonPropsFooter('Economía', 'https://www.lanacion.com.ar/economia/'),
    commonPropsFooter('El mundo', 'https://www.lanacion.com.ar/el-mundo/'),
    commonPropsFooter('Sociedad', 'https://www.lanacion.com.ar/sociedad/'),
    commonPropsFooter('Opinión', 'https://www.lanacion.com.ar/opinion/'),
    commonPropsFooter('Deportes', 'https://www.lanacion.com.ar/deportes/'),
    commonPropsFooter('Lifestyle', 'https://www.lanacion.com.ar/lifestyle/'),
    commonPropsFooter(
        'Espectáculos',
        'https://www.lanacion.com.ar/espectaculos/'
    ),
    commonPropsFooter(
        'Edición impresa',
        'https://edicionimpresa.lanacion.com.ar/la-nacion?_ga=2.226421138.948268382.1669638459-1845108145.1619557251/'
    ),
    commonPropsFooter('LN+', 'https://lnmas.lanacion.com.ar/'),
    commonPropsFooter('Club LA NACION', 'https://club.lanacion.com.ar/')
];

export const revistas = [
    commonPropsFooter('OHLALÁ!', 'https://www.somosohlala.com/'),
    commonPropsFooter('¡HOLA!', 'https://www.lanacion.com.ar/revista-hola/'),
    commonPropsFooter('LIVING', 'https://www.lanacion.com.ar/revista-living/'),
    commonPropsFooter('JARDÍN', 'https://www.lanacion.com.ar/revista-jardin/'),
    commonPropsFooter(
        'LUGARES',
        'https://www.lanacion.com.ar/revista-lugares/'
    ),
    commonPropsFooter('ROLLING STONE', 'https://es.rollingstone.com/arg/')
];

export const productos = [
    commonPropsFooter('Bonvivir', 'https://bonvivir.com/'),
    commonPropsFooter('Colecciones', 'https://colecciones.lanacion.com.ar'),
    commonPropsFooter(
        'Máster en periodismo',
        'https://www.utdt.edu/ver_contenido.php?id_contenido=1111&id_item_menu=2327'
    ),
    commonPropsFooter(
        'Fundación LA NACION',
        'https://fundacionlanacion.org.ar/'
    )
];

export const masInformacion = [
    commonPropsFooter(
        'Mapa del sitio',
        'https://www.lanacion.com.ar/mapa-del-sitio/'
    ),
    commonPropsFooter(
        'Ayuda',
        'https://www.contacto.lanacion.com.ar/ayuda?_ga=2.125953413.948268382.1669638459-1845108145.1619557251'
    ),
    commonPropsFooter(
        'Atención al socio',
        'https://club.lanacion.com.ar/ayuda/'
    ),
    commonPropsFooter(
        'Términos y condiciones',
        'https://www.contacto.lanacion.com.ar/tyc?_ga=2.125953413.948268382.1669638459-1845108145.1619557251/'
    ),
    commonPropsFooter('¿Cómo anunciar?', 'https://www.lanacion.in/'),
    commonPropsFooter(
        'Suscribirse al diario impreso',
        'https://suscripciones.lanacion.com.ar/suscribirme?_ga=2.159335858.948268382.1669638459-1845108145.1619557251/'
    )
];

export default commonPropsFooter;
