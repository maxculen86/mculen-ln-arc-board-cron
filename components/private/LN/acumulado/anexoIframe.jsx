import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import pym from 'pym.js';

const AnexoIframe = ({ url, id, styles }) => {
    useEffect(() => {
        if (window && url) {
            window.pym = pym;
            const pymIframe = new pym.Parent(`anexo-${id}`, url, {
                scrolling: 'no'
            });

            pymIframe.onMessage('pymEspecialesLoaded', status => {
                if (status === 'ready')
                    pymIframe.sendMessage('setShareUrl', document.URL);
            });
        }
    });

    return url ? (
        <>
            {styles !== '' && <style>{styles}</style>}
            <div id={`anexo-${id}`} className="com-anexo pym w-100" />
        </>
    ) : (
        <></>
    );
};

AnexoIframe.propTypes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.string,
    styles: PropTypes.string
};

AnexoIframe.defaultProps = {
    url: undefined,
    styles: ''
};

export default AnexoIframe;
