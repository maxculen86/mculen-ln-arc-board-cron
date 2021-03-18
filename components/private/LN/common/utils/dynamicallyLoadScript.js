const dynamicallyLoadScript = (script, section) => {
    if (!document) return false;
    if (!document.querySelector(`script[src="${script}"]`)) {
        const baseScript = document.createElement('script');
        baseScript.src = script;
        document[section].appendChild(baseScript);
        return true;
    }
    return false;
};

export default dynamicallyLoadScript;
