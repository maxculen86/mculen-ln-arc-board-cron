/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/holidays-grid-container.css';
import HolidaysCardCalendar from './HolidaysCardCalendar';

const HolidaysGridContainer = ({ calendars = [], year }) => {
    return calendars.length ? (
        <div className="holidays-grid-container">
            {calendars.map(({ monthNumber, monthName, holidayData = [] }) => {
                return (
                    <HolidaysCardCalendar
                        year={year}
                        monthNumber={monthNumber}
                        monthName={monthName}
                        holidayData={holidayData}
                        layout="home"
                        key={monthNumber}
                    />
                );
            })}
        </div>
    ) : (
        <></>
    );
};

HolidaysGridContainer.propTypes = {
    calendars: PropTypes.arrayOf(
        PropTypes.shape({
            monthNumber: PropTypes.number,
            monthName: PropTypes.string,
            year: PropTypes.string,
            holidayData: PropTypes.arrayOf(
                PropTypes.shape({
                    days: PropTypes.arrayOf(PropTypes.number),
                    reason: PropTypes.string,
                    day_type_name: PropTypes.oneOf([
                        'Trasladable',
                        'Inamovible',
                        'Puente',
                        'bg-muted'
                    ])
                })
            )
        })
    )
}.isRequired;

export default HolidaysGridContainer;
