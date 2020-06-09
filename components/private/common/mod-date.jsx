import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComDate from './com-date';
import ComHour from './com-hour';
import '../../../resources/dist/css/ln/modules/mod-date.css';

const ModDate = ({ display_date }) => {
    return (
        <span className="mod-date">
            <ComDate display_date={display_date} />
            <ComHour display_date={display_date} />
        </span>
    );
};

ModDate.propTypes = {
    display_date: PropTypes.string.isRequired
};

export default ModDate;
