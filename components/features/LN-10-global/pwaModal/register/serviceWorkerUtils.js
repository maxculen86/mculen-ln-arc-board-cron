import { initialize } from './pwaMessaging';

export const verify = () => {
    return true && 'serviceWorker' in navigator;
};

export const unregister = () => {
    return new Promise((resolve, reject) => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .getRegistrations()
                .then(registrations => {
                    const { length } = registrations || [];

                    for (const registration of registrations) {
                        console.log('SW: unreg', registration);
                        registration.unregister();
                    }

                    resolve(length);
                })
                .catch(err => {
                    console.log('SW: unreg ERROR', err);
                    reject(err);
                });
        } else {
            reject(new Error('serviceWorker == undefined'));
        }
    });
};

export const register = deployment => {
    return new Promise((resolve, reject) => {
        if ('serviceWorker' in navigator) {
            console.log('[Service Worker] Will the service worker register?');
            navigator.serviceWorker
                .register(`/sw.js?d=${deployment}`)
                .then(reg => {
                    initialize();
                    console.log('[Service Worker] Yes, it did.');
                    resolve();
                })
                .catch(err => {
                    console.log(
                        "[Service Worker] No it didn't. This happened: ",
                        err
                    );
                    reject(err);
                });
        }
    });
};
