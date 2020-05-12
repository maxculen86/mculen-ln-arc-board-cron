import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComPicture from './com-picture';
import ComSource from './com-source';
import ComImage from './com-image';

import '../../../resources/dist/css/ln/modules/mod-picture.css';

const ModImage = props => {
    const { media, src, srcset, alt, classCondition } = props;
    if (!src || !srcset) return null;

    return (
        <ComPicture classCondition={classCondition}>
            <ComSource media={media} srcset={srcset} />
            <ComImage src={src} alt={alt} />
        </ComPicture>
    );
};

ModImage.propTypes = {
    src: PropTypes.string.isRequired,
    srcset: PropTypes.string.isRequired,
    media: PropTypes.string,
    alt: PropTypes.string,
    classCondition: PropTypes.string
};

export default ModImage;
