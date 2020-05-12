import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/components/com-text.css';

const ComText = props => {
    const { children, textname, classCondition } = props;
    //if (!textname) return null;

    return (
        <span className={`com-text ${classCondition ? classCondition : ''}`}>
            {children || textname}
        </span>
    );
};

ComText.propTypes = {
    textname: PropTypes.string,
    classCondition: PropTypes.string
};

export default ComText;
