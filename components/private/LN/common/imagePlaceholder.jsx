import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComPicture from '../../common/com-picture';
import ComFigure from '../../common/com-figure';
import ModFigcaption from '../../common/mod-figcaption';

function ImagePlaceholder({ href, children, outputType, isVertical, amp }) {
    const image = (
        // TODO: Revisar el caso render autor para placeholder en Caja de Temas [Economía]
        // <ComFigure>
        <ComPicture href={href} amp={amp}>
            {children}
        </ComPicture>
        // </ComFigure>
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
                    <div className="mod-picture" />
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
