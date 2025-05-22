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
        classCondition,
        width,
        height,
        href,
        target,
        isApertura,
        shouldLoadEager,
        svg,
        searchableField
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
            {...searchableField}
            className={classes}
            srcSet={srcset}
            loading={isApertura || shouldLoadEager ? 'eager' : 'lazy'}
            fetchPriority={isApertura ? 'high' : 'low'}
            decoding="async"
        />
    );

    return (
        <>
            {href ? (
                <ComLink link={href} target={target || ''} title={alt}>
                    {image}
                </ComLink>
            ) : (
                <>{image}</>
            )}
        </>
    );
};

ComImage.propTypes = {
    src: PropTypes.string.isRequired,
    srcset: PropTypes.string,
    alt: PropTypes.string,
    classCondition: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    href: PropTypes.string,
    target: PropTypes.string,
    layout: PropTypes.string,
    isApertura: PropTypes.bool,
    shouldLoadEager: PropTypes.bool,
    svg: PropTypes.bool,
    searchableField: PropTypes.shape({
        imageId: PropTypes.string
    })
};

ComImage.defaultProps = {
    srcset: undefined,
    classCondition: '',
    href: '',
    alt: undefined,
    target: '',
    layout: undefined,
    isApertura: false,
    shouldLoadEager: false,
    svg: false,
    height: undefined,
    width: undefined,
    searchableField: undefined
};

export default ComImage;
