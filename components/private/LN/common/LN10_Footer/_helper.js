import addEventToDataLayer from '../utils/addEventToDataLayer';

export const commonPropsFooter = (
    text,
    href,
    callback,
    category,
    action,
    event
) => {
    return {
        ...(text && { text }),
        ...(href && { href }),
        ...(callback && {
            callback: () =>
                callback({ category, label: `label: ${text}`, action, event })
        })
    };
};

const staticParameters = [
    addEventToDataLayer,
    'footer',
    'home_ln10',
    'e_linkclick'
];

export const secciones = [
    commonPropsFooter(
        'Últimas noticias',
        'https://www.lanacion.com.ar/ultimas-noticias/',
        ...staticParameters
    ),
    commonPropsFooter(
        'Política',
        'https://www.lanacion.com.ar/politica/',
        ...staticParameters
    ),
    commonPropsFooter(
        'Economía',
        'https://www.lanacion.com.ar/economia/',
        ...staticParameters
    ),
    commonPropsFooter(
        'El mundo',
        'https://www.lanacion.com.ar/el-mundo/',
        ...staticParameters
    ),
    commonPropsFooter(
        'Sociedad',
        'https://www.lanacion.com.ar/sociedad/',
        ...staticParameters
    ),
    commonPropsFooter(
        'Opinión',
        'https://www.lanacion.com.ar/opinion/',
        ...staticParameters
    ),
    commonPropsFooter(
        'Deportes',
        'https://www.lanacion.com.ar/deportes/',
        ...staticParameters
    ),
    commonPropsFooter(
        'Lifestyle',
        'https://www.lanacion.com.ar/lifestyle/',
        ...staticParameters
    ),
    commonPropsFooter(
        'Espectáculos',
        'https://www.lanacion.com.ar/espectaculos/',
        ...staticParameters
    ),
    commonPropsFooter(
        'Edición impresa',
        'https://www.lanacion.com.ar/https://edicionimpresa.lanacion.com.ar/la-nacion?_ga=2.226421138.948268382.1669638459-1845108145.1619557251',
        ...staticParameters
    ),
    commonPropsFooter(
        'LN+',
        'https://lnmas.lanacion.com.ar/',
        ...staticParameters
    ),
    commonPropsFooter(
        'Club LA NACION',
        'https://club.lanacion.com.ar/',
        ...staticParameters
    )
];

export const revistas = [
    commonPropsFooter(
        'OHLALÁ!',
        'https://www.somosohlala.com/',
        ...staticParameters
    ),
    commonPropsFooter(
        '¡HOLA!',
        'https://www.lanacion.com.ar/revista-hola/',
        ...staticParameters
    ),
    commonPropsFooter(
        'LIVING',
        'https://www.lanacion.com.ar/revista-living/',
        ...staticParameters
    ),
    commonPropsFooter(
        'JARDÍN',
        'https://www.lanacion.com.ar/revista-jardin/',
        ...staticParameters
    ),
    commonPropsFooter(
        'LUGARES',
        'https://www.lanacion.com.ar/revista-lugares/',
        ...staticParameters
    ),
    commonPropsFooter(
        'ROLLING STONE',
        'https://es.rollingstone.com/arg/',
        ...staticParameters
    )
];

export const productos = [
    commonPropsFooter('Bonvivir', 'https://bonvivir.com/', ...staticParameters),
    commonPropsFooter(
        'LiBooks',
        'https://www.libooks.com/',
        ...staticParameters
    ),
    commonPropsFooter(
        'Colecciones',
        'https://colecciones.lanacion.com.ar/',
        ...staticParameters
    ),
    commonPropsFooter(
        'Máster en periodismo',
        'https://www.utdt.edu/ver_contenido.php?id_contenido=1111&id_item_menu=2327',
        ...staticParameters
    ),
    commonPropsFooter(
        'Fundación LA NACION',
        'https://fundacionlanacion.org.ar/',
        ...staticParameters
    )
];

export const masInformacion = [
    commonPropsFooter(
        'Mapa del sitio',
        'https://www.lanacion.com.ar/mapa-del-sitio/',
        ...staticParameters
    ),
    commonPropsFooter(
        'Ayuda',
        'https://www.contacto.lanacion.com.ar/ayuda?_ga=2.125953413.948268382.1669638459-1845108145.1619557251',
        ...staticParameters
    ),
    commonPropsFooter(
        'Términos y condiciones',
        'https://www.contacto.lanacion.com.ar/tyc?_ga=2.125953413.948268382.1669638459-1845108145.1619557251',
        ...staticParameters
    ),
    commonPropsFooter(
        '¿Cómo anunciar?',
        'https://www.lanacion.in/',
        ...staticParameters
    ),
    commonPropsFooter(
        'Suscribirse al diario impreso',
        'https://suscripciones.lanacion.com.ar/suscribirme?_ga=2.159335858.948268382.1669638459-1845108145.1619557251',
        ...staticParameters
    )
];

export default commonPropsFooter;
