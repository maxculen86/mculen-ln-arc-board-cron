import React from 'react';
import PropTypes from 'fusion:prop-types';
import dateAndTimeUtil from '../common/utils/dateAndTimeUtil';

import '../../../resources/dist/css/ln/components/com-date.css';

const ComDate = ({ display_date, size }) => {
    const { date } = dateAndTimeUtil(display_date);
    return (
        <time className={`com-date ${size || '--twoxs'}`} dateTime={`${date}`}>
            {date}
        </time>
    );
};

ComDate.propTypes = {
    display_date: PropTypes.string.isRequired
};

export default ComDate;
