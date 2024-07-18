/* eslint-disable no-bitwise */
import { WIDGETS } from 'fusion:environment';
import generateUniqueId from '../../LN-10-global/common/utils/ generateUniqueId';

export const getVariablesFromLocalStorage = () => {
    const urls = JSON.parse(localStorage.getItem('excludeItems')) || [];
    const uid = localStorage.getItem('CDUserId') || 'N/A';
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
    const uniqueId = generateUniqueId();
    return `${uniqueId}-${Date.now()}`;
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
