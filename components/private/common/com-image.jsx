import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/components/com-image.css';
import '../../../resources/dist/css/ln/modules/mod-media.css';

const ComImage = props => {
    const {
        src,
        srcset,
        srcsetAMP,
        alt,
        layout,
        classCondition,
        amp,
        width,
        height,
        withLazy = true
    } = props;

    if (!src) return null;
    return (
        <>
            {amp ? (
                <amp-img
                    src={src}
                    srcset={srcsetAMP}
                    layout={layout || 'responsive'}
                    width={width}
                    height={height}
                    class={`com-image ${classCondition || ''}`}
                    alt={alt}
                />
            ) : (
                <img
                    src={src}
                    srcSet={srcset}
                    loading={withLazy ? 'lazy' : undefined}
                    className={`com-image ${classCondition || ''}`}
                    width={width}
                    height={height}
                    alt={alt}
                />
            )}
        </>
    );
};

const sizeProps = (props, propName) =>
    props.amp === true && props[propName] === undefined
        ? new Error(`Please provide a ${propName} value`)
        : null;

ComImage.propTypes = {
    src: PropTypes.string.isRequired,
    srcset: PropTypes.string,
    alt: PropTypes.string.isRequired,
    classCondition: PropTypes.string,
    amp: PropTypes.bool.isRequired,
    width: sizeProps,
    height: sizeProps,
    withLazy: PropTypes.bool
};

export default ComImage;
