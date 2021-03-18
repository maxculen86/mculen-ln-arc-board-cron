const dynamicallyLoadScript = (script, section) => {
    if (!document.querySelector(`script[src="${script}"]`)) {
        const baseScript = document.createElement('script');
        baseScript.src = '//www.queryly.com/js/queryly.v4.js';
        document[section].appendChild(baseScript);
        return true;
    }
    return false;
};

export default dynamicallyLoadScript;
