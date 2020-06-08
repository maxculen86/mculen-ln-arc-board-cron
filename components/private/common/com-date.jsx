import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-date.css';

const ComDate = props => {
    const { date } = props;
    return date ? (
        <time className="com-date" datetime={`${date}`}>
            {date}
        </time>
    ) : null;
};

export default ComDate;
