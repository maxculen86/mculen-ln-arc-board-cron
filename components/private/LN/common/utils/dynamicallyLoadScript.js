const dynamicallyLoadScript = (script, section) => {
    if (!document) return Promise.reject(new Error('No existe document'));
    if (!document.querySelector(`script[src="${script}"]`)) {
        const baseScript = document.createElement('script');
        baseScript.src = script;
        document[section].appendChild(baseScript);
        // return true;
        return new Promise((res, rej) => {
            baseScript.onload = () => {
                res();
            };
            baseScript.onerror = () => {
                rej();
            };
        });
    }
    return Promise.reject(new Error('Ya esta cargado'));
};

export default dynamicallyLoadScript;
