/* eslint-disable valid-typeof */
/* eslint-disable no-console */
import getProperties from 'fusion:properties';
import NotFoundError from '../../../../content/sources/utils/notFoundError';
import LnError from './LN-Error';

const setLNError = ({ statusCode, message }) => {
    const code = statusCode ? `${statusCode} - ` : '';
    return [code, message].join(' ');
};

const logger = (() => {
    const push = (error, config, site) => {
        const { loggerExcludedErrors } = getProperties(site) || {
            loggerExcludedErros: [301, 302, 404]
        };
        const { statusCode, message = '' } = error || {};
        const { source = 'ARC', url = null, uri = null } = config || {};
        const customsProps = {
            customErrorType: 'controlado',
            contentSource: source,
            statusCode,
            url: url || uri
        };

        if (statusCode === 404) {
            console.warn(`LnWarn: ${message}`, customsProps);
            if (typeof error === 'NotFoundError') throw error;
            throw new NotFoundError(message);
        }

        if (loggerExcludedErrors.includes(Number(statusCode))) throw error;

        throw new LnError(setLNError({ statusCode, message }), customsProps);
    };

    return {
        push
    };
})();

export default logger;
