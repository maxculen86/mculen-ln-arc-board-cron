const DATADOG_DOMAIN = 'datadoghq.com';
const MASK_USER_INPUT = 'mask-user-input';

export default {
    IS_DEV: 'false',
    IS_SANDBOX: 'true',
    API_ENV: 'sandbox',
    LANACIONAR_URLASSETS:
        'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com',
    OPTA_WIDGET_URL: 'https://arc-widgets.lanacion.com.ar/opta-embed',
    SITE_LANACION: 'https://sandbox.lanacion.com.ar',
    SITE_RECETAS:
        'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com',
    WIDGETS: 'li-nacion-recommended-item-template-1',
    LIFTIGNITER_X_API_KEY:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygH6oXmB5Oc9xSzw5eN7V621AAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDDxWBK9CrT9d4MtHbQIBEIA/6Nwvwk1Lsiuz4g+jxjJkvlYpkxBMUnUf1zlQ2HrTW4ZORvA9jfO2P3FgVA35xvLdc00hm9jkkSaIVYKkUXPo}', // NOSONAR
    JSK_ID: '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygEVr42BnMp3X/xiq4mYxhNRAAAAbjBsBgkqhkiG9w0BBwagXzBdAgEAMFgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMMJkLlbI3ku0UaYK6AgEQgCsYTpwEAAWr+ASzy+7LguXottQzsdBvZxQgd0VZopz3OYzVquvzD0iZ2urE}', // NOSONAR
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
            env: 'sandbox',
            sessionReplaySampleRate: 30,
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
            env: 'sandbox',
            sessionReplaySampleRate: 30,
            trackResources: true,
            trackLongTasks: true,
            trackUserInteractions: true,
            trackSessionAcrossSubdomains: false,
            defaultPrivacyLevel: MASK_USER_INPUT
        }
    },
    ARC_STATIC: 'https://sandbox.lanacion.com.ar',
    VIAFOURA_UUID: '00000000-0000-4000-8000-5f9c7a4aa083',
    VIAFOURA_XREQUEST:
        '+A5uYQkKRlUYelDeXhW0I88A7/UVYGFtIugKIur9dtQE9dx7srvdJiI+ZSJZ2YsE',
    ARC_WIDGETS: 'https://sandbox-arc-widgets.lanacion.com.ar/widgets/',
    LANACION_SERVICES_URL: 'https://pre-arcservices.lanacion.com.ar',
    PERSONALIZACION_API:
        'https://qa-api-personalizacion.lanacion.com.ar/personalizacion/v1/zones/lanacion/',
    PERSONALIZACION_APIV2:
        'https://qa-api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/lanacion/',
    PERSONALIZACION_API_FOODIT:
        'https://qa-api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/foodit/',
    API_IA_FOODIT: 'https://qa-foodit-chatbot.clanacion.com.ar',
    API_IA_MUNDIAL: 'https://dp-mundial-chatbot.clanacion.com.ar',
    BOOKMARK_URL:
        'https://sandbox.lanacion.com.ar/pf/mis-notas/?_website=la-nacion-ar',
    AUDIONEWS_URL: 'https://qa-api-audios.lanacion.com.ar/status/',
    AUDIONEWS_APIKEY: 'iviw9999Fp1pqX7e6c18n4VwvChUctzu1DraBnAE',
    SEGMENTATION_API:
        'https://qa-segmentacion.clanacion.com.ar/api/segmentacion/v1/segments/',
    SEGMENTATION_APIKEY: '4eb3veay0sdzr12xuosyb09l6aw32zw8bj6y',
    API_KEY_ARC_SERVICES:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygGVtL6D05n1qBS+FZ1snZ2aAAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDJkSKWmqE+lK4ElWVwIBEIA/hXbb5b5JTYv6ym8qNVzsywSH90F+dkEDnYqOW/3Vwbqn05Z6BtLO+bNFeiIaM7G8otc9bJ5LmGMyjgfUwJFq}',
    API_KEY_ARC_SERVICES_PROD:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygF2kMZIhz29Q30zHF2gdKgSAAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDDoOvd6Q+DEhTuuDnQIBEIA/m6WCr7UFsNakDXPYPewFGKeb0EAxOH5CGWHIr3uBrJzPVuSy4o0+Wdz0cSI6xB65uEELKyJkHF/rUfoOuQbQ}',
    VIDEO_CDN_URL: 'https://lanacionar-sandbox.video.arc-cdn.net/',
    LOGIN_URL: 'https://qa-ingresar.lanacion.com.ar/auth0-login/?callback=',
    FOODIT_LOGIN_URL:
        'https://qa-ingresar.lanacion.com.ar/login/ingresar/S/19/?callback=',
    API_INGRESAR: 'https://qa-api-ingresar.lanacion.com.ar',
    MARFEEL_ACCOUNT_ID: '3353',
    BEYONDWORDS_PROJECT_ID: 38983,
    BEYONDWORDS_PROJECT_ID_FOODIT: 46577,
    API_CONVIVENCIA_TOKEN: 'Fwm2XQ4Llr6dwzu08V6xT8cZuNuKVrd28RAYUJhV',
    SITE_FOODIT: 'https://sandbox-foodit.lanacion.com.ar',
    API_QUERYLY: 'https://api.queryly.com',
    // API_KEY_QUERYLY se deja publica debido a que se usa del lado del cliente, y ARC solo desencripta
    // del lado del servidor. De igual forma, esta API key solo permite consultas GET a la API del buscador
    API_KEY_QUERYLY: '2bf85a66b5f04de9',
    MY_ACCOUNT_URL: 'https://qa-myaccount.lanacion.com.ar',
    SITIO_SEGURO_REGISTRACION: 'https://qa-suscripciones.lanacion.com.ar',
    API_KEY_MINIWALL: 'e17xv5dvp1wrlqygpvh6bjtb0bhrtfkb7q0m',
    CHECKOUT_URL: 'https://qa-checkout.lanacion.com.ar',
    RESIZER_URL_PUBLIC: 'https://sandbox-resizer.glanacion.com',
    //   La API Key de Firebase se encuentra pública en el código de las aplicaciones,
    //   debido a que Firebase utiliza esta clave para identificar tu proyecto en lugar de autenticar peticiones.
    //   Es importante destacar que esta API Key no proporciona acceso directo a los recursos de Firebase sin la configuración adecuada de las reglas de seguridad.
    //   Desde la consola de Firebase y Google Cloud, se pueden configurar restricciones en la API Key para limitar su uso,
    //   como restringir los dominios desde los que se puede utilizar (HTTP referrers) o las IPs permitidas.
    //   Para más información, puedes consultar la documentación oficial:
    //   - https://firebase.google.com/docs/projects/api-keys
    //   - https://cloud.google.com/docs/authentication/api-keys
    FIREBASE_CONFIG: {
        apiKey: 'AIzaSyDx9szVMLkQylr9LN0G3v5faTrMKXyz3rM', // NOSONAR
        authDomain: 'lanaciontest-24eed.firebaseapp.com',
        databaseURL: 'https://lanaciontest-24eed.firebaseio.com',
        messagingSenderId: '247148690244',
        projectId: 'lanaciontest-24eed',
        storageBucket: 'lanaciontest-24eed.appspot.com',
        appId: '1:247148690244:web:067b18e931dd7c55e77511'
    },
    API_NOTIFICATION: 'https://qa-notificaciones.lanacion.com.ar/api/',
    ARC_ACCESS_TOKEN_PROD:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygF+BIuMI/4bA+BMAYGzsVP+AAAAqjCBpwYJKoZIhvcNAQcGoIGZMIGWAgEAMIGQBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDHcvXV2lXbcEj+xiTQIBEIBjNARCe7sf5OlG/fjFVHDKECpsoND6wDQR8lUO6DTes61jWXhI24VfETw/a1LO6J0wtLhz7YeI/ufGnY5cw1Sk8LkW+HZzIbEpSWDym0vcLsTl/r4ZQeWXAvqePW4sm9ZvEBNw}',
    CLL_HTMLFREE_DOMAIN: 'https://qa-canchallena.lanacion.com.ar/especiales',
    STRAPI_API_URL: 'https://qa-admin-lanacion.lnapps.com.ar',
    STRAPI_API_KEY:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygHbcELMW4qDVCqDQCL9KWx+AAABaDCCAWQGCSqGSIb3DQEHBqCCAVUwggFRAgEAMIIBSgYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAzO7x2aMCFnhKJ6aOACARCAggEb1kGg9ijCDHvw+6huUStIg8EI/HEC55gpGNKxCg6i4YZD2Yl3g03RDvAKHDyiKU36nE2RbmxQZUP3gAkfcmDJYJUlPVipsvOYY+lYuanLo4chsjlHCYqvu2DYv2Scsz3M3KQwsMCCxNfiHF0R6Bv82NIdouDyQ4udXZjk1dwMxYlKG37WISiEHnd45+03htZHTGVxMFtIV1+gYW4CfFaFSJlaYJQFHUeqLpIWlVUQ0mAbQE79oJ31Zoc81f/kmtpzxcrTrlc1DHvnkgXuu9m4MIImTiRdoLvc8Po54QDYfdv7c6swScdALMOvlcJ2Pf1pQ03+Iq/DzQh/nOZ+zw2h+tNucu3zMnFIU/rX6gWgZM5HclRjty+bRyF+UQ==}',
    GOOGLE_ONE_TAP:
        '728122563439-mocsbse1177di5ncrjt20tdptu49ocog.apps.googleusercontent.com',
    LANACION_ECONOMIC_URL:
        'https://especialess3.lanacion.com.ar/data_jsons/indices'
};
