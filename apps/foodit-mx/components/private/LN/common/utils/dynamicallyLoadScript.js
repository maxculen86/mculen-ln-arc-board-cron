/* eslint-disable no-underscore-dangle */

if (typeof window !== 'undefined') {
    window.__loadingScripts = window.__loadingScripts || new Map();
}

const dynamicallyLoadScript = (script, section) => {
    if (!document) return Promise.reject(new Error('No existe document'));

    if (window.__loadingScripts && window.__loadingScripts.has(script)) {
        return window.__loadingScripts.get(script);
    }

    if (!document.querySelector(`script[src="${script}"]`)) {
        const baseScript = document.createElement('script');
        baseScript.src = script;
        baseScript.setAttribute('fetchpriority', 'high');

        const loadPromise = new Promise((res, rej) => {
            baseScript.onload = () => {
                window.__loadingScripts.delete(script);
                res();
            };
            baseScript.onerror = () => {
                window.__loadingScripts.delete(script);
                rej();
            };
        });

        window.__loadingScripts.set(script, loadPromise);

        document[section].appendChild(baseScript);
        return loadPromise;
    }

    return Promise.resolve();
};

export default dynamicallyLoadScript;
