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
        svg
    } = props;

    if (!src) return null;

    const commonProps = {
        src,
        alt,
        width,
        height,
        ...(amp && srcsetAMP && { srcSet: srcsetAMP })
    };

    const classes = `${svg ? '' : 'com-image'} ${classCondition || ''}`;

    const image = (
        <img
            {...commonProps}
            className={classes}
            srcSet={srcset}
            loading={isApertura ? 'eager' : 'lazy'}
        />
    );
    const imageAmp = (
        <amp-img
            {...commonProps}
            class={classes}
            layout={layout || 'responsive'}
            data-hero={isApertura ? true : undefined}
            data-amp-auto-lightbox-disable="true"
        />
    );

    return (
        <>
            {href ? (
                <ComLink link={href} target={target || ''} title={alt}>
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
    alt: PropTypes.string,
    classCondition: PropTypes.string,
    amp: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    layout: PropTypes.string,
    isApertura: PropTypes.bool,
    svg: PropTypes.bool
};

ComImage.defaultProps = {
    srcset: undefined,
    srcsetAMP: '',
    classCondition: '',
    href: '',
    alt: undefined,
    target: '',
    layout: undefined,
    isApertura: false,
    svg: false
};

export default ComImage;
