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
        descriptionProps: {
            text: 'Disfrutá de Crucigrama, Palabra oculta y todos tus pasatiempos favoritos.'
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
        href: 'https://www.lanacion.com.ar/comunidad/violencia-de-genero-nid08032024/',
        title: 'Recibir asistencia en casos de violencia de género',
        target: '_blank',
        imgDsk: 'violencia-genero-desk.webp',
        imgMob: 'violencia-genero-mob.webp',
        imgAlt: 'Imagen de asistencia contra violencia de género',
        imgClassName: 'w-100',
        logoAlt: 'Logo de asistencia contra violencia de género',
        logoWidth: 150,
        label: 'violencia_genero',
        descriptionProps: {
            title: 'Violencia de género',
            text: 'Si estás pasando por una situación de violencia de género, te invitamos a recibir ayuda profesional y apoyo. Haz clic aquí para más información.',
            classnames: {
                title: 'prumo --prumo-italic prumo-slab text-28 font-bold text-neutral-light-800 uppercase text-center text-start_m w-160_max512 w-width_min512',
                text: 'prumo prumo-slab prumo-medium text-18 text-center text-initial_m text-neutral-light-800',
                button: 'mb-24_m'
            }
        }
    }
};

export default zocaloOptions;
