import { FIREBASE_CONFIG } from 'fusion:environment';
import {
    checkLocalStorageItems,
    registerSubscription,
    updateToken
} from './subscriptionUtils';

let messaging = null;
const ENDPOINT_ARN = 'endpointArn';
const AUTH_TOKEN = 'x-auth2-token';
const AUTH3_TOKEN = 'x-auth3-token';

export const initialize = () => {
    if (typeof firebase !== 'undefined') {
        const {
            apiKey,
            authDomain,
            databaseURL,
            projectId,
            storageBucket,
            messagingSenderId,
            appId
        } = FIREBASE_CONFIG || {};

        const firebaseConfig = {
            apiKey,
            authDomain,
            databaseURL,
            projectId,
            storageBucket,
            messagingSenderId,
            appId
        };

        firebase.initializeApp(firebaseConfig);

        messaging = firebase.messaging();
    }

    const hasArnStored = localStorage.getItem(ENDPOINT_ARN) !== null;
    const authToken = localStorage.getItem(AUTH3_TOKEN);

    if (!hasArnStored && authToken) {
        registerSubscription(authToken, true);
    }
};

export const requestToken = showError => {
    const setToken = () => {
        handleToken()
            .then(token => {
                storeAuth3Token(token);

                const {
                    deviceArn,
                    hasTokenStored,
                    hasTokenChanged,
                    hasArnStored
                } = checkLocalStorageItems(token);

                if (!hasTokenStored || !hasArnStored) {
                    handleSubscription({ token, showError });
                }

                if (hasTokenChanged && hasArnStored) {
                    updateToken({ token, deviceArn });
                }
            })
            .catch(err => {
                console.error('[Service Worker] Notificaciones denegadas', err);
            });
    };

    return messaging
        .requestPermission()
        .then(() => setToken())
        .catch(err =>
            console.error('Error al solicitar permiso de notificaciones', err)
        );
};

export const handleToken = () => messaging.getToken();

export const isNotificationDefault = () => {
    if ('Notification' in window) {
        return Notification.permission === 'default';
    }
    return false;
};

export const handleSubscription = ({ token, showError }) => {
    try {
        localStorage.setItem(AUTH_TOKEN, token);
        registerSubscription(token, showError);
    } catch (e) {
        console.error(
            'Error al intentar guardar x-auth2-token en localStorage'
        );
    }
};

export const checkSubscription = showError => {
    navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(subscription => {
            messaging.useServiceWorker(registration);
            requestToken(showError);
        });
    });
};

export const storeAuth3Token = token => {
    try {
        localStorage.setItem(AUTH3_TOKEN, token);
    } catch (e) {
        console.error(
            'Error al intentar guardar x-auth3-token en localStorage'
        );
    }
};
