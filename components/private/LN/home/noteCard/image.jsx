import React, { useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';

const Image = ({ imageId }) => {
    const [imageUrl, setImageUrl] = useState();
    const content = useContent({
        source: 'imageSource',
        query: { published: true, id: imageId }
    });

    useEffect(() => {
        setImageUrl(
            content &&
                content.additional_properties &&
                content.additional_properties.resizeUrl
        );
    }, [content]);

    return (
        <img src={imageUrl} className="img-desktop" alt="imagen-destacada" />
    );
};

Image.propTypes = {
    imageId: PropTypes.string.isRequired
};

export default Image;
