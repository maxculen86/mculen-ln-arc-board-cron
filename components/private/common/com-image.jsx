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
                    src="https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/nMbuBq0SHLPv9uoOJsHiZBeyoYw=/768x513/smart/filters:quality(70)/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/2TEGAEFZO5B3DLRIP7P47ZTCPY.jpg"
                    srcSet={srcset}
                    loading={withLazy ? 'lazy' : undefined}
                    className={`com-image ${classCondition || ''}`}
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
