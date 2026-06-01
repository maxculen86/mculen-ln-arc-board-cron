const VIOLENCE_BASE_URL =
    'https://www.lanacion.com.ar/comunidad/hablemos-de-todo/hablemos-de-todo-nid09052025/';
const VIOLENCE_BASE_TITLE_SINGULAR = 'IR A LA GUÍA';
const VIOLENCE_BASE_TITLE_PLURAL = 'IR A LAS GUÍAS';
const VIOLENCE_IMAGE_DESKTOP = 'violencia-genero-desk.webp';
const VIOLENCE_IMAGE_MOBILE = 'violencia-genero-mob.webp';
const VIOLENCE_DEFAULT_CLASSNAMES = {
    title: 'prumo --prumo-italic prumo-slab text-28 font-bold text-neutral-light-800 uppercase text-center text-start_m w-160_max512 w-width_min512',
    text: 'prumo prumo-slab prumo-medium text-18 text-center text-initial_m text-neutral-light-800',
    button: 'mb-24_m'
};

const zocaloOptions = {
    deportes: {
        href: 'https://canchallena.lanacion.com.ar/',
        title: 'Ir a Canchallena',
        target: '_blank',
        imgDsk: 'cll_web-image_infobox_desk.webp',
        imgMob: 'cll_web-image_infobox_mob.webp',
        imgAlt: 'Imagen de celular con la app de Canchallena',
        imgClassName: 'w-100',
        logo: 'cll-logo.webp',
        logoAlt: 'Logo de Canchallena',
        label: 'canchallena',
        descriptionProps: {
            text: 'Encontrá resultados de fútbol en vivo, los próximos partidos, las tablas de posiciones, y todas las estadísticas de los principales torneos del mundo.'
        }
    },

    juegos: {
        href: 'https://www.lanacion.com.ar/juegos/',
        title: 'Ir a Juegos',
        imgDsk: 'promo-juegos_dsk.webp',
        imgMob: 'promo-juegos_mob.webp',
        imgAlt: 'Imagen de celular con la app de LN Juegos',
        imgClassName: 'w-100',
        logo: 'logo-juegos.webp',
        logoAlt: 'Logo de LN Juegos',
        logoClassName: 'w-140_max512',
        label: 'ln_juegos',
        media: {
            type: 'video',
            src: 'https://cdn.jwplayer.com/videos/7HwyZ6xk.mp4',
            className: 'w-210'
        },
        descriptionProps: {
            text: 'Accedé a Juegos de manera ilimitada con tu suscripción.',
            classnames: {
                text: 'w-100 --font-primary --font-medium --font-m text-center text-initial_m text-neutral-light-800'
            }
        }
    },

    recetas: {
        href: 'https://foodit.lanacion.com.ar/',
        title: 'Ir a Foodit',
        target: '_blank',
        imgMob: 'image-mobile-foodit.png',
        imgWidth: 209,
        imgAlt: 'Imagen de celular con la app de Foodit',
        logo: 'logo-foodit.webp',
        logoAlt: 'Logo de Foodit',
        logoWidth: 150,
        label: 'foodit',
        descriptionProps: {
            text: 'Conocé la nueva plataforma culinaria con recetas variadas y probadas, guías de cocina, masterclasses y mucho más, para inspirarte a cocinar y a comer mejor.'
        }
    },
    'violencia-de-genero': {
        href: VIOLENCE_BASE_URL,
        title: VIOLENCE_BASE_TITLE_SINGULAR,
        target: '_blank',
        imgDsk: VIOLENCE_IMAGE_DESKTOP,
        imgMob: VIOLENCE_IMAGE_MOBILE,
        imgAlt: 'Imagen de asistencia contra violencia de género',
        imgClassName: 'w-100',
        logoAlt: 'Logo de asistencia contra violencia de género',
        logoWidth: 150,
        label: 'violencia_genero',
        descriptionProps: {
            title: 'Violencia de género',
            text: 'Entrá a la guía de servicio y encontrá los tips de los expertos sobre cómo prevenir, actuar y encontrar ayuda frente a este problema.',
            classnames: VIOLENCE_DEFAULT_CLASSNAMES
        }
    },
    'hablemos-de-abuso': {
        href: VIOLENCE_BASE_URL,
        title: VIOLENCE_BASE_TITLE_SINGULAR,
        target: '_blank',
        imgDsk: VIOLENCE_IMAGE_DESKTOP,
        imgMob: VIOLENCE_IMAGE_MOBILE,
        imgAlt: 'Imagen de asistencia contra abuso',
        imgClassName: 'w-100',
        logoAlt: 'Logo de asistencia contra abuso',
        logoWidth: 150,
        label: 'abuso',
        descriptionProps: {
            title: 'Abuso',
            text: 'Entrá a la guía de servicio y encontrá los tips de los expertos sobre cómo prevenir, actuar y encontrar ayuda frente a este problema',
            classnames: VIOLENCE_DEFAULT_CLASSNAMES
        }
    },
    'hablemos-de-bullying': {
        href: VIOLENCE_BASE_URL,
        title: VIOLENCE_BASE_TITLE_SINGULAR,
        target: '_blank',
        imgDsk: VIOLENCE_IMAGE_DESKTOP,
        imgMob: VIOLENCE_IMAGE_MOBILE,
        imgAlt: 'Imagen de asistencia contra bullying',
        imgClassName: 'w-100',
        logoAlt: 'Logo de asistencia contra bullying',
        logoWidth: 150,
        label: 'Bullying',
        descriptionProps: {
            title: 'Bullying',
            text: 'Entrá a la guía de Fundación La Nación y encontrá los tips de los expertos sobre cómo prevenir, actuar y encontrar ayuda frente a este problema',
            classnames: VIOLENCE_DEFAULT_CLASSNAMES
        }
    },
    'hablemos-de-suicidio': {
        href: VIOLENCE_BASE_URL,
        title: VIOLENCE_BASE_TITLE_SINGULAR,
        target: '_blank',
        imgDsk: VIOLENCE_IMAGE_DESKTOP,
        imgMob: VIOLENCE_IMAGE_MOBILE,
        imgAlt: 'Imagen de asistencia contra suicidio',
        imgClassName: 'w-100',
        logoAlt: 'Logo de asistencia contra suicidio',
        logoWidth: 150,
        label: 'suicidio',
        descriptionProps: {
            title: 'suicidio',
            text: 'Entrá a la guía de Fundación La Nación y encontrá los tips de los expertos sobre cómo prevenir, actuar y encontrar ayuda frente a este problema',
            classnames: VIOLENCE_DEFAULT_CLASSNAMES
        }
    },
    generico: {
        href: VIOLENCE_BASE_URL,
        title: VIOLENCE_BASE_TITLE_PLURAL,
        target: '_blank',
        imgDsk: VIOLENCE_IMAGE_DESKTOP,
        imgMob: VIOLENCE_IMAGE_MOBILE,
        imgAlt: 'Imagen de asistencia contra abuso',
        imgClassName: 'w-100',
        logoAlt: 'Logo de asistencia contra abuso',
        logoWidth: 150,
        label: 'hablemos de todo',
        descriptionProps: {
            title: '',
            text: 'Encontrá las guías de servicio con tips de los expertos sobre cómo actuar frente a problemas cotidianos: Adicciones, violencia, abuso, tecnología, depresión, suicidio, apuestas online, bullying, transtornos de la conducta alimentaria y más.',
            classnames: VIOLENCE_DEFAULT_CLASSNAMES
        }
    }
};

export default zocaloOptions;
