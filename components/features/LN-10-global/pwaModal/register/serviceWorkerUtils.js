import { initialize } from './pwaMessaging';

export const verify = () => 'serviceWorker' in navigator;

export const unregister = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registrations =
                await navigator.serviceWorker.getRegistrations();
            const { length } = registrations || [];

            await Promise.all(
                registrations.map(registration => registration.unregister())
            );

            return length;
        } catch (err) {
            console.error('SW: unreg ERROR', err);
            throw err;
        }
    } else {
        throw new Error('serviceWorker == undefined');
    }
};

export const register = async ({ deployment, arcSite = 'la-nacion-ar' }) => {
    const dictionarySites = {
        'la-nacion-ar': 'LN',
        foodit: 'FOODIT'
    };

    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register(
                `/pf/resources/js/${dictionarySites[arcSite]}/sw.min.js?d=${deployment}`
            );
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
