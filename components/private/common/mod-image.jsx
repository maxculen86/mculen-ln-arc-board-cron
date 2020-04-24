import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';
import ComImage from './com-image';

import '../../../resources/dist/css/ln/components/mod-image.css';

const ModImage = props => {
    const { link, target, src, alt } = props;

    if (!link || !src) return null;

    return (
        <ComLink
            link={link}
            title={alt}
            target={target}
            classCondition={`mod-image`}
        >
            <ComImage src={src} alt={alt} />
        </ComLink>
    );
};

ModImage.propTypes = {
    link: PropTypes.string.isRequired,
    target: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
};

export default ModImage;
