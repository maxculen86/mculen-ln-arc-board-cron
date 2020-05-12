import React from 'react';
import PropTypes from 'fusion:prop-types';

const ComSource = props => {
    const { media, srcset } = props;
    if (!srcset) return null;
    return <source media={media} srcset={srcset} />;
};

ComSource.propTypes = {
    srcset: PropTypes.string.isRequired,
    media: PropTypes.string
};

export default ComSource;
