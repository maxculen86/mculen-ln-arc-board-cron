import React from 'react';
import PropTypes from 'fusion:prop-types';

function ImagePlaceholder({ href, zoom, children }) {
    let zoomClass = '';
    if (zoom) zoomClass = 'zoom';
    return (
        <>
            <a href={href} className="figure">
                <picture className={`content-pic picture ${zoomClass}`}>
                    {children}
                </picture>
            </a>
        </>
    );
}

ImagePlaceholder.propTypes = {
    href: PropTypes.string,
    zoom: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

// ImagePlaceholder.defaultProps = {
//     href: '#',
//     zoom: false,
//     children: []
// };

export default ImagePlaceholder;
