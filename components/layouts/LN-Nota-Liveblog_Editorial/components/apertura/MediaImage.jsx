import React from 'react';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import PropTypes from 'prop-types';

function MediaImage({ src, alt, sources }) {
    return (
        <div className="w-100">
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
    sources: PropTypes.shape({})
};

MediaImage.defaultProps = {
    alt: '',
    sources: {}
};

export default MediaImage;
