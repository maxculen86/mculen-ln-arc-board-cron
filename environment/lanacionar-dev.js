const urlSandboxArcPublishing =
    'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com';

export default {
    IS_DEV: 'true',
    IS_SANDBOX: 'true',
    API_ENV: 'sandbox',
    RANKING_URL:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygHvArd3vNTVbEIdqek5qVFOAAAA9DCB8QYJKoZIhvcNAQcGoIHjMIHgAgEAMIHaBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDGfXmCwlTipuJajo1gIBEICBrDramRDrIg5zeki6aUV1h40ZQlmNVH1jfWZTyJbmdHOMPSBQft2s64nNfhttuktf7+1Sss4g/f0arqUtcmEUTDvOMa2xO8ODNavc8EhYPE0bJpdXgnzKfzw2DyzR2Yumyw88IISoKERQWLv4nbffor8FhyVURwPQ5UBsU/Oq0X5BFNakgho251OeEKBh2ffuNLdFmRRxczyJu75GTYaF+jieSuu3YiPqpVtBm00=}', //NOSONAR
    LANACIONAR_URLASSETS: urlSandboxArcPublishing,
    OPTA_WIDGET_URL: 'https://sandbox.lanacion.com.ar/opta-embed',
    SITE_LANACION: urlSandboxArcPublishing,
    SITE_RECETAS: urlSandboxArcPublishing,
    WIDGETS: 'li-nacion-recommended-item-template-1',
    LIFTIGNITER_X_API_KEY:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygHbKwh8sDdbr5fnLbVosC8eAAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDDiYpapEfqjsBI2jYAIBEIA/nTts/bkXZTMJLnSuQ0haU3hS9mDU/pcq/cnjX4Yumbkbp6Ggk4ceDxDajfYMGuyBCeupJtT7CqrJBUDnWx47}', //NOSONAR
    JSK_ID:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygHPMCo5X02LqkaZLrXomkFvAAAAbjBsBgkqhkiG9w0BBwagXzBdAgEAMFgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQM+Gs5pmF0+Umjtjx8AgEQgCs+4a1XWei5yHUiPhGKw2kBOg/pThoXc4ApUTb5YohOvC3E0oV5wFMUlJoo}', //NOSONAR
    DATADOG_CONFIG: {
        ott: {
            clientTokenLogs: 'pubade9c9853f15148d022beacd85e783ca',
            clientTokenRum: 'pub0d012ddef45dd12da168f6a3dfa65e8d',
            applicationId: '4021f7bc-025e-422c-a79d-1fac9a7a0767',
            site: 'datadoghq.com',
            forwardErrorsToLogs: true,
            sampleRateLog: 0.2,
            sampleRateRum: 0.02,
            service: 'lnmas',
            env: 'dev',
            trackInteractions: true,
            trackSessionAcrossSubdomains: false
        },
        'la-nacion-ar': {
            clientTokenLogs: 'pubaa01cb67f0a687a6eba4718413593f4f',
            clientTokenRum: 'pubaa01cb67f0a687a6eba4718413593f4f',
            applicationId: 'bcea4545-f033-4b09-ab27-30995db5acb0',
            site: 'datadoghq.com',
            forwardErrorsToLogs: true,
            sampleRateLog: 100,
            sampleRateRum: 100,
            service: 'lanacion-arc',
            env: 'dev',
            trackInteractions: true,
            trackSessionAcrossSubdomains: false
        }
    },
    ARC_STATIC: '',
    VIAFOURA_UUID: '00000000-0000-4000-8000-43ce53965c44',
    VIAFOURA_XREQUEST:
        'cq4Xr6peiyYAhuLxRBq/ozZD+TOR0BiHnofsJWLLbi59gsFl9mRE6Xdzi/eBGed+',
    ARC_WIDGETS: 'https://dev.lanacionar.arcpublishing.com/widgets/',
    LANACION_SERVICES_URL: 'https://arcservices.lanacion.com.ar',
    PERSONALIZACION_API:
        'https://qa-api-personalizacion.lanacion.com.ar/personalizacion/v1/zones/lanacion/',
    BOOKMARK_URL:
        'https://dev.lanacionar.arcpublishing.com/pf/mis-notas/?_website=la-nacion-ar'
};
