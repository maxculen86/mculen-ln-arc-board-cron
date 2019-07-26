import React from 'react';
import PropTypes from 'fusion:prop-types';

const imageBase = ({ sources, altText, zoom, href }) => {
    let pic = (
        <picture className={`content-pic picture ${zoom && 'zoom'}`}>
            {sources.map(x => {
                return (
                    <source
                        key={x.media}
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

imageBase.propTypes = {
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            media: PropTypes.string.isRequired,
            class: PropTypes.string,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    altText: PropTypes.string,
    zoom: PropTypes.bool
};

imageBase.defaultProps = {
    altText: '',
    zoom: false
};

export default imageBase;
