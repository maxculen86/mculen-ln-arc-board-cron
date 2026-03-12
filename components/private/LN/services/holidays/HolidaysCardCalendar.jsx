/* eslint-disable react/require-default-props */
import React from 'react';
import '../../../../../resources/dist/css/ln/components/holidays-card-calendar.css';
import Text from '../../../common/text';
import Calendar from '../../../common/calendar/Calendar';
import setClassName from '../../../common/utils/setClassName';

function HolidaysCardCalendar({
    year,
    monthNumber,
    monthName,
    holidayData = [],
    layout
}) {
    const extraClass = {
        home: '--vertical',
        month: '--horizontal',
        Inamovible: '--immovable',
        Puente: '--bridge',
        Trasladable: '--transferable'
    };
    const extraClassList = holidayData.length ? '' : ' --withoutHolidayData';
    const _className = setClassName({
        baseClassName: 'holidays-card-calendar',
        extraClass: extraClass[layout],
        extraClassList
    });
    return (
        <div className={_className}>
            <div className="calendar-container">
                <Calendar
                    year={year}
                    monthNumber={monthNumber}
                    monthName={monthName}
                    holidayData={holidayData}
                    layout={layout}
                />
            </div>
            {holidayData.length ? (
                <ul className="holidays-list">
                    {holidayData.map(
                        ({ days, day_type_name: dayTypeName, reason }) => (
                            <li>
                                <span className={extraClass[dayTypeName]}>
                                    {days}
                                </span>
                                <Text tag="h4">{reason}</Text>
                            </li>
                        )
                    )}
                </ul>
            ) : null}
        </div>
    );
}

export default HolidaysCardCalendar;
