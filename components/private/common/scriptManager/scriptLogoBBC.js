import React from 'react';
import { useAppContext } from 'fusion:context';

function ScriptLogoBBC({ distributorName }) {
    const { contextPath, deployment } = useAppContext();
    const nodes = [
        <script
            id="script-logo-bbc"
            defer
            type="text/javascript"
            src={deployment(
                `${contextPath}/resources/js/LN/scriptLogoBBC.min.js`
            )}
        />,
        <noscript
            dangerouslySetInnerHTML={{
                __html: `<img src="//a1.api.bbc.co.uk/hit.xiti?&x8=[synd_v5.7.0_nojs]&s=598346" height="1"width="1" border="0"alt="" />`
            }}
        />
    ];

    return distributorName === 'BBC Mundo' ? nodes : null;
}

export default ScriptLogoBBC;
