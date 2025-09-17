import React from 'react';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import PropTypes from 'prop-types';

function MediaImage({ src, alt, sources, className }) {
    return (
        <div className={`w-100 ${className || ''}`}>
            <Adaptableimage
                alt={alt}
                className="w-100 ratio-16-9"
                fetchPriority="high"
                loading="eager"
                sources={sources}
                src={src}
            />
        </div>
    );
}

MediaImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({})),
    className: PropTypes.string
};

MediaImage.defaultProps = {
    alt: '',
    sources: [],
    className: ''
};

export default MediaImage;
