import React from 'react';
import PropTypes from 'fusion:prop-types';
import Link from '../common/com-link';

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
        href,
        target,
        withLazy = true
    } = props;

    if (!src) return null;

    const image = (
        <img
            src={src}
            srcSet={srcset}
            loading={withLazy ? 'lazy' : undefined}
            className={`com-image ${classCondition || ''}`}
            alt={alt || ''}
            width={width}
            height={height}
        />
    );
    const image_amp = (
        <amp-img
            src={src}
            srcSet={srcsetAMP}
            layout={layout || 'responsive'}
            class={`com-image ${classCondition || ''}`}
            alt={alt || ''}
            width={width}
            height={height}
        />
    );

    return (
        <>
            {href ? (
                <Link link={href} target={target || ''} title={alt || ''}>
                    {amp ? image_amp : image}
                </Link>
            ) : (
                <>{amp ? image_amp : image}</>
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
    href: PropTypes.string,
    target: PropTypes.string,
    withLazy: PropTypes.bool
};

export default ComImage;
