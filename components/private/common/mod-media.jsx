import React from 'react';

import '../../../resources/dist/css/ln/modules/mod-media.css';

const ModMedia = props => {
    const {
        children,
        classCondition,
        withZoom,
        itsGallery,
        active,
        zoom
    } = props;

    return (
        <section
            role="button"
            className={`mod-media ${itsGallery ? '--zoom' : ''}${
                zoom ? withZoom : ''
            } ${zoom && active ? '--active' : ''} ${classCondition || ''}`}
        >
            {children}
        </section>
    );
};

export default ModMedia;
