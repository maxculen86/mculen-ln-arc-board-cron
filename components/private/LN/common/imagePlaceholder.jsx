import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComPicture from '../../common/com-picture';
import ComFigure from '../../common/com-figure';
import ModFigcaption from '../../common/mod-figcaption';

function ImagePlaceholder({ href, zoom, children, outputType, isVertical }) {
    let zoomClass = '';
    if (zoom) zoomClass = '--zoom';

    const image = (
        <ComPicture classCondition={zoomClass}>{children}</ComPicture>
    );

    return (
        <>
            {outputType === 'amp' ? (
                <a
                    href={href}
                    className={`figure ${
                        isVertical ? 'contain-vertical' : 'contain-horizontal'
                    }`}
                >
                    <div className="content-pic picture" />
                </a>
            ) : (
                <>{image}</>
            )}
        </>
    );
}

ImagePlaceholder.propTypes = {
    outputType: PropTypes.string,
    href: PropTypes.string,
    zoom: PropTypes.bool,
    isVertical: PropTypes.bool,
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
