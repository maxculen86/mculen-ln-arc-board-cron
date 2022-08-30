/* eslint-disable valid-typeof */
/* eslint-disable no-console */
import getProperties from 'fusion:properties';
import NotFoundError from '../../../../content/sources/utils/notFoundError';
import LnError from './LN-Error';

export const setLNError = ({ statusCode, message }) => {
    const code = statusCode ? `${statusCode} - ` : '';
    return [code, message].join(' ');
};

const flow404 = ({ customsProps, error, justWarning }) => {
    const { message = '' } = error;
    const pushError = () => {
        if (typeof error === 'NotFoundError') throw error;
        throw new NotFoundError(message);
    };

    console.warn(`LnWarn: ${message}`, customsProps);

    return justWarning ? false : pushError();
};

export const regularFlow = ({ loggerExcludedErrors, error, customsProps }) => {
    const { statusCode, message = '' } = error;

    if (
        Array.isArray(loggerExcludedErrors) &&
        loggerExcludedErrors.includes(Number(statusCode))
    )
        throw error;
    throw new LnError(setLNError({ statusCode, message }), customsProps);
};

const logger = (() => {
    const push = (error = {}, config, site, justWarning) => {
        const { loggerExcludedErrors } = getProperties(site) || {
            loggerExcludedErrors: [301, 302, 404]
        };
        const { source = 'ARC', url = null, uri = null } = config || {};
        const customsProps = {
            customErrorType: 'controlado',
            contentSource: source,
            statusCode: error.statusCode,
            url: url || uri
        };

        error.statusCode === 404
            ? flow404({ customsProps, error, justWarning })
            : regularFlow({ customsProps, error, loggerExcludedErrors });
    };

    return {
        push
    };
})();

export default logger;
