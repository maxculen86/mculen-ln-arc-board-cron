import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/components/com-text.css';

const ComText = props => {
    const { textname, classCondition } = props;
    if (!textname) return null;

    return (
        <span className={`com-text ${classCondition ? classCondition : ''}`}>
            {textname}
        </span>
    );
};

ComText.propTypes = {
    textname: PropTypes.string.isRequired,
    classCondition: PropTypes.string
};

export default ComText;
