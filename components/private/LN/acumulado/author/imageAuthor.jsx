import React from 'react';
import ComImage from '../../../common/com-image';

function ImageAuthor({ url, name }) {
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
}

export default ImageAuthor;
