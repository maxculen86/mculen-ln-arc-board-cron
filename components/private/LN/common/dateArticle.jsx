import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComDate from '../../../private/common/com-date';
function DateArticle({ display_date, hasTime }) {
    return <ComDate display_date={display_date} />;
}

DateArticle.propTypes = {
    display_date: PropTypes.string.isRequired,
    hasTime: PropTypes.bool
};

export default DateArticle;
