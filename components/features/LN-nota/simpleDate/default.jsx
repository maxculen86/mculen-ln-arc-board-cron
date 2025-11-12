import React from 'react';
import Static from 'fusion:static';
import PropTypes from 'prop-types';
import { dateVariants } from './styles';
import dateAndTimeUtil from '../../../private/common/utils/dateAndTimeUtil';

function SimpleDate({ dateTime, showTime, variant }) {
    const { date, time } = dateAndTimeUtil(dateTime);
    const dateTimeItems = showTime ? [date, time] : [date];
    return (
        <Static id="LN-fecha-nota" htmlOnly>
            <ul className="simple-date flex jc-start ai-center --bullet-list_12 w-100 pb-12 pb-0_m">
                {dateTimeItems.map(item => (
                    <li key={item} className={dateVariants({ variant })}>
                        <time>{item}</time>
                    </li>
                ))}
            </ul>
        </Static>
    );
}

export default SimpleDate;

SimpleDate.propTypes = {
    dateTime: PropTypes.string.isRequired,
    showTime: PropTypes.bool,
    variant: PropTypes.oneOf(['dark', 'light'])
};

SimpleDate.defaultProps = {
    showTime: true,
    variant: 'dark'
};
