import React from 'react';

jest.mock('fusion:environment', () => {
    return {
        IS_DEV: false,
        IS_SANDBOX: false,
        API_ENV: 'prod',
        RESIZER_URL:
            'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer',
        API_INGRESAR: 'https://api-ingresar.lanacion.com.ar',
        RELOGIN_VALIDATION: '8121600000',
        SITIO_SEGURO_REGISTRACION: 'https://ingresar.lanacion.com.ar',
        LOGIN_URL: 'https://ingresar.lanacion.com.ar/ingresar/D/1/?callback=',
        COOKIE_EXPIRATION: '8640000000',
        DOMINIO_COOKIE: '.lanacion.com.ar',
        RANKING_URL:
            'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/arcio/ans/most-read/',
        OPTA_WIDGET_URL: 'https://recetas.lanacion.com.ar/opta-embed',
        LANACIONAR_URLASSETS:
            'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com',
        SITE_LANACION: 'https://www.lanacion.com.ar',
        SITE_RECETAS: 'https://recetas.lanacion.com.ar'
    };
});
