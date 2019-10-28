import React from 'react';
import PropTypes from 'fusion:prop-types';
import Placeholder from '../../imagePlaceholder';

const imageBase = ({ urlDefault, sources, altText, zoom, href }) => {
    const pic = (
        <Placeholder href={href} zoom={zoom}>
            {sources &&
                sources.map(x => {
                    return (
                        <source
                            key={x.option.media}
                            media={x.option.media}
                            srcSet={x.resizedUrl}
                            className={x.option.class}
                            alt={altText}
                        />
                    );
                })}
            <img src={urlDefault} className="content-img" alt={altText} />
        </Placeholder>
    );
    return pic;
};

imageBase.propTypes = {
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            media: PropTypes.string,
            class: PropTypes.string,
            resizedUrl: PropTypes.string
        })
    ),
    altText: PropTypes.string,
    zoom: PropTypes.bool,
    href: PropTypes.string
};

// imageBase.defaultProps = {
//     altText: '',
//     zoom: false,
//     href: ''
// };

export default imageBase;
