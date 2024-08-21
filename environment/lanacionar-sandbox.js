export default {
    IS_DEV: 'false',
    IS_SANDBOX: 'true',
    API_ENV: 'sandbox',
    RANKING_URL:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygHbvhzM7N/1VqWBWWCSB4BkAAAA9DCB8QYJKoZIhvcNAQcGoIHjMIHgAgEAMIHaBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDCh+jeuLh3vFdbvoZgIBEICBrBfhWaHiwfcVU+lITUpTUEAUw4YrxGgFldk4xQFCU8bR7zjjSm9N44UbwGZoMhvJl2R7d8/sx/iNMOattoU4a3BcSmTTrWruS6XZ0ugsWJsJ+tvb23mA3Ym9AqCGQmgC5aZdd8DD3qdqM/40cnjwIzb0+ZiCy21jH5OitS5OEmb728IIfD0/nqfhW1mquFeV9hjtLFRObJSOXk0Vb04JbVSa4uj/Q692o9r9wgQ=}', //NOSONAR
    LANACIONAR_URLASSETS:
        'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com',
    OPTA_WIDGET_URL: 'https://arc-widgets.lanacion.com.ar/opta-embed',
    SITE_LANACION: 'https://sandbox.lanacion.com.ar',
    SITE_RECETAS:
        'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com',
    WIDGETS: 'li-nacion-recommended-item-template-1',
    LIFTIGNITER_X_API_KEY:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygH6oXmB5Oc9xSzw5eN7V621AAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDDxWBK9CrT9d4MtHbQIBEIA/6Nwvwk1Lsiuz4g+jxjJkvlYpkxBMUnUf1zlQ2HrTW4ZORvA9jfO2P3FgVA35xvLdc00hm9jkkSaIVYKkUXPo}', //NOSONAR
    JSK_ID:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygEVr42BnMp3X/xiq4mYxhNRAAAAbjBsBgkqhkiG9w0BBwagXzBdAgEAMFgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMMJkLlbI3ku0UaYK6AgEQgCsYTpwEAAWr+ASzy+7LguXottQzsdBvZxQgd0VZopz3OYzVquvzD0iZ2urE}', //NOSONAR
    DATADOG_CONFIG: {
        ott: {
            clientTokenLogs: 'pubade9c9853f15148d022beacd85e783ca',
            clientTokenRum: 'pub0d012ddef45dd12da168f6a3dfa65e8d',
            applicationId: '4021f7bc-025e-422c-a79d-1fac9a7a0767',
            site: 'datadoghq.com',
            forwardErrorsToLogs: true,
            sampleRateLog: 20,
            sampleRateRum: 20,
            service: 'lnmas',
            env: 'sandbox',
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
            env: 'sandbox',
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
            env: 'sandbox',
            sessionReplaySampleRate: 30,
            trackResources: true,
            trackLongTasks: true,
            trackUserInteractions: true,
            trackSessionAcrossSubdomains: false,
            defaultPrivacyLevel: 'mask-user-input'
        }
    },
    ARC_STATIC: 'https://sandbox.lanacion.com.ar',
    VIAFOURA_UUID: '00000000-0000-4000-8000-5f9c7a4aa083',
    VIAFOURA_XREQUEST:
        '+A5uYQkKRlUYelDeXhW0I88A7/UVYGFtIugKIur9dtQE9dx7srvdJiI+ZSJZ2YsE',
    ARC_WIDGETS: 'https://sandbox-arc-widgets.lanacion.com.ar/widgets/',
    LANACION_SERVICES_URL: 'https://pre-arcservices.lanacion.com.ar',
    //TODO: apuntar a QA la api personalizacion nuevamente cuando reestablezcan QA
    PERSONALIZACION_API:
        'https://api-personalizacion.lanacion.com.ar/personalizacion/v1/zones/lanacion/',
    PERSONALIZACION_APIV2:
        'https://api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/lanacion/',
    PERSONALIZACION_API_FOODIT:
        'https://api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/foodit/',
    BOOKMARK_URL:
        'https://sandbox.lanacion.com.ar/pf/mis-notas/?_website=la-nacion-ar',
    AUDIO_NEWS_URL: 'https://qa-audionews.lanacion.com.ar/api/v1/audio/status/',
    AUDIONEWS_URL: 'https://qa-api-audios.lanacion.com.ar/status/',
    AUDIONEWS_APIKEY: 'iviw9999Fp1pqX7e6c18n4VwvChUctzu1DraBnAE',
    API_KEY_ARC_SERVICES:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygGVtL6D05n1qBS+FZ1snZ2aAAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDJkSKWmqE+lK4ElWVwIBEIA/hXbb5b5JTYv6ym8qNVzsywSH90F+dkEDnYqOW/3Vwbqn05Z6BtLO+bNFeiIaM7G8otc9bJ5LmGMyjgfUwJFq}',
    API_KEY_ARC_SERVICES_PROD:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygF2kMZIhz29Q30zHF2gdKgSAAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDDoOvd6Q+DEhTuuDnQIBEIA/m6WCr7UFsNakDXPYPewFGKeb0EAxOH5CGWHIr3uBrJzPVuSy4o0+Wdz0cSI6xB65uEELKyJkHF/rUfoOuQbQ}',
    VIDEO_CDN_URL: 'https://lanacionar-sandbox.video.arc-cdn.net/',
    // TODO: CUando reestablezcan QA cambiar a URL de QA
    LOGIN_URL: 'https://pre-ingresar.lanacion.com.ar/auth0-login/?callback=',
    // TODO: CUando reestablezcan QA cambiar a URL de QA
    FOODIT_LOGIN_URL:
        'https://pre-ingresar.lanacion.com.ar/login/ingresar/S/19/?callback=',
    // TODO: CUando reestablezcan QA cambiar a URL de QA
    API_INGRESAR: 'https://pre-api-ingresar.lanacion.com.ar',
    MARFEEL_ACCOUNT_ID: '3353',
    BEYONDWORDS_PROJECT_ID: 38983,
    JWP_TOKEN:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygHlA2jUvxj+ey+zZiBAe3MOAAAApjCBowYJKoZIhvcNAQcGoIGVMIGSAgEAMIGMBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDN2vbS7VCeoGV3LfoAIBEIBfPdrJEEeMvrvz/07ci9dEJt+nfOY4JzanaHtPLHc4lX73pXElrzPGYyKLjqxbO+C+93w8N+t1vB6ejcAzfVbHj4N+HtgNFhSFG3kjO5gRwIp0kBsmYrKX78PJgtie3Y4=}',
    API_CONVIVENCIA_TOKEN: 'Fwm2XQ4Llr6dwzu08V6xT8cZuNuKVrd28RAYUJhV',
    SITE_OTT: 'https://lnmas.lanacion.com.ar',
    SITE_FOODIT: 'https://sandbox-foodit.lanacion.com.ar',
    MY_ACCOUNT_URL: 'https://qa-myaccount.lanacion.com.ar',
    // TODO: Queda comentado hasta que habiliten qa
    // SITIO_SEGURO_REGISTRACION: 'https://qa-swg-ln9.lanacion.com.ar',
    SITIO_SEGURO_REGISTRACION: 'https://pre-suscripciones.lanacion.com.ar/',
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
    API_NOTIFICATION: 'https://qa-notificaciones.lanacion.com.ar/api/'
};
