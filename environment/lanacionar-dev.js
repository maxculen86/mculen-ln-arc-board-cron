const urlSandboxArcPublishing =
    'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com';
const DATADOG_DOMAIN = 'datadoghq.com';
const MASK_USER_INPUT = 'mask-user-input';

export default {
    IS_DEV: 'true',
    IS_SANDBOX: 'true',
    API_ENV: 'sandbox',
    LANACIONAR_URLASSETS: urlSandboxArcPublishing,
    OPTA_WIDGET_URL: 'https://sandbox.lanacion.com.ar/opta-embed',
    SITE_LANACION: 'https://sandbox.lanacion.com.ar',
    SITE_RECETAS: urlSandboxArcPublishing,
    WIDGETS: 'li-nacion-recommended-item-template-1',
    LIFTIGNITER_X_API_KEY:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygH6oXmB5Oc9xSzw5eN7V621AAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDDxWBK9CrT9d4MtHbQIBEIA/6Nwvwk1Lsiuz4g+jxjJkvlYpkxBMUnUf1zlQ2HrTW4ZORvA9jfO2P3FgVA35xvLdc00hm9jkkSaIVYKkUXPo}', // NOSONAR
    JSK_ID: '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygHPMCo5X02LqkaZLrXomkFvAAAAbjBsBgkqhkiG9w0BBwagXzBdAgEAMFgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQM+Gs5pmF0+Umjtjx8AgEQgCs+4a1XWei5yHUiPhGKw2kBOg/pThoXc4ApUTb5YohOvC3E0oV5wFMUlJoo}', // NOSONAR
    DATADOG_CONFIG: {
        'la-nacion-ar': {
            clientTokenLogs: 'pubaa01cb67f0a687a6eba4718413593f4f',
            clientTokenRum: 'pubaa01cb67f0a687a6eba4718413593f4f',
            applicationId: 'bcea4545-f033-4b09-ab27-30995db5acb0',
            site: DATADOG_DOMAIN,
            forwardErrorsToLogs: true,
            sampleRateLog: 100,
            sampleRateRum: 100,
            service: 'lanacion-arc',
            env: 'dev',
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
            env: 'dev',
            sessionReplaySampleRate: 30,
            trackResources: true,
            trackLongTasks: true,
            trackUserInteractions: true,
            trackSessionAcrossSubdomains: false,
            defaultPrivacyLevel: MASK_USER_INPUT
        }
    },
    ARC_STATIC: '',
    VIAFOURA_UUID: '00000000-0000-4000-8000-43ce53965c44',
    VIAFOURA_XREQUEST:
        'cq4Xr6peiyYAhuLxRBq/ozZD+TOR0BiHnofsJWLLbi59gsFl9mRE6Xdzi/eBGed+',
    ARC_WIDGETS: 'https://dev.lanacionar.arcpublishing.com/widgets/',
    LANACION_SERVICES_URL: 'https://pre-arcservices.lanacion.com.ar',
    PERSONALIZACION_API:
        'https://qa-api-personalizacion.lanacion.com.ar/personalizacion/v1/zones/lanacion/',
    PERSONALIZACION_APIV2:
        'https://qa-api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/lanacion/',
    PERSONALIZACION_API_FOODIT:
        'https://qa-api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/foodit/',
    BOOKMARK_URL:
        'https://dev.lanacionar.arcpublishing.com/pf/mis-notas/?_website=la-nacion-ar',
    AUDIO_NEWS_URL: 'https://qa-audionews.lanacion.com.ar/api/v1/audio/status/',
    AUDIONEWS_URL: 'https://qa-api-audios.lanacion.com.ar/status/',
    AUDIONEWS_APIKEY: 'iviw9999Fp1pqX7e6c18n4VwvChUctzu1DraBnAE',
    SEGMENTATION_API:
        'https://dev-segmentacion.clanacion.com.ar/api/segmentacion/v1/segments/',
    SEGMENTATION_APIKEY: 'mytw1wdyqv4jc7h8s0w6pe3v7x99p3i5a12j',
    API_KEY_ARC_SERVICES:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygGVtL6D05n1qBS+FZ1snZ2aAAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDJkSKWmqE+lK4ElWVwIBEIA/hXbb5b5JTYv6ym8qNVzsywSH90F+dkEDnYqOW/3Vwbqn05Z6BtLO+bNFeiIaM7G8otc9bJ5LmGMyjgfUwJFq}',
    API_KEY_ARC_SERVICES_PROD:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygF2kMZIhz29Q30zHF2gdKgSAAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDDoOvd6Q+DEhTuuDnQIBEIA/m6WCr7UFsNakDXPYPewFGKeb0EAxOH5CGWHIr3uBrJzPVuSy4o0+Wdz0cSI6xB65uEELKyJkHF/rUfoOuQbQ}',
    VIDEO_CDN_URL: 'https://lanacionar-sandbox.video.arc-cdn.net/',
    LOGIN_URL: 'https://qa-ingresar.lanacion.com.ar/auth0-login/?callback=',
    FOODIT_LOGIN_URL:
        'https://qa-ingresar.lanacion.com.ar/login/ingresar/S/19/?callback=',
    API_INGRESAR: 'https://qa-api-ingresar.lanacion.com.ar',
    DATADOME_CLIENT_KEY: '1C321329042F0C72E85C47B9785E6B',
    API_CONVIVENCIA_TOKEN: 'Fwm2XQ4Llr6dwzu08V6xT8cZuNuKVrd28RAYUJhV',
    SITE_FOODIT: 'https://sandbox-foodit.lanacion.com.ar',
    API_QUERYLY: 'https://api.queryly.com',
    // API_KEY_QUERYLY se deja publica debido a que se usa del lado del cliente, y ARC solo desencripta
    // del lado del servidor. De igual forma, esta API key solo permite consultas GET a la API del buscador
    API_KEY_QUERYLY: '2bf85a66b5f04de9',
    MY_ACCOUNT_URL: 'https://qa-myaccount.lanacion.com.ar',
    SITIO_SEGURO_REGISTRACION: 'https://qa-swg-ln9.lanacion.com.ar',
    API_KEY_MINIWALL: 'kvkmcsegzcfo9gml40dcwc9xps287kk5aho6',
    CHECKOUT_URL: 'https://qa-checkout.lanacion.com.ar',
    RESIZER_URL_PUBLIC: 'https://sandbox-resizer.glanacion.com',
    ARC_ACCESS_TOKEN_PROD:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygF+BIuMI/4bA+BMAYGzsVP+AAAAqjCBpwYJKoZIhvcNAQcGoIGZMIGWAgEAMIGQBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDHcvXV2lXbcEj+xiTQIBEIBjNARCe7sf5OlG/fjFVHDKECpsoND6wDQR8lUO6DTes61jWXhI24VfETw/a1LO6J0wtLhz7YeI/ufGnY5cw1Sk8LkW+HZzIbEpSWDym0vcLsTl/r4ZQeWXAvqePW4sm9ZvEBNw}'
};
