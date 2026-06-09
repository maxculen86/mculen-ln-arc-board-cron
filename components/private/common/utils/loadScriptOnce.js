import isSSR from '../../LN/common/utils/isSSR';

const loadScriptOnce = ({ scriptId, scriptUrl, scriptType = 'module' }) => {
    if (isSSR() || !scriptId || !scriptUrl) {
        return null;
    }

    const currentScript = document.getElementById(scriptId);
    if (currentScript) return currentScript;

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = scriptType;
    script.src = scriptUrl;

    document.head.appendChild(script);

    return script;
};

export default loadScriptOnce;
