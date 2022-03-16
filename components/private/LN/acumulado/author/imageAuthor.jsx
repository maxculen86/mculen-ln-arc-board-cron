import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComImage from '../../../common/com-image';

const ImageAuthor = ({ outputType, url, name }) => {
    return (
        <figure className="mod-figure --horizontal">
            <div className="placeholder ">
                <ComImage
                    src={url}
                    srcset={url}
                    srcsetAMP={url}
                    alt={name}
                    amp={outputType === 'amp'}
                    width="280"
                    height="280"
                />
            </div>
        </figure>
    );
};

ImageAuthor.propTypes = {
    url: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default ImageAuthor;

/*
<img
    decoding="async"
    sizes="(max-width: 320px) 320px, 100vw"
    alt="ver que onda"
    src={url}
    srcSet={url}
    className="i-amphtml-fill-content i-amphtml-replaced-content"
/>

*/
