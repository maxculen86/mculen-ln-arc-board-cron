import React from 'react';
import { Facebook, Twitter, Instagram, Rss } from '@ln/contenidos-ui-assets';
import getAssetsPath from '../../common/utils/getAssetsPath';
import { SITIO_SEGURO_REGISTRACION, SITE_LANACION } from 'fusion:environment';

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
    commonPropsFooter('Últimas noticias', `${SITE_LANACION}/ultimas-noticias/`),
    commonPropsFooter('Política', `${SITE_LANACION}/politica/`),
    commonPropsFooter('Economía', `${SITE_LANACION}/economia/`),
    commonPropsFooter('El mundo', `${SITE_LANACION}/el-mundo/`),
    commonPropsFooter('Sociedad', `${SITE_LANACION}/sociedad/`),
    commonPropsFooter('Opinión', `${SITE_LANACION}/opinion/`),
    commonPropsFooter('Deportes', `${SITE_LANACION}/deportes/`),
    commonPropsFooter('Lifestyle', `${SITE_LANACION}/lifestyle/`),
    commonPropsFooter('Espectáculos', `${SITE_LANACION}/espectaculos/`),
    commonPropsFooter(
        'Edición impresa',
        'https://edicionimpresa.lanacion.com.ar/la-nacion?_ga=2.226421138.948268382.1669638459-1845108145.1619557251/'
    ),
    commonPropsFooter('LN+', 'https://lnmas.lanacion.com.ar/'),
    commonPropsFooter('Club LA NACION', 'https://club.lanacion.com.ar/')
];

export const revistas = [
    commonPropsFooter('OHLALÁ!', 'https://www.somosohlala.com/'),
    commonPropsFooter('¡HOLA!', `${SITE_LANACION}/revista-hola/`),
    commonPropsFooter('LIVING', `${SITE_LANACION}/revista-living/`),
    commonPropsFooter('JARDÍN', `${SITE_LANACION}/revista-jardin/`),
    commonPropsFooter('LUGARES', `${SITE_LANACION}/revista-lugares/`),
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
    commonPropsFooter('Mapa del sitio', `${SITE_LANACION}/mapa-del-sitio/`),
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
        `${SITIO_SEGURO_REGISTRACION}/suscribirme?_ga=2.159335858.948268382.1669638459-1845108145.1619557251/`
    )
];

export default commonPropsFooter;
