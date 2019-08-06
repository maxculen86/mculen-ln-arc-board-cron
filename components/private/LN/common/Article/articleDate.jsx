import React from 'react';
import dateAndTimeUtil from '../../../common/utils/dateAndTimeUtil';

export default function ArticleDate({ display_date }) {
    const { date, time } = dateAndTimeUtil(display_date);
    return (
        <h4 className="com-date">
            {date} &#9679; {time}
        </h4>
    );
}
