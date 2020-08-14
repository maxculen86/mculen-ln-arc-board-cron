import request from 'request-promise-native';
import get from './get';

const URI_ELMAH =
    'https://api.elmah.io/v3/messages/00f817a7-48fa-4335-b551-ca953b7342fd';
const API_KEY_ELMAH = 'e6ce19c37ca046348f6afb5a11bc3fdb';

const logger = (() => {
    const push = (e, config) => {
        const { statusCode } = e || {};
        const method = get(e || {}, 'response.request.method', null);
        const uri = get(e || {}, 'options.uri', null);
        const message = get(e || {}, 'error.message', null);
        const {
            application = 'ln/arc',
            source = 'ARC',
            user = 'ARC',
            url = null,
            severity = null,
            version = null,
            queryString = []
        } = config || {};

        const elmahJson = {
            application,
            detail: `${statusCode} - ${message}`,
            hostname: uri,
            title: `${statusCode} - ${message}`,
            titleTemplate: 'StatusCodeError',
            source,
            statusCode,
            dateTime: new Date().toISOString(),
            type: 'Error',
            user,
            severity,
            url,
            method,
            version,
            queryString
        };

        request({
            uri: URI_ELMAH,
            qs: {
                api_key: API_KEY_ELMAH
            },
            method: 'POST',
            headers: {
                accept: 'text/plain',
                'Content-Type': 'application/json-patch+json'
            },
            body: JSON.stringify(elmahJson)
        })
            .then(res => {
                console.log('elmah -> res', res);
            })
            .catch(e => {
                console.log('elmah -> error', e);
            });
    };

    return {
        push
    };
})();

export default logger;
