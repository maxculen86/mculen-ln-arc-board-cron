import React from 'react';
import PropTypes from 'fusion:prop-types';

const baseImage = ({ sources, altText, zoom, href }) => {
    let pic = (
        <picture className={`content-pic picture ${zoom && 'zoom'}`}>
            {sources.map(x => {
                return (
                    <source
                        media={x.media}
                        srcSet={x.url}
                        className={x.class}
                        alt={altText}
                    />
                );
            })}
            <img alt={altText} />
        </picture>
    );

    if (href) {
        pic = (
            <a href={href} className="figure">
                {pic}
            </a>
        );
    }
    return pic;
};

baseImage.propTypes = {
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            media: PropTypes.string,
            class: PropTypes.string,
            url: PropTypes.string
        })
    ).isRequired,
    altText: PropTypes.string,
    zoom: PropTypes.bool
};

baseImage.defaultProps = {
    altText: '',
    zoom: false
};

export default baseImage;
