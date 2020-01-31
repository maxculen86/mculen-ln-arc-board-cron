import React from 'react';
import PropTypes from 'fusion:prop-types';

function ImagePlaceholder({ href, zoom, children, outputType }) {
    let zoomClass = '';
    if (zoom) zoomClass = 'zoom';

    const image = (
        <picture className={`content-pic picture ${zoomClass}`}>
            {children}
        </picture>
    );

    return (
        <>
            {outputType === 'amp' ? (
                <noscript>{image}</noscript>
            ) : (
                <a href={href} className="figure">
                    {image}
                </a>
            )}
        </>
    );
}

ImagePlaceholder.propTypes = {
    outputType: PropTypes.string,
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
