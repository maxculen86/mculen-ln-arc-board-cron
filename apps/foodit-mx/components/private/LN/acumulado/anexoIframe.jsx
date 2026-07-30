import React, { useEffect } from 'react';
import pym from 'pym.js';

function AnexoIframe({
    url,
    id,
    styles = '',
    extraClass,
    _props = { scrolling: 'no' }
}) {
    const EXTRA_CLASS = (extraClass && ` ${extraClass}`) || '';
    useEffect(() => {
        if (window && url) {
            window.pym = pym;
            const pymIframe = new pym.Parent(`anexo-${id}`, url, {
                ..._props
            });

            pymIframe.onMessage('pymEspecialesLoaded', status => {
                if (status === 'ready')
                    pymIframe.sendMessage('setShareUrl', document.URL);
            });
        }
    });

    if (!url) return null;
    return (
        <>
            {styles !== '' && <style>{styles}</style>}
            <div id={`anexo-${id}`} className={`com-anexo pym${EXTRA_CLASS}`} />
        </>
    );
}

export default AnexoIframe;
