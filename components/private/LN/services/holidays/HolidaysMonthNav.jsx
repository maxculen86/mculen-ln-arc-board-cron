/* eslint-disable react/require-default-props */
import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import HolidaysCardCalendar from './HolidaysCardCalendar';
import Link from '../../../common/com-link';
import get from '../../../common/utils/get';
import setClassName from '../../../common/utils/setClassName';
import '../../../../../resources/dist/css/ln/components/holidays-month-nav.css';

function HolidaysMonthNav({ calendar, previousAndNextCalendar, year }) {
    const { monthHolidays = [], monthNumber, monthName } = calendar;
    const holidayDayContents = get(
        monthHolidays,
        '[0].holiday_day_contents',
        []
    );
    const extraClassList = holidayDayContents.length
        ? ''
        : ' --withoutHolidayData';
    const _className = setClassName({
        baseClassName: 'holidays-month-nav',
        extraClassList
    });
    const link = previousOrNext =>
        `${previousAndNextCalendar[previousOrNext].url}`;
    const title = previousOrNext =>
        previousAndNextCalendar[previousOrNext].title;
    const text = previousOrNext =>
        `${previousAndNextCalendar[previousOrNext].text}`;

    return (
        <div className={_className}>
            {previousAndNextCalendar.previous && (
                <h3 className="previous-month">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link link={link('previous')} title={title('previous')}>
                        <div className="interaction-container">
                            <div className="circle">
                                <Icon size={32}>
                                    <IconSprite name="arrowLeft" />
                                </Icon>
                            </div>
                            <span className="--fivexs">{text('previous')}</span>
                        </div>
                    </Link>
                </h3>
            )}
            <div className="calendar">
                <HolidaysCardCalendar
                    year={year}
                    monthNumber={monthNumber}
                    monthName={monthName}
                    layout="month"
                    holidayData={holidayDayContents}
                />
            </div>
            {previousAndNextCalendar.next && (
                <h3 className="posterior-month">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link link={link('next')} title={title('next')}>
                        <div className="interaction-container">
                            <div className="circle">
                                <Icon size={32}>
                                    <IconSprite name="arrowRight" />
                                </Icon>
                            </div>
                            <span className="--fivexs">{text('next')}</span>
                        </div>
                    </Link>
                </h3>
            )}
        </div>
    );
}

export default HolidaysMonthNav;
