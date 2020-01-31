import React from 'react';
import PropTypes from 'fusion:prop-types';

function ImagePlaceholder({ href, zoom, children, outputType }) {
    let zoomClass = '';
    if (zoom) zoomClass = 'zoom';

    // TODO: Figure out a better way of approaching this wrapper thing
    const Wrapper = props => (
        <>
            {outputType === 'amp' ? (
                <noscript>{props.children}</noscript>
            ) : (
                <a href={props.href} className="figure" />
            )}
        </>
    );

    return (
        <>
            <Wrapper href={href}>
                <picture className={`content-pic picture ${zoomClass}`}>
                    {children}
                </picture>
            </Wrapper>

            {/* <a href={href} className="figure">
                <picture className={`content-pic picture ${zoomClass}`}>
                    {children}
                </picture>
            </a> */}
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
