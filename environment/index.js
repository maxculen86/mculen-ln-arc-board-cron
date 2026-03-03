const DATADOG_DOMAIN = 'datadoghq.com';
const MASK_USER_INPUT = 'mask-user-input';
export default {
    IS_DEV: false,
    API_ENV: 'prod',
    RESIZER_URL: 'https://resizer.glanacion.com/resizer',
    RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
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
    OPTA_WIDGET_URL: 'https://arc-widgets.lanacion.com.ar/opta-embed',
    LANACIONAR_URLASSETS:
        'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com',
    SITE_LANACION: 'https://www.lanacion.com.ar',
    SITE_RECETAS: 'https://www.lanacion.com.ar/recetas/',
    WIDGETS: 'li-nacion-recommended-item-template-1',
    LIFTIGNITER_X_API_KEY:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygH6oXmB5Oc9xSzw5eN7V621AAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDDxWBK9CrT9d4MtHbQIBEIA/6Nwvwk1Lsiuz4g+jxjJkvlYpkxBMUnUf1zlQ2HrTW4ZORvA9jfO2P3FgVA35xvLdc00hm9jkkSaIVYKkUXPo}', // NOSONAR
    JSK_ID: '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygH+QyVcvBB00Xwj8urCVYyvAAAAbjBsBgkqhkiG9w0BBwagXzBdAgEAMFgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMUYQQ3RWuAEyjE8zpAgEQgCuj3dibucAuSygtWLyaaA65Q5kOwJBTbHqTgWH5Po4ut7uHf7lVCFSm7gwO}', // NOSONAR
    DATADOG_CONFIG: {
        'la-nacion-ar': {
            clientTokenLogs: 'pubaa01cb67f0a687a6eba4718413593f4f',
            clientTokenRum: 'pubaa01cb67f0a687a6eba4718413593f4f',
            applicationId: 'bcea4545-f033-4b09-ab27-30995db5acb0',
            site: DATADOG_DOMAIN,
            forwardErrorsToLogs: true,
            sampleRateLog: 1,
            sampleRateRum: 0.15,
            service: 'lanacion-arc',
            env: 'prod',
            sessionReplaySampleRate: 41,
            trackResources: true,
            trackLongTasks: true,
            trackUserInteractions: true,
            trackSessionAcrossSubdomains: false,
            defaultPrivacyLevel: MASK_USER_INPUT
        },
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
    SEGMENTATION_API:
        'https://segmentacion.clanacion.com.ar/api/segmentacion/v1/segments/',
    SEGMENTATION_APIKEY: 'y7hljarbmb8csv2eg859np9pzrhhox5s98hx',
    API_KEY_ARC_SERVICES:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygF2kMZIhz29Q30zHF2gdKgSAAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDDoOvd6Q+DEhTuuDnQIBEIA/m6WCr7UFsNakDXPYPewFGKeb0EAxOH5CGWHIr3uBrJzPVuSy4o0+Wdz0cSI6xB65uEELKyJkHF/rUfoOuQbQ}',
    API_KEY_ARC_SERVICES_PROD:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygF2kMZIhz29Q30zHF2gdKgSAAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDDoOvd6Q+DEhTuuDnQIBEIA/m6WCr7UFsNakDXPYPewFGKeb0EAxOH5CGWHIr3uBrJzPVuSy4o0+Wdz0cSI6xB65uEELKyJkHF/rUfoOuQbQ}',
    VIDEO_CDN_URL: 'https://lanacionar-prod.video.arc-cdn.net/',
    MARFEEL_ACCOUNT_ID: '3353',
    BEYONDWORDS_PROJECT_ID: 37324,
    BEYONDWORDS_PROJECT_ID_FOODIT: 46980,
    API_CONVIVENCIA_TOKEN: 'Fwm2XQ4Llr6dwzu08V6xT8cZuNuKVrd28RAYUJhV',
    MY_ACCOUNT_URL: 'https://micuenta.lanacion.com.ar',
    SITE_FOODIT: 'https://foodit.lanacion.com.ar',
    API_QUERYLY: 'https://api.queryly.com',
    // API_KEY_QUERYLY se deja publica debido a que se usa del lado del cliente, y ARC solo desencripta
    // del lado del servidor. De igual forma, esta API key solo permite consultas GET a la API del buscador
    API_KEY_QUERYLY: '2bf85a66b5f04de9',
    //   La API Key de Firebase se encuentra pública en el código de las aplicaciones,
    //   debido a que Firebase utiliza esta clave para identificar tu proyecto en lugar de autenticar peticiones.
    //   Es importante destacar que esta API Key no proporciona acceso directo a los recursos de Firebase sin la configuración adecuada de las reglas de seguridad.
    //   Desde la consola de Firebase y Google Cloud, se pueden configurar restricciones en la API Key para limitar su uso,
    //   como restringir los dominios desde los que se puede utilizar (HTTP referrers) o las IPs permitidas.
    //   Para más información, puedes consultar la documentación oficial:
    //   - https://firebase.google.com/docs/projects/api-keys
    //   - https://cloud.google.com/docs/authentication/api-keys
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
    CLL_HTMLFREE_DOMAIN: 'https://canchallena.lanacion.com.ar/especiales',
    STRAPI_API_URL: 'https://admin-lanacion.lnapps.com.ar',
    STRAPI_API_KEY:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygEJu5rfF1t9Qsx5MQOhB4ETAAABaDCCAWQGCSqGSIb3DQEHBqCCAVUwggFRAgEAMIIBSgYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAyC/1rJAVZXY+K6n5ECARCAggEbJEft25Hxrl2+UtGW4speBYB4T7NeO165MIn/kJc3T3vZr3I9SHJyjPBseYZRUYStoQPf2XVQCsudo8eB7k8Tvl1huKLpTYEacAk5q6fwxpX1fvhbdq+Go0czkOyp16Fpnq+lek2XYW/2xDg+Mzkpg/Gt3aHk5CRNKgtJcen8w5cSzeVKLuKOUga+PenGCtRzxXrsI2r4dhYlvEdRASWFfEDwjuwWYD+dlbFfuUWhzVTTyCharut/ZAOksudjXE9OEO0B1Z4O9x+HOSBFGe/9Lbaw3+iOxOap/kn+F7H/LRlnlXLPOqgG3tNmFbArHuyb8OunWpRkjKB4OuNK8KVHGVKAAkWpquSThd9Hp519o75NlnWVVVjuMXBs6A==}',
    GOOGLE_ONE_TAP:
        '728122563439-mocsbse1177di5ncrjt20tdptu49ocog.apps.googleusercontent.com',
    LANACION_ECONOMIC_URL:
        'https://especialess3.lanacion.com.ar/data_jsons/indices'
};
