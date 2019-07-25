import React from 'react';
import PropTypes from 'fusion:prop-types';

const baseImage = ({ sources, altText }) => {
    return (
        <picture className="content-picture">
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
};

baseImage.propTypes = {
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            media: PropTypes.string,
            class: PropTypes.string,
            url: PropTypes.string
        })
    ),
    altText: PropTypes.string
};

export default baseImage;
