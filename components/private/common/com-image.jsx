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
        alt,
        layout,
        classCondition,
        amp,
        width,
        height,
        href,
        target,
        isApertura,
        svg,
        sizes
    } = props;

    if (!src) return null;

    const commonProps = {
        src,
        alt,
        width,
        height
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

    const rightImage = amp ? imageAmp : image;

    return (
        <>
            {href ? (
                <ComLink link={href} target={target || ''} title={alt}>
                    {rightImage}
                </ComLink>
            ) : (
                <>{rightImage}</>
            )}
        </>
    );
};

ComImage.propTypes = {
    src: PropTypes.string.isRequired,
    srcset: PropTypes.string,
    alt: PropTypes.string,
    classCondition: PropTypes.string,
    amp: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    layout: PropTypes.string,
    sizes: PropTypes.string,
    isApertura: PropTypes.bool,
    svg: PropTypes.bool
};

ComImage.defaultProps = {
    srcset: undefined,
    classCondition: '',
    href: '',
    alt: undefined,
    target: '',
    layout: undefined,
    isApertura: false,
    svg: false,
    sizes: undefined
};

export default ComImage;
