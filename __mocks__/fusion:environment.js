import React from 'react';

jest.mock('fusion:environment', () => {
    return {
        IS_DEV: false,
        IS_SANDBOX: false,
        API_ENV: 'prod',
        RESIZER_URL: 'https://resizer.glanacion.com/resizer',
        RESIZER_KEY: 'Fmkgru2rZ2uPZ5wXs7B2HbVDJHDkdoi5',
        API_INGRESAR: 'https://api-ingresar.lanacion.com.ar',
        RELOGIN_VALIDATION: '8121600000',
        SITIO_SEGURO_REGISTRACION: 'https://ingresar.lanacion.com.ar',
        LOGIN_URL:
            'https://ingresar.lanacion.com.ar/login/ingresar/D/1/?callback=',
        COOKIE_EXPIRATION: '8640000000',
        DOMINIO_COOKIE: '.lanacion.com.ar',
        OPTA_WIDGET_URL: 'https://www.lanacion.com.ar/recetas/opta-embed',
        LANACIONAR_URLASSETS:
            'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com',
        SITE_LANACION: 'https://www.lanacion.com.ar',
        SITE_RECETAS: 'https://www.lanacion.com.ar/recetas/',
        LANACION_SERVICES_URL: 'https://arcservices.lanacion.com.ar',
        PERSONALIZACION_API:
            'https://api-personalizacion.lanacion.com.ar/personalizacion/v1/zones/lanacion/',
        PERSONALIZACION_APIV2:
            'https://api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/lanacion/',
        MARFEEL_ACCOUNT_ID: 'test-id'
    };
});
