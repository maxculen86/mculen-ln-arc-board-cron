import React from 'react';

jest.mock('fusion:environment', () => {
    return {
        IS_DEV: false,
        IS_SANDBOX: false,
        API_ENV: 'prod',
        RESIZER_URL:
            'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer',
        RESIZER_KEY: 'Fmkgru2rZ2uPZ5wXs7B2HbVDJHDkdoi5',
        API_INGRESAR: 'https://api-ingresar.lanacion.com.ar',
        RELOGIN_VALIDATION: '8121600000',
        SITIO_SEGURO_REGISTRACION: 'https://ingresar.lanacion.com.ar',
        LOGIN_URL: 'https://ingresar.lanacion.com.ar/ingresar/D/1/?callback=',
        COOKIE_EXPIRATION: '8640000000',
        DOMINIO_COOKIE: '.lanacion.com.ar',
        RANKING_URL:
            'https://2018-09:_04QuWtAkaPLWkF-gdlX1ZHgnd1dqOQ6R62CbBPQ-PmHZwc2CztLI-MUGIJ3a3ctcNjBw3WRwmy_zpvUIYODrv66Tvg4JE8c@api.lanacionar.arcpublishing.com',
        OPTA_WIDGET_URL: 'https://www.lanacion.com.ar/recetas/opta-embed',
        LANACIONAR_URLASSETS:
            'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com',
        SITE_LANACION: 'https://www.lanacion.com.ar',
        SITE_RECETAS: 'https://www.lanacion.com.ar/recetas/'
    };
});
