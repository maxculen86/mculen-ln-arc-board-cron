const DATADOG_DOMAIN = 'datadoghq.com';
const MASK_USER_INPUT = 'mask-user-input';

export default {
    IS_DEV: false,
    API_ENV: 'prod',
    // TODO: SE PONE LAS DE SANDBOX PARA PROBAR, DESPUES SE DEBE CAMBIAR A LAS DE PROD CUANDO SE CONFIGUREN BIEN LOS ENTORNOS
    /* RESIZER_URL: 'https://resizer.glanacion.com/resizer',
    RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com', */
    RESIZER_URL: 'https://sandbox-resizer.glanacion.com/resizer',
    RESIZER_URL_PUBLIC: 'https://sandbox-resizer.glanacion.com',
    RESIZER_KEY:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygFBlPZMQdmI1mewscHTzb/BAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMAyE1bawAzVQX0z2mAgEQgDsU2eFLGS7c9DKgHAiRtFqUlI1iDycLd4NJQOX7QpYVZjTiLT9AUmFefdVOop88yABc4R+YYCzSh24wCA==}', // NOSONAR
    API_INGRESAR: 'https://api-ingresar.lanacion.com.ar',
    RELOGIN_VALIDATION: '8121600000',
    SITIO_SEGURO_REGISTRACION: 'https://suscripciones.lanacion.com.ar',
    API_KEY_MINIWALL: 'iczvuudwkdtqutw19f9knv7nasquvpzup8ep',
    CHECKOUT_URL: 'https://checkout.lanacion.com.ar',
    LOGIN_URL: 'https://ingresar.lanacion.com.ar/login/ingresar/D/1/?callback=',
    FOODIT_LOGIN_URL:
        'https://ingresar.lanacion.com.ar/login/ingresar/S/19/?callback=',
    COOKIE_EXPIRATION: '8640000000',
    DOMINIO_COOKIE: '.lanacion.com.ar',
    LANACIONAR_URLASSETS:
        'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com',
    SITE_LANACION: 'https://www.lanacion.com.ar',
    SITE_RECETAS: 'https://www.lanacion.com.ar/recetas/',
    SITE_FOODIT: 'https://foodit.lanacion.com.ar',
    DATADOG_CONFIG: {
        foodit: {
            clientTokenLogs: 'pub540b3115d2684163d47c67bcb76097a8',
            clientTokenRum: 'pub1ad54b5c46d268e96bf42a24c15ed5be',
            applicationId: '265afe0d-6798-4354-a3d1-e40ce8840c7a',
            site: DATADOG_DOMAIN,
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
            defaultPrivacyLevel: MASK_USER_INPUT
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
    PERSONALIZACION_API_FOODIT:
        'https://api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/foodit/',
    API_IA_FOODIT: 'https://foodit-chatbot.clanacion.com.ar',
    BOOKMARK_URL: 'https://www.lanacion.com.ar/mis-notas/',
    BEYONDWORDS_PROJECT_ID_FOODIT: 46980,
    MY_ACCOUNT_URL: 'https://micuenta.lanacion.com.ar',
    API_CONVIVENCIA_TOKEN: 'Fwm2XQ4Llr6dwzu08V6xT8cZuNuKVrd28RAYUJhV',
    FIREBASE_CONFIG: {
        apiKey: 'AIzaSyCFxG5eKZiyU1DDlg7yZw4JzblfO6pc0m4', // NOSONAR
        authDomain: 'lanacion-92a91.firebaseapp.com',
        databaseURL: 'https://lanacion-92a91.firebaseio.com',
        messagingSenderId: '221085116662',
        projectId: 'lanacion-92a91',
        storageBucket: 'lanacion-92a91.appspot.com',
        appId: '1:221085116662:web:edf51a66aec1572a2924d7'
    },
    API_NOTIFICATION: 'https://notificaciones.lanacion.com.ar/api/',
    ARC_ACCESS_TOKEN_PROD:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygF+BIuMI/4bA+BMAYGzsVP+AAAAqjCBpwYJKoZIhvcNAQcGoIGZMIGWAgEAMIGQBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDHcvXV2lXbcEj+xiTQIBEIBjNARCe7sf5OlG/fjFVHDKECpsoND6wDQR8lUO6DTes61jWXhI24VfETw/a1LO6J0wtLhz7YeI/ufGnY5cw1Sk8LkW+HZzIbEpSWDym0vcLsTl/r4ZQeWXAvqePW4sm9ZvEBNw}',
    API_KEY_ARC_SERVICES:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygF2kMZIhz29Q30zHF2gdKgSAAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDDoOvd6Q+DEhTuuDnQIBEIA/m6WCr7UFsNakDXPYPewFGKeb0EAxOH5CGWHIr3uBrJzPVuSy4o0+Wdz0cSI6xB65uEELKyJkHF/rUfoOuQbQ}',
    API_KEY_ARC_SERVICES_PROD:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygF2kMZIhz29Q30zHF2gdKgSAAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDDoOvd6Q+DEhTuuDnQIBEIA/m6WCr7UFsNakDXPYPewFGKeb0EAxOH5CGWHIr3uBrJzPVuSy4o0+Wdz0cSI6xB65uEELKyJkHF/rUfoOuQbQ}'
};
