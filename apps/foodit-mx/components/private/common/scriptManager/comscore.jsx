/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';

function Comscore({ config, location = 'head' }) {
    if (!config) return '';
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

    const urlConfig = Object.keys(config)
        .map(k => `${k}=${config[k]}`)
        .join('&');
    const urlNoScript = `https://sb.scorecardresearch.com/p?${urlConfig}&cv=3.9.1&cj=1`;

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
}

export default Comscore;
