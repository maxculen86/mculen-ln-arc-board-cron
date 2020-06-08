import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-hour.css';

const ComHour = props => {
    const { children } = props;
    return children ? <time className="com-hour">{children}</time> : null;
};

export default ComHour;
