import React from 'react';
import PropTypes from 'fusion:prop-types';

const TextFile = props => {
    const {
        customFields: { text }
    } = props;
    return <>{text || ''}</>;
};

TextFile.propTypes = {
    customFields: PropTypes.shape({
        text: PropTypes.richtext
    })
};

TextFile.defaultProps = {
    customFields: {}
};

export default TextFile;
