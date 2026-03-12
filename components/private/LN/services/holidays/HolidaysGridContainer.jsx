/* eslint-disable react/require-default-props */
import React from 'react';
import '../../../../../resources/dist/css/ln/components/holidays-grid-container.css';
import HolidaysCardCalendar from './HolidaysCardCalendar';

function HolidaysGridContainer({ calendars = [], year }) {
    return calendars.length ? (
        <div className="holidays-grid-container">
            {calendars.map(({ monthNumber, monthName, holidayData = [] }) => (
                <HolidaysCardCalendar
                    year={year}
                    monthNumber={monthNumber}
                    monthName={monthName}
                    holidayData={holidayData}
                    layout="home"
                    key={monthNumber}
                />
            ))}
        </div>
    ) : null;
}

export default HolidaysGridContainer;
