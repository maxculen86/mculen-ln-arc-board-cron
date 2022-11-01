/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/holidays-month-nav.css';
import Link from '../../../common/com-link';
import Icon from '../../../common/icon';
import HolidaysCardCalendar from './HolidaysCardCalendar';
import get from '../../../common/utils/get';

const HolidaysMonthNav = ({ calendar, previousAndNextCalendar, year }) => {
    const { monthHolidays = [], monthNumber, monthName } = calendar;
    const holidayDayContents = get(
        monthHolidays,
        '[0].holiday_day_contents',
        []
    );
    const link = previousOrNext => {
        return `https://www.lanacion.com.ar${previousAndNextCalendar[previousOrNext].url}`;
    };
    const title = previousOrNext => {
        return `Ir a feriados de ${previousAndNextCalendar[previousOrNext].text}`;
    };
    const text = previousOrNext => {
        return `${previousAndNextCalendar[previousOrNext].text}`;
    };

    return (
        <div className="holidays-month-nav">
            {previousAndNextCalendar.previous && (
                <h3 className="previous-month">
                    <Link link={link('previous')} title={title('previous')}>
                        <div className="interaction-container">
                            <div className="circle">
                                <Icon name="arrow-left" />
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
                    <Link link={link('next')} title={title('next')}>
                        <div className="interaction-container">
                            <div className="circle">
                                <Icon name="arrow-right" />
                            </div>
                            <span className="--fivexs">{text('next')}</span>
                        </div>
                    </Link>
                </h3>
            )}
        </div>
    );
};

HolidaysMonthNav.propTypes = {
    calendar: PropTypes.shape({
        year: PropTypes.string,
        monthNumber: PropTypes.number,
        monthName: PropTypes.string,
        monthHolidays: PropTypes.arrayOf(
            PropTypes.shape({
                month: PropTypes.number,
                holiday_day_contents: PropTypes.arrayOf(
                    PropTypes.shape({
                        days: PropTypes.arrayOf(PropTypes.number),
                        reason: PropTypes.string,
                        day_type: PropTypes.number,
                        day_type_name: PropTypes.string
                    })
                )
            })
        )
    }).isRequired,
    previousAndNextCalendar: PropTypes.shape({
        previous: PropTypes.shape({
            text: PropTypes.string,
            url: PropTypes.string
        }),
        next: PropTypes.shape({
            text: PropTypes.string,
            url: PropTypes.string
        })
    }).isRequired,
    year: PropTypes.number.isRequired
};

export default HolidaysMonthNav;
