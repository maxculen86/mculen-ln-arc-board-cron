// import { ELMAH_API_KEY, ELMAH_LOG_ID, SITE_LANACION } from 'fusion:environment';
import getProperties from 'fusion:properties';
// import { resolveConfig } from 'prettier';
// import request from 'request-promise-native';
import get from './get';
import LnError from './LN-Error';

// const URI_ELMAH = `https://api.elmah.io/v3/messages/${ELMAH_LOG_ID}`;

const logger = (() => {
    const push = (e, config, site) => {
        const { loggerOn, loggerExcludedErrors } = getProperties(site) || {
            loggerOn: true,
            loggerExcludedErros: []
        };
        const { statusCode } = e || {};
        // const method = get(e || {}, 'response.request.method', null);
        // const uri = get(e || {}, 'options.uri', null);
        const message = get(e, 'error.message', null);

        if (!loggerOn || loggerExcludedErrors.includes(Number(statusCode || 0)))
            return;

        const { source = 'ARC', url = null, uri = null } = config || {};

        throw new LnError(
            `Status Code: ${statusCode}. Mensaje: ${message}. Source: ${source}. Url: ${url ||
                uri}`,
            {
                customErrorType: 'controlado'
            }
        );

        // const {
        //     application = 'ln/arc',
        //     source = 'ARC',
        //     user = 'ARC',
        //     url = null,
        //     severity = null,
        //     version = null,
        //     queryString = []
        // } = config || {};

        // const elmahJson = {
        //     application,
        //     detail: `${statusCode} - ${message}`,
        //     hostname: uri,
        //     title: `${statusCode} - ${message}`,
        //     titleTemplate: 'StatusCodeError',
        //     source,
        //     statusCode,
        //     dateTime: new Date().toISOString(),
        //     type: 'Error',
        //     user,
        //     severity,
        //     url: `${SITE_LANACION}${url}`,
        //     method,
        //     version,
        //     queryString
        // };

        // request({
        //     uri: URI_ELMAH,
        //     qs: {
        //         api_key: ELMAH_API_KEY
        //     },
        //     method: 'POST',
        //     headers: {
        //         accept: 'text/plain',
        //         'Content-Type': 'application/json-patch+json'
        //     },
        //     body: JSON.stringify(elmahJson)
        // })
        //     .then(res => {
        //         console.log('elmah -> res', res);
        //     })
        //     .catch(e => {
        //         console.log('elmah -> error', e);
        //     });
    };
    // TODO: ELIMINAR CODIGO COMENTADO DE ANTIGUA CONFIGURACION PARA LOGUEO DE ERRORES POR ELMAH
    return {
        push
    };
})();

export default logger;
