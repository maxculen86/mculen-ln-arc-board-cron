import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComPicture from '../../common/com-picture';
import ComFigure from '../../common/com-figure';
import ModFigcaption from '../../common/mod-figcaption';

function ImagePlaceholder({ href, children, outputType, isVertical }) {
    const image = <ComPicture href={href}>{children}</ComPicture>;

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
