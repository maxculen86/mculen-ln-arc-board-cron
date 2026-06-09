export default {
    /**
     * 🛠️ Configuración de variables de entorno para el entorno de desarrollo.
     * 🔁 Para alternar entre producción y sandbox, ajusta las siguientes líneas:
     */
    // ** 🚀 Variables de producción (descomentar para usar):
    // IS_SANDBOX: 'false',
    // API_ENV: 'prod',
    // SITE_LANACION: 'https://www.lanacion.com.ar',
    // RESIZER_URL: 'https://resizer.glanacion.com/resizer',
    // RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
    // ** 🏖️ Variables de entorno actuales para sandbox:
    IS_SANDBOX: 'true',
    API_ENV: 'sandbox',
    SITE_LANACION: 'https://sandbox.lanacion.com.ar',
    SITE_FOODIT: 'https://sandbox-foodit.lanacion.com.ar',
    API_QUERYLY: 'https://api.queryly.com',
    // API_KEY_QUERYLY se deja sin encriptar para que esté disponible en el cliente
    // Esta clave es de solo lectura (GET requests) y es segura para exponer
    API_KEY_QUERYLY: '2bf85a66b5f04de9',
    API_KEY_QUERYLY_LN: '8075c0c1c4c44847',
    RESIZER_URL: 'https://sandbox-resizer.glanacion.com/resizer',
    RESIZER_URL_PUBLIC: 'https://sandbox-resizer.glanacion.com',
    // Fin variables de sandbox

    // 🔐 Claves API y configuración:
    LIFTIGNITER_X_API_KEY:
        '%{AQICAHh/411m8FGwOHtrUTs9KkxN3n0LVOK3XAvOUKflIN5VygH4H8MiTVHZCbdSuL7xddF4AAAAgzCBgAYJKoZIhvcNAQcGoHMwcQIBADBsBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDHe+801QKRWObkNsMAIBEIA/+JYrRgViUeZiux4Xx9AYqmEhA6cKtfM+dnDk+EbdKHGGSKcmrcaSQFYRToSVNw0bTAHsmp6d3pfGxrYHrwZU}',
    JSK_ID: '8561ps8ov66e7mim',
    OPTA_WIDGET_URL: 'http://arc-widgets.lanacion.com.ar/opta-embed',
    ARC_STATIC: 'http://arc.lanacion.com.ar',
    WIDGETS: 'li-nacion-recommended-item-template-1',
    IS_DEV: 'true',
    CONTENT_TIMEOUT: '8000000',
    CLL_HTMLTFREE_DOMAIN: 'https://qa-canchallena.lanacion.com.ar/especiales',
    AUDIONEWS_URL: 'https://qa-api-audios.lanacion.com.ar/status/',
    AUDIONEWS_APIKEY: 'iviw9999Fp1pqX7e6c18n4VwvChUctzu1DraBnAE',
    LANACION_ECONOMIC_URL:
        'https://especialess3.lanacion.com.ar/data_jsons/indices'
};
