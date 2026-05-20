import isSSR from '../isSSR';
import handleCookie from '../handleCookie';

export const getClientIdFromCookie = cookieValue => {
    if (!cookieValue) return null;
    const parts = cookieValue.split('.');
    if (parts.length < 4) return null;
    return parts.splice(2, 2).join('.');
};

const getGaClientId = ({ maxRetries = 3, intervalMs = 200 } = {}) =>
    new Promise(resolve => {
        if (isSSR()) {
            resolve(null);
            return;
        }

        const { getCookie } = handleCookie();

        const tryRead = retriesLeft => {
            const clientId = getClientIdFromCookie(getCookie('_ga'));
            if (clientId) {
                resolve(clientId);
                return;
            }
            if (retriesLeft <= 0) {
                resolve(null);
                return;
            }
            setTimeout(() => tryRead(retriesLeft - 1), intervalMs);
        };

        tryRead(maxRetries);
    });

export default getGaClientId;
