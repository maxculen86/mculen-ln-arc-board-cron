import React, { useState, useEffect, useRef } from 'react';

import '../../../resources/dist/css/ln/modules/mod-media.css';

const ModMedia = props => {
    const {
        children,
        classCondition,
        withZoom,
        itsGallery,
        active,
        width
    } = props;
    const refContainer = useRef();
    const [zoom, setZoom] = useState(false);

    useEffect(() => {
        if (withZoom) {
            setZoom(width > refContainer.current.clientWidth);
        }
        function handleResize() {
            if (withZoom) {
                setZoom(width > refContainer.current.clientWidth);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [withZoom, width]);

    return (
        <section
            ref={refContainer}
            role="button"
            className={`mod-media ${itsGallery ? '--zoom' : ''}${
                zoom ? withZoom : ''
            } ${active ? '--active' : ''} ${classCondition || ''}`}
        >
            {children}
        </section>
    );
};

export default ModMedia;
