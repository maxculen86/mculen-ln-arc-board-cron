import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/components/com-image.css';

const ComImage = props => {
    const { src, alt, classCondition, amp, width, height } = props;
    if (!src) return null;
    return (
        <>
            {amp ? (
                <amp-img
                    src={src}
                    layout="fixed"
                    width={width}
                    height={height}
                    class="com-image"
                />
            ) : (
                <img
                    src={src}
                    loading="lazy"
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
    height: sizeProps
};

export default ComImage;
