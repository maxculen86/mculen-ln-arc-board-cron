import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/components/com-subtitle.css';

const ComSubtitle = props => {
    const { children, classCondition, size } = props;

    return (
        <h4 className={`com-subtitle ${size || ''} ${classCondition || ''}`}>
            {children || ``}
        </h4>
    );
};

ComSubtitle.propTypes = {
    children: PropTypes.string.isRequired,
    classCondition: PropTypes.string,
    size: PropTypes.string.isRequired
};

ComSubtitle.defaultProps = {
    classCondition: ''
};

export default ComSubtitle;
