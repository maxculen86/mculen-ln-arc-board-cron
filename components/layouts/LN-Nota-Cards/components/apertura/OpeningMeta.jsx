import React from 'react';
import dateAndTimeUtil, {
    addHoursAndFormat
} from '../../../../private/common/utils/dateAndTimeUtil';

function OpeningMeta({ children, data = {} }) {
    const { publishDate } = data || {};

    const { date } = dateAndTimeUtil(publishDate);
    const { time } = dateAndTimeUtil(addHoursAndFormat(3, publishDate));

    return (
        <div
            className="flex items-center flex-col [&_.vertical]:border-l-0 [&_.vertical]:border-t-0 [&_.vertical]:border-b-0 [&_.vertical]:border-neutral-light-100"
            id="openingMeta"
        >
            <ul className="com-date text-label-md flex justify-start items-center --bullet-list_4 pb-0">
                <li className="flex items-center text-neutral-light-600">
                    <time dateTime={date}>{date}</time>
                </li>
                <li className="flex items-center text-neutral-light-600">
                    <time dateTime={time}>{time}</time>
                </li>
            </ul>
            {children}
        </div>
    );
}

export default OpeningMeta;
