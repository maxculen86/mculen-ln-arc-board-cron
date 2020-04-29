import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/components/com-image.css';

const ComImage = props => {
    const { src, alt, classCondition } = props;
    if (!src) return null;
    return (
        <img
            src={src}
            className={`com-image ${classCondition || ''}`}
            loading="lazy"
            alt={alt}
        />
    );
};

ComImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    classCondition: PropTypes.string
};

export default ComImage;
