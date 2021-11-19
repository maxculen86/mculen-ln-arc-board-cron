import React from 'react';
import PropTypes from 'fusion:prop-types';

const ComSource = props => {
    const { media, srcset, src, type } = props;
    return <source media={media} srcSet={srcset} src={src} type={type} />;
};

ComSource.propTypes = {
    srcset: PropTypes.string,
    media: PropTypes.string,
    src: PropTypes.string,
    type: PropTypes.string
};

export default ComSource;
