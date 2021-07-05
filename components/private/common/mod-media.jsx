import React from 'react';
import Html from '../LN/nota/cuerpo/html';

import '../../../resources/dist/css/ln/modules/mod-media.css';

const ModMedia = props => {
    const {
        idMedia,
        children,
        classCondition,
        withZoom,
        itsGallery,
        active,
        zoom,
        anexo,
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
                {(anexo && <Html data={{ content: anexo }} />) || children}
            </section>
            {scriptForZoom}
        </>
    );
};

export default ModMedia;
