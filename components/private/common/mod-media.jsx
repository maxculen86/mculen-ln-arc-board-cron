import React from 'react';
import Html from '../LN/nota/cuerpo/html';

import '../../../resources/dist/css/ln/modules/mod-media.css';

const ModMedia = props => {
    const {
        children,
        classCondition,
        withZoom,
        itsGallery,
        active,
        zoom,
        anexo
    } = props;

    return (
        <section
            role="button"
            className={`mod-media ${itsGallery ? '--zoom' : ''}${
                zoom ? withZoom : ''
            } ${
                (itsGallery || zoom) && active ? '--active' : ''
            } ${classCondition || ''}`}
        >
            {(anexo && <Html data={{ content: anexo }} />) || children}
        </section>
    );
};

export default ModMedia;
