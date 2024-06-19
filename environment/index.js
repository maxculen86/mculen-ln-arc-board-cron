export default {
    IS_DEV: false,
    API_ENV: 'prod',
    RESIZER_URL: 'https://resizer.glanacion.com/resizer',
    RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
    RESIZER_KEY:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygFBlPZMQdmI1mewscHTzb/BAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMAyE1bawAzVQX0z2mAgEQgDsU2eFLGS7c9DKgHAiRtFqUlI1iDycLd4NJQOX7QpYVZjTiLT9AUmFefdVOop88yABc4R+YYCzSh24wCA==}', //NOSONAR
    API_INGRESAR: 'https://api-ingresar.lanacion.com.ar',
    RELOGIN_VALIDATION: '8121600000',
    SITIO_SEGURO_REGISTRACION: 'https://suscripciones.lanacion.com.ar',
    LOGIN_URL: 'https://ingresar.lanacion.com.ar/login/ingresar/D/1/?callback=',
    FOODIT_LOGIN_URL:
        'https://ingresar.lanacion.com.ar/login/ingresar/S/19/?callback=',
    COOKIE_EXPIRATION: '8640000000',
    DOMINIO_COOKIE: '.lanacion.com.ar',
    RANKING_URL:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygEvVtWN/N+5GpAPlrm4TREvAAAA9DCB8QYJKoZIhvcNAQcGoIHjMIHgAgEAMIHaBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDNmt+JpSIOcOFmOzZAIBEICBrLsDCDh1UoBoXtAJWTqpeiqOMFJj821gGFwtbNsuqAshpm/UcBJaF6fGBv1XoDsTRDdayM6pJTVBml+vnRZRaXM361RMuG5PkRHXH0m2p0hxkNyg/QYtTBMfJahKdYuNfCXtj1n+WPQA/YZ+QReY2c8ZZ0ADJ8SxLjTpUboaQtZgjDQ+j5rf+XWg7mVPb9wqzmueNMQa7RHUWNXMBg6Pxz+2NPUo+ZmLjrUfuKE=}', //NOSONAR
    OPTA_WIDGET_URL: 'https://arc-widgets.lanacion.com.ar/opta-embed',
    LANACIONAR_URLASSETS:
        'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com',
    SITE_LANACION: 'https://www.lanacion.com.ar',
    SITE_RECETAS: 'https://www.lanacion.com.ar/recetas/',
    WIDGETS: 'li-nacion-recommended-item-template-1',
    LIFTIGNITER_X_API_KEY:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygH6oXmB5Oc9xSzw5eN7V621AAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDDxWBK9CrT9d4MtHbQIBEIA/6Nwvwk1Lsiuz4g+jxjJkvlYpkxBMUnUf1zlQ2HrTW4ZORvA9jfO2P3FgVA35xvLdc00hm9jkkSaIVYKkUXPo}', //NOSONAR
    JSK_ID:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygH+QyVcvBB00Xwj8urCVYyvAAAAbjBsBgkqhkiG9w0BBwagXzBdAgEAMFgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMUYQQ3RWuAEyjE8zpAgEQgCuj3dibucAuSygtWLyaaA65Q5kOwJBTbHqTgWH5Po4ut7uHf7lVCFSm7gwO}', //NOSONAR
    DATADOG_CONFIG: {
        ott: {
            clientTokenLogs: 'pubade9c9853f15148d022beacd85e783ca',
            clientTokenRum: 'pub0d012ddef45dd12da168f6a3dfa65e8d',
            applicationId: '4021f7bc-025e-422c-a79d-1fac9a7a0767',
            site: 'datadoghq.com',
            forwardErrorsToLogs: true,
            sampleRateLog: 20,
            sampleRateRum: 7,
            service: 'lnmas',
            env: 'prod',
            sessionReplaySampleRate: 30,
            trackResources: true,
            trackLongTasks: true,
            trackUserInteractions: true,
            trackSessionAcrossSubdomains: false,
            defaultPrivacyLevel: 'mask-user-input'
        },
        'la-nacion-ar': {
            clientTokenLogs: 'pubaa01cb67f0a687a6eba4718413593f4f',
            clientTokenRum: 'pubaa01cb67f0a687a6eba4718413593f4f',
            applicationId: 'bcea4545-f033-4b09-ab27-30995db5acb0',
            site: 'datadoghq.com',
            forwardErrorsToLogs: true,
            sampleRateLog: 1,
            sampleRateRum: 0.15,
            service: 'lanacion-arc',
            env: 'prod',
            sessionReplaySampleRate: 30,
            trackResources: true,
            trackLongTasks: true,
            trackUserInteractions: true,
            trackSessionAcrossSubdomains: false,
            defaultPrivacyLevel: 'mask-user-input'
        },
        foodit: {
            clientTokenLogs: 'pub540b3115d2684163d47c67bcb76097a8',
            clientTokenRum: 'pub1ad54b5c46d268e96bf42a24c15ed5be',
            applicationId: '265afe0d-6798-4354-a3d1-e40ce8840c7a',
            site: 'datadoghq.com',
            forwardErrorsToLogs: true,
            sampleRateLog: 1,
            sampleRateRum: 0.15,
            service: 'foodit',
            env: 'prod',
            sessionReplaySampleRate: 30,
            trackResources: true,
            trackLongTasks: true,
            trackUserInteractions: true,
            trackSessionAcrossSubdomains: false,
            defaultPrivacyLevel: 'mask-user-input'
        }
    },
    ARC_STATIC: 'https://arc-static.glanacion.com',
    LAZY_OFFSETTOP: 500,
    VIAFOURA_UUID: '00000000-0000-4000-8000-5611d514abb3',
    VIAFOURA_XREQUEST:
        'QA+b2NU5+pJLVNVOQ2ahGn3bZOAcJKVKVey+ZreIMqYHg2ei2uOcbiKxU4TAsg4X',
    ARC_WIDGETS: 'https://arc-widgets.lanacion.com.ar/widgets/',
    FONT_PRUMO: '/resources/fonts/prumo/Prumo-LNVF.woff2',
    FONT_PRUMO_ITALIC: '/resources/fonts/prumo/Prumo-ItalicLNVF.woff2',
    ROBOTO_LIGHT: '/resources/fonts/roboto/Roboto-Light.woff2',
    ROBOTO_REGULAR: '/resources/fonts/roboto/Roboto-Regular.woff2',
    ROBOTO_MEDIUM: '/resources/fonts/roboto/Roboto-Medium.woff2',
    ROBOTO_BOLD: '/resources/fonts/roboto/Roboto-Bold.woff2',
    LANACION_SERVICES_URL: 'https://arcservices.lanacion.com.ar',
    PERSONALIZACION_API:
        'https://api-personalizacion.lanacion.com.ar/personalizacion/v1/zones/lanacion/',
    PERSONALIZACION_APIV2:
        'https://api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/lanacion/',
    PERSONALIZACION_API_FOODIT:
        'https://api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/foodit/',
    BOOKMARK_URL: 'https://www.lanacion.com.ar/mis-notas/',
    AUDIO_NEWS_URL: 'https://audionews.lanacion.com.ar/api/v1/audio/status/',
    AUDIONEWS_URL: 'https://api-audios.lanacion.com.ar/status/',
    AUDIONEWS_APIKEY: 'xNztQwDUk11h4LPdzzEgvafWAqbFPadn5yxN3sr1',
    API_KEY_ARC_SERVICES: '6a484fb4-8c69-46b1-91ca-c476b055d87f',
    API_KEY_ARC_SERVICES_PROD: '6a484fb4-8c69-46b1-91ca-c476b055d87f',
    VIDEO_CDN_URL: 'https://lanacionar-prod.video.arc-cdn.net/',
    CLL_BACK_BASE_URL: 'https://api-cll-services.lanacion.com.ar/graphql/',
    CLL_BACK_API_KEY: 'da2-6dgg5zavxjdlpmgjs2ztndfnl4',
    MARFEEL_ACCOUNT_ID: '3353',
    BEYONDWORDS_PROJECT_ID: 37324,
    JWP_TOKEN:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygGLUM58BbaA0IDztD/ncA/aAAAApjCBowYJKoZIhvcNAQcGoIGVMIGSAgEAMIGMBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDP0ymvk7Aa4QPi8U6QIBEIBfrjC4+oDkJvJn8tKOIRkjAl1GRYfHmu39S49s7DoJ6Z+NvjmK+aSjmpeJVEftron7lwhHVI1N8uT3OBLJJFL8QcZPxFraWqpPprmPu4CbZ42qCOCNqj3HVI1QkWxPrGE=}',
    API_CONVIVENCIA_TOKEN: 'Fwm2XQ4Llr6dwzu08V6xT8cZuNuKVrd28RAYUJhV',
    SITE_OTT: 'https://lnmas.lanacion.com.ar',
    MY_ACCOUNT_URL: 'https://myaccount.lanacion.com.ar',
    SITE_FOODIT: 'https://foodit.lanacion.com.ar',
    FIREBASE_CONFIG: {
        apiKey: 'AIzaSyCFxG5eKZiyU1DDlg7yZw4JzblfO6pc0m4',
        authDomain: 'lanacion-92a91.firebaseapp.com',
        databaseURL: 'https://lanacion-92a91.firebaseio.com',
        messagingSenderId: '221085116662',
        projectId: 'lanacion-92a91',
        storageBucket: 'lanacion-92a91.appspot.com'
    },
    API_NOTIFICATION: 'https://notificaciones.lanacion.com.ar/api/'
};
