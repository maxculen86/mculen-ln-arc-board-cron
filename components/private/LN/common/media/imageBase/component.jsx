import React from 'react';
import PropTypes from 'fusion:prop-types';

const imageBase = ({ urlDefault, sources, altText, zoom, href }) => {
    const pic = (
        <a href={href} className="figure">
            <picture className={`content-pic picture ${zoom && 'zoom'}`}>
                {sources &&
                    sources.map(x => {
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
                <img src={urlDefault} className="content-img" alt={altText} />
            </picture>
        </a>
    );
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
    zoom: PropTypes.bool,
    href: PropTypes.string
};

imageBase.defaultProps = {
    altText: '',
    zoom: false,
    href: ''
};

export default imageBase;
