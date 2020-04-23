import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/components/com-image.css';

const ComImage = props => {
    const { src, alt, amp } = props;
    if (!src) return null;
    return (
        <>
            {amp ? (
                <amp-img src={src} layout="fixed" width="80" height="80" />
            ) : (
                <img src={src} className="com-image" alt={alt} />
            )}
        </>
    );
};

ComImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    amp: PropTypes.bool.isRequired
};

export default ComImage;
