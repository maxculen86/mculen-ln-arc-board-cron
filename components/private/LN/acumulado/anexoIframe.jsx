import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import pym from 'pym.js';
import '../../../../resources/dist/css/ln/pages/acu-revista.css';

const AnexoIframe = ({ url, id, styles, _props }) => {
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

    return url ? (
        <>
            {styles !== '' && <style>{styles}</style>}
            <div id={`anexo-${id}`} className="com-anexo pym" />
        </>
    ) : (
        <></>
    );
};

AnexoIframe.propTypes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.string,
    styles: PropTypes.string,
    _props: PropTypes.arrayOf(PropTypes.objects)
};

AnexoIframe.defaultProps = {
    url: undefined,
    styles: '',
    _props: { scrolling: 'no' }
};

export default AnexoIframe;
