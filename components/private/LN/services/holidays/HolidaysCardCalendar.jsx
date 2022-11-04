/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/holidays-card-calendar.css';
import Text from '../../../common/text';
import Calendar from '../../../common/calendar/Calendar';

const HolidaysCardCalendar = ({
    year,
    monthNumber,
    monthName,
    holidayData,
    layout
}) => {
    const extraClass = {
        home: ' --vertical',
        month: ' --horizontal',
        Inamovible: ' --immovable',
        Puente: ' --bridge',
        Trasladable: ' --transferable'
    };

    return (
        <div className={`holidays-card-calendar${extraClass[layout] || ''}`}>
            <div className="calendar-container">
                <Calendar
                    year={year}
                    monthNumber={monthNumber}
                    monthName={monthName}
                    holidayData={holidayData}
                    layout={layout}
                />
            </div>
            {holidayData && (
                <ul className="holidays-list">
                    {holidayData.map(
                        ({ days, day_type_name: dayTypeName, reason }) => {
                            return (
                                <li>
                                    <span className={extraClass[dayTypeName]}>
                                        {days}
                                    </span>
                                    <Text tag="span">{reason}</Text>
                                </li>
                            );
                        }
                    )}
                </ul>
            )}
        </div>
    );
};

HolidaysCardCalendar.propTypes = {
    holidayData: PropTypes.arrayOf(
        PropTypes.shape({
            days: PropTypes.arrayOf(PropTypes.number),
            reason: PropTypes.string,
            day_type_name: PropTypes.oneOf([
                'Inamovible',
                'Puente',
                'Trasladable'
            ])
        })
    ),
    layout: PropTypes.oneOf(['home', 'month']),
    year: PropTypes.string,
    monthNumber: PropTypes.number,
    monthName: PropTypes.string
};

export default HolidaysCardCalendar;
