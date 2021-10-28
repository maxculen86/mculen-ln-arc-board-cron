// import { ELMAH_API_KEY, ELMAH_LOG_ID, SITE_LANACION } from 'fusion:environment';
import getProperties from 'fusion:properties';
// import { resolveConfig } from 'prettier';
// import request from 'request-promise-native';
import get from './get';
import LnError from './LN-Error';

// const URI_ELMAH = `https://api.elmah.io/v3/messages/${ELMAH_LOG_ID}`;

const logger = (() => {
    const push = (e, config, site) => {
        const { loggerExcludedErrors } = getProperties(site) || {
            loggerExcludedErros: [301, 302, 404]
        };
        const { statusCode } = e || { statusCode: 500 };
        if (loggerExcludedErrors.includes(Number(statusCode))) throw e;

        /**
         * TODO: Revisar si se estan recibiendo correctamente el message y url
         */
        const message = get(e, 'error.message', null);
        const { source = 'ARC', url = null, uri = null } = config || {};

        /**
         * TODO: Revisar si se llega correctamente el error
         */
        throw new LnError(
            `Status Code: ${statusCode}. Mensaje: ${message}. Source: ${source}. Url: ${url ||
                uri}`,
            {
                customErrorType: 'controlado'
            }
        );
    };

    return {
        push
    };
})();

export default logger;
