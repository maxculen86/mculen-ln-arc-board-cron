import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-figure.css';

const ComFigure = ({
    classCondition,
    withZoom,
    children,
    width,
    itsGallery
}) => {
    console.log('itsGallery *************** ', itsGallery);
    const refContainer = useRef();
    const [active, setActive] = useState(false);

    const [zoom, setZoom] = useState(false);

    const handleClick = () => {
        if (withZoom) {
            setActive(!active);
        }
    };

    useEffect(() => {
        if (withZoom) {
            setZoom(width > refContainer.current.clientWidth);
        }
    }, [width, withZoom]);

    useEffect(() => {
        function handleResize() {
            if (withZoom) {
                setZoom(width > refContainer.current.clientWidth);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [width, withZoom]);

    return children ? (
        <figure
            ref={refContainer}
            role="button"
            onClick={handleClick}
            onKeyDown={handleClick}
            className={`mod-figure ${classCondition} ${
                itsGallery || zoom ? withZoom : ''
            } ${withZoom && active && (itsGallery || zoom) ? '--active' : ''}`}
        >
            {children}
        </figure>
    ) : (
        <></>
    );
};

ComFigure.propTypes = {
    children: PropTypes.elementType.isRequired,
    withZoom: PropTypes.string.isRequired,
    classCondition: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    itsGallery: PropTypes.bool.isRequired
};

export default ComFigure;
