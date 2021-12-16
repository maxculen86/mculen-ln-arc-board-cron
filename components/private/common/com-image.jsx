/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';
import ComLink from './com-link';

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
        isApertura,
        withLazy = true
    } = props;

    if (!src) return null;

    const commonProps = {
        src,
        alt: alt || '',
        width,
        height,
        ...(amp && srcsetAMP && { srcSet: srcsetAMP })
    };

    const image = (
        <img
            {...commonProps}
            className={`com-image ${classCondition || ''}`}
            srcSet={srcset}
            loading={withLazy ? 'lazy' : undefined}
        />
    );
    const imageAmp = (
        <amp-img
            {...commonProps}
            class={`com-image ${classCondition || ''}`}
            layout={layout || 'responsive'}
            data-hero={isApertura ? true : undefined}
        />
    );

    return (
        <>
            {href ? (
                <ComLink link={href} target={target || ''} title={alt || ''}>
                    {amp ? imageAmp : image}
                </ComLink>
            ) : (
                <>{amp ? imageAmp : image}</>
            )}
        </>
    );
};

ComImage.propTypes = {
    src: PropTypes.string.isRequired,
    srcset: PropTypes.string,
    srcsetAMP: PropTypes.string,
    alt: PropTypes.string.isRequired,
    classCondition: PropTypes.string,
    amp: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    layout: PropTypes.string,
    withLazy: PropTypes.bool,
    isApertura: PropTypes.bool
};

ComImage.defaultProps = {
    srcset: '',
    srcsetAMP: '',
    classCondition: '',
    href: '',
    target: '',
    withLazy: true,
    layout: undefined,
    isApertura: false
};

export default ComImage;
