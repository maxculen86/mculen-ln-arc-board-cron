/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';

const ComscoreFoodit = ({ config, configNoScript, location = 'head' }) => {
    if (!config || !configNoScript) return '';
    if (location !== 'head') return '';

    const script = `var _comscore = _comscore || [];
        _comscore.push(${JSON.stringify({
            ...config,
            options: {
                enableFirstPartyCookie: true,
                bypassUserConsentRequirementFor1PCookie: true
            }
        })});(function() {
            var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
            s.src = "https://sb.scorecardresearch.com/cs/6906398/beacon.js";
            el.parentNode.insertBefore(s, el);
            })();`;

    const objectConfig = { ...config, ...configNoScript };
    const urlConfig = Object.keys(objectConfig)
        .map(k => `${k}=${objectConfig[k]}`)
        .join('&');
    const urlNoScript = `https://sb.scorecardresearch.com/p?${urlConfig}`;

    return (
        <>
            <script
                id="comscore"
                defer
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: script }}
            />
            <noscript
                dangerouslySetInnerHTML={{
                    __html: `<img src="${urlNoScript}" />`
                }}
            />
        </>
    );
};

export default ComscoreFoodit;
