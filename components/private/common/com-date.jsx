import React from 'react';
import PropTypes from 'fusion:prop-types';
import dateAndTimeUtil from '../common/utils/dateAndTimeUtil';

import '../../../resources/dist/css/ln/components/com-date.css';

const ComDate = ({ display_date }) => {
    const { date } = dateAndTimeUtil(display_date);
    return (
        <time className="com-date" datetime={`${date}`}>
            {date}
        </time>
    );
};

export default ComDate;
