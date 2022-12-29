/* eslint-disable no-bitwise */
import { WIDGETS } from 'fusion:environment';

export const getVariablesFromLocalStorage = () => {
    const urls = JSON.parse(localStorage.getItem('excludeItems')) || [];
    const uid = localStorage.getItem('CDuserId') || 'N/A';
    const sid = localStorage.getItem('sessionId') || generateSessionId();

    return {
        urls,
        sid,
        uid
    };
};

export const setLocalStorage = (urls, sessionId) => {
    try {
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('excludeItems', JSON.stringify(urls));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error en setear Local Storage method setLocalStorage');
    }
};

export const generateSessionId = () => {
    const cryptoNumber = ([1e7] + -1e3 + -4e3 + -8e3).replace(/[018]/g, c =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );

    return `${cryptoNumber}-${Date.now()}`;
};

export const saveUrlToExclude = (urls, currentUrl) => {
    if (urls.includes(currentUrl)) return urls;
    if (urls && urls.length > 15) {
        urls.shift();
    }
    urls.push(currentUrl);
    return urls;
};

export const addLiftigniterEventTracking = element => {
    const { current } = element;
    window.$p('track', {
        elements: current.querySelectorAll('.mod-article'),
        name: WIDGETS,
        source: 'LI'
        // _debug: true debug mode
    });
};
