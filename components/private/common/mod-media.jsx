import React from 'react';
import Html from '../LN/nota/cuerpo/html';

import '../../../resources/dist/css/ln/modules/mod-media.css';

const renderHtml = (html, _id) => <Html data={{ content: html, _id }} />;

function ModMedia({
    idMedia,
    children,
    classCondition = '',
    withZoom = '',
    itsGallery = false,
    active = false,
    zoom = false,
    html = '',
    scriptForZoom = ''
}) {
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
}

export default ModMedia;
