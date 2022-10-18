/* eslint-disable no-plusplus */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import '../../../../resources/dist/css/ln/modules/calendar.css';

import Text from '../text';

const Calendar = ({ year, month, daysHighlight }) => {
    const validMonth = month || new Date().getMonth();
    const validYear = year || new Date().getFullYear();
    const dayLetter = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const dictionaryMonths = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ];

    const getInitialDay = (yr, mnth) => {
        const day = new Date(yr, mnth, 1).getDay();
        return day === 0 ? 7 : day - 1;
    };

    const getLastDay = (yr, mnth) => {
        let lastDay = 31;

        while (
            !(
                new Date(yr, mnth, 1).getMonth() ===
                new Date(yr, mnth, lastDay).getMonth()
            )
        ) {
            lastDay--;
        }

        return lastDay;
    };

    const getHighlightDayClass = day => {
        const dayHighlight = daysHighlight
            ? daysHighlight.find(h => day === h.day)
            : undefined;
        if (!dayHighlight) return '';
        return dayHighlight.class;
    };
    const initialDay = getInitialDay(validYear, validMonth);
    const lastDayOfMonth = getLastDay(validYear, validMonth);
    const days = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1);
    const emptyDays = new Array(initialDay).fill(' ');
    const daysMonth = [...emptyDays, ...days];

    return (
        <section className="calendar-common">
            <div className="labeled-calendar">
                <Text
                    tag="h2"
                    size="--4xs"
                    font="arial"
                    weight="bold"
                    extraClass="com-text --title"
                >
                    {dictionaryMonths[validMonth]}
                </Text>
                <div className="days-of-week">
                    {dayLetter.map(letter => (
                        <Text tag="h2" size="--4xs" font="arial" weight="bold">
                            {letter}
                        </Text>
                    ))}
                </div>
            </div>
            <div className="date-calendar">
                {daysMonth.map((day, index) => (
                    <Text
                        key={index + 1}
                        size="--4xs"
                        font="arial"
                        extraClass={`com-text ${getHighlightDayClass(day)}`}
                    >
                        {day}
                    </Text>
                ))}
            </div>
        </section>
    );
};

const propTypes = {
    year: PropTypes.number,
    month: PropTypes.number,
    daysHighlight: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.number,
            class: PropTypes.oneOf([
                'bg-green',
                'bg-blue',
                'bg-outline',
                'bg-muted'
            ])
        })
    )
};

Calendar.propTypes = propTypes;

export default Calendar;
