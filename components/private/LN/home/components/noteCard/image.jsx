import React, { useEffect, useState } from 'react';

import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import { useContent } from 'fusion:content';

const Image = ({ id: featureId, imageId }) => {
    const [imageUrl, setImageUrl] = useState();
    const content = useContent({
        source: 'imageSource',
        query: { published: true, id: imageId.trim() }
    });

    useEffect(() => {
        setImageUrl(content && content.url);
    }, [content]);

    return (
        // <Static id={featureId}>
        <picture>
            {imageUrl && <img alt="imagen-destacada" srcSet={imageUrl} />}
        </picture>
        // </Static>
    );
};

Image.propTypes = {
    id: PropTypes.string.isRequired,
    imageId: PropTypes.string.isRequired
};

export default Consumer(Image);
