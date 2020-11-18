import React from 'react';
import PropTypes from 'fusion:prop-types';

const ImageAuthor = ({ url }) => {
    return (
        <figure role="button" className="mod-figure --horizontal">
            <div className="mod-picture ">
                <img
                    decoding="async"
                    sizes="(max-width: 320px) 320px, 100vw"
                    alt="ver que onda"
                    src={url}
                    srcSet={url}
                    className="i-amphtml-fill-content i-amphtml-replaced-content"
                />
            </div>
        </figure>
    );
};

export default ImageAuthor;
