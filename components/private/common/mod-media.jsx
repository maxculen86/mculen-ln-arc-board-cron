import React from 'react';
import PropTypes from 'prop-types';
import Html from '../LN/nota/cuerpo/html';

import '../../../resources/dist/css/ln/modules/mod-media.css';

const renderHtml = (html, _id) => {
    return <Html data={{ content: html, _id }} />;
};

const ModMedia = props => {
    const {
        idMedia,
        children,
        classCondition,
        withZoom,
        itsGallery,
        active,
        zoom,
        html,
        scriptForZoom
    } = props;
    return (
        <>
            <section
                id={idMedia}
                role="button"
                className={`mod-media ${itsGallery ? '--zoom' : ''}${
                    zoom ? withZoom : ''
                } ${
                    (itsGallery || zoom) && active ? '--active' : ''
                } ${classCondition || ''}`}
            >
                {(html && renderHtml(html, idMedia)) || children}
            </section>
            {scriptForZoom}
        </>
    );
};

ModMedia.propTypes = {
    idMedia: PropTypes.string,
    children: PropTypes.node,
    classCondition: PropTypes.string,
    withZoom: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    itsGallery: PropTypes.bool,
    active: PropTypes.bool,
    zoom: PropTypes.bool,
    html: PropTypes.string,
    scriptForZoom: PropTypes.string,
    outputType: PropTypes.string
};

ModMedia.defaultProps = {
    idMedia: undefined,
    children: undefined,
    classCondition: '',
    withZoom: '',
    itsGallery: false,
    active: false,
    zoom: false,
    html: '',
    scriptForZoom: '',
    outputType: 'default'
};

export default ModMedia;
