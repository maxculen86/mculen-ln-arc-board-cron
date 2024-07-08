import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComImage from '../../../common/com-image';

const ImageAuthor = ({ url, name }) => {
    return (
        <figure className="mod-figure --horizontal">
            <div className="placeholder ">
                <ComImage
                    src={url}
                    srcset={url}
                    alt={name}
                    width="280"
                    height="280"
                    isApertura
                />
            </div>
        </figure>
    );
};

ImageAuthor.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default ImageAuthor;
