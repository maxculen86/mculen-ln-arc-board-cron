import React from 'react';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import getAssetsPath from '../../common/utils/getAssetsPath';
import { SITIO_SEGURO_REGISTRACION, SITE_LANACION } from 'fusion:environment';
import { datesDiffInDays } from '../../common/utils/dateAndTimeUtil';
import {
    getArgentinaDateMonthYear,
    getArgentinaYear,
} from '../../common/utils/dateAndTimeUtil';

export const optionsIcons = (contextPath, deployment) => {
    const url = (asset) => getAssetsPath(contextPath)(deployment)(asset);
    return {
        laNacion: (
            <Adaptableimage
                src={url('la-nacion.webp')}
                alt="App store"
                className="w-100"
            />
        ),
        facebook: <IconSprite name="facebook" fill="#333333" />,
        twitter: <IconSprite name="twitter" fill="#333333" />,
        instagram: <IconSprite name="instagram" fill="#333333" />,
        rss: <IconSprite name="rss" fill="#333333" />,
        storesAndroid: (
            <Adaptableimage
                src={url('android-store.webp')}
                alt="App store"
                className="w-100"
            />
        ),
        storesIos: (
            <Adaptableimage
                src={url('app-store.webp')}
                alt="App store"
                className="w-100"
            />
        ),
        gdaXs: (
            <Adaptableimage
                src={url('gda.webp')}
                alt="App store"
                className="w-100"
            />
        ),
        dataFiscal: (
            <Adaptableimage
                src={url('data-fiscal.webp')}
                alt="App store"
                className="w-100"
            />
        ),
    };
};
export const commonPropsFooter = (text, href) => {
    return {
        ...(text && { text }),
        ...(href && { href }),
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
        'https://edicionimpresa.lanacion.com.ar/la-nacion?_ga=2.226421138.948268382.1669638459-1845108145.1619557251/',
    ),
    commonPropsFooter('LN+', 'https://lnmas.lanacion.com.ar/'),
    commonPropsFooter('Club LA NACION', 'https://club.lanacion.com.ar/'),
];

export const revistas = [
    commonPropsFooter('OHLALÁ!', 'https://www.somosohlala.com/'),
    commonPropsFooter('¡HOLA!', `${SITE_LANACION}/revista-hola/`),
    commonPropsFooter('LIVING', `${SITE_LANACION}/revista-living/`),
    commonPropsFooter('JARDÍN', `${SITE_LANACION}/revista-jardin/`),
    commonPropsFooter('LUGARES', `${SITE_LANACION}/revista-lugares/`),
    commonPropsFooter('ROLLING STONE', 'https://es.rollingstone.com/arg/'),
];

export const productos = [
    commonPropsFooter('Bonvivir', 'https://bonvivir.com/'),
    commonPropsFooter('Colecciones', 'https://colecciones.lanacion.com.ar'),
    commonPropsFooter(
        'Máster en periodismo',
        'https://www.utdt.edu/ver_contenido.php?id_contenido=1111&id_item_menu=2327',
    ),
    commonPropsFooter(
        'Fundación LA NACION',
        'https://fundacionlanacion.org.ar/',
    ),
];

export const masInformacion = [
    commonPropsFooter('Mapa del sitio', `${SITE_LANACION}/mapa-del-sitio/`),
    commonPropsFooter(
        'Ayuda',
        'https://www.contacto.lanacion.com.ar/ayuda?_ga=2.125953413.948268382.1669638459-1845108145.1619557251',
    ),
    commonPropsFooter(
        'Atención al socio',
        'https://club.lanacion.com.ar/ayuda/',
    ),
    commonPropsFooter(
        'Términos y condiciones',
        'https://www.contacto.lanacion.com.ar/tyc?_ga=2.125953413.948268382.1669638459-1845108145.1619557251/',
    ),
    commonPropsFooter('¿Cómo anunciar?', 'https://www.lanacion.in/'),
    commonPropsFooter(
        'Suscribirse al diario impreso',
        `${SITIO_SEGURO_REGISTRACION}/suscribirme?_ga=2.159335858.948268382.1669638459-1845108145.1619557251/`,
    ),
];

export const getEditionDetails = () => {
    const refDate = new Date('1995-12-13T03:00:00');
    const currentDate = new Date();
    const edDetails = {
        edNumber: datesDiffInDays(refDate, currentDate),
        edDate: {
            date: getArgentinaDateMonthYear(),
            year: getArgentinaYear(),
        },
    };
    return edDetails;
};

export default commonPropsFooter;
