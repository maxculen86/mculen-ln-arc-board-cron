import React from 'react';
import PropTypes from 'fusion:prop-types';

const ComSource = props => {
    const { media, srcset, src, type } = props;
    //if (!src || !srcset) return null;
    return <source media={media} srcset={srcset} src={src} type={type} />;
};

ComSource.propTypes = {
    srcset: PropTypes.string,
    media: PropTypes.string,
    src: PropTypes.string,
    type: PropTypes.string
};

export default ComSource;
