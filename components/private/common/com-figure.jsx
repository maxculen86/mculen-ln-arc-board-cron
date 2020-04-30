import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-figure.css';

const ComFigure = ({
    classCondition,
    withZoom,
    children,
    width,
    itsGallery,
    handleClick,
    active
}) => {
    const refContainer = useRef();

    const [zoom, setZoom] = useState(false);

    useEffect(() => {
        if (itsGallery) {
            setZoom(true);
        }
        if (!itsGallery && withZoom) {
            setZoom(width > refContainer.current.clientWidth);
        }
        function handleResize() {
            if (!itsGallery && withZoom) {
                setZoom(width > refContainer.current.clientWidth);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [itsGallery, width, withZoom]);

    return children ? (
        <figure
            ref={refContainer}
            role="button"
            onClick={zoom && handleClick}
            onKeyDown={zoom && handleClick}
            className={`mod-figure ${classCondition} ${zoom ? withZoom : ''} ${
                withZoom && active && zoom ? '--active' : ''
            }`}
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
    itsGallery: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default ComFigure;
