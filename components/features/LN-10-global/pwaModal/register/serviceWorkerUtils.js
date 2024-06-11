import { initialize } from './pwaMessaging';

export const verify = () => {
    return true && 'serviceWorker' in navigator;
};

export const unregister = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registrations = await navigator.serviceWorker.getRegistrations();
            const { length } = registrations || [];

            for (const registration of registrations) {
                await registration.unregister();
            }

            return length;
        } catch (err) {
            console.error('SW: unreg ERROR', err);
            throw err;
        }
    } else {
        throw new Error('serviceWorker == undefined');
    }
};

export const register = async deployment => {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register(`/sw.js?d=${deployment}`);
            initialize();
        } catch (err) {
            console.error(
                "[Service Worker] No it didn't. This happened: ",
                err
            );
            throw err;
        }
    }
};
