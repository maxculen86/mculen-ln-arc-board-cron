import handleCookie from '../../../../private/LN/common/utils/handleCookie';
import get from '../../../../private/common/utils/get';

const { getCookie } = handleCookie();
const apiNotification = 'https://notificaciones.lanacion.com.ar/api/';
const aplicationJson = 'application/json';
const ENDPOINT_ARN = 'endpointArn';
const AUTH_TOKEN = 'x-auth2-token';
const AUTH3_TOKEN = 'x-auth3-token';

export const savePushTokenCache = token => {
    caches
        .open('sw')
        .then(cache => {
            const options = { headers: { 'Content-Type': aplicationJson } };
            const response = JSON.stringify({
                token
            });
            cache.put('/pushtoken', new Response(response, options));
        })
        .catch(e => {
            console.log('caches error', e);
        });
};

export const registerSubscription = (token, showError) => {
    savePushTokenCache(token);

    const body = JSON.stringify({ token });

    const apiUrl = `${apiNotification}notification/register/`;

    const headers = {
        Accept: aplicationJson,
        'Content-Type': aplicationJson,
        'x-token': getCookie('token')
    };
    fetch(apiUrl, {
        method: 'post',
        headers,
        body
    })
        .then(response => response.json())
        .then(res => {
            console.log('device notifications registered.', res);
            const endpointArn = get(res, 'data.endpointArn');

            localStorage.setItem(ENDPOINT_ARN, endpointArn);
            registerTopic(topicName, token, showError);
        })
        .catch(err => {
            console.log('device notifications error: ', err);
        });
};

export const updateToken = ({ token, deviceArn }) => {
    const apiUrl = `${apiNotification}notification/updateToken/`;

    const body = JSON.stringify({
        token,
        endpointArn: deviceArn
    });

    const headers = {
        Accept: aplicationJson,
        'Content-Type': aplicationJson,
        'x-token': getCookie('token')
    };

    fetch(apiUrl, {
        method: 'post',
        headers,
        body
    })
        .then(response => response.json())
        .then(res => {
            console.log('updating notification success', res);
            localStorage.setItem(AUTH_TOKEN, res);
        })
        .catch(err => {
            console.log('updating notification token error: ', err);
        });
};

export const checkLocalStorageItems = token => {
    const deviceArn = localStorage.getItem(ENDPOINT_ARN);

    const hasTokenStored =
        localStorage.getItem(AUTH_TOKEN) !== null &&
        localStorage.getItem(AUTH3_TOKEN) !== null;

    const hasTokenChanged =
        hasTokenStored &&
        [
            localStorage.getItem(AUTH_TOKEN),
            localStorage.getItem(AUTH3_TOKEN)
        ].some(value => value !== token);

    const hasArnStored = deviceArn !== null;

    return {
        deviceArn,
        hasTokenStored,
        hasTokenChanged,
        hasArnStored
    };
};

export const registerTopic = (topic, token, showError) => {
    const body = JSON.stringify({
        token,
        topicName: topic
    });

    const apiUrl = `${apiNotification}notification/subscriptions/`;
    const headers = {
        Accept: aplicationJson,
        'Content-Type': aplicationJson
    };

    fetch(apiUrl, {
        method: 'post',
        headers,
        body
    })
        .then(response => response.json())
        .then(res => {
            if (res.status === 200) {
                console.log('topic registered.');
                return true;
            }
            return false;
        })
        .catch(err => {
            console.log('device notifications error: ', err);
        });
};
