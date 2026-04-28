import React from 'react';
import Static from 'fusion:static';
import { dateVariants } from './styles';
import dateAndTimeUtil from '../../../private/common/utils/dateAndTimeUtil';

function SimpleDate({ dateTime, showTime = true, variant = 'dark' }) {
    const { date, time } = dateAndTimeUtil(dateTime);
    return (
        <Static id="LN-fecha-nota" htmlOnly>
            <ul className="simple-date flex jc-start ai-center --bullet-list_12 w-100 pb-12 pb-0_m">
                <li className={dateVariants({ variant })}>
                    <time dateTime={date}>{date}</time>
                </li>
                {showTime && (
                    <li className={dateVariants({ variant })}>
                        <time dateTime={time}>{time}</time>
                    </li>
                )}
            </ul>
        </Static>
    );
}

export default SimpleDate;
