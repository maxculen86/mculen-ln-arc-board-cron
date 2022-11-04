/* eslint-disable no-plusplus */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Link from '../com-link';
import Text from '../text';
import '../../../../resources/dist/css/ln/modules/calendar.css';

const Calendar = ({
    year,
    monthNumber,
    holidayData = [],
    monthName,
    layout = 'month'
}) => {
    const validMonth = monthNumber ? monthNumber - 1 : new Date().getMonth();
    const validMonthName =
        monthName ||
        new Date().toLocaleDateString('es-ES', {
            month: 'long'
        });
    const validYear = year || new Date().getFullYear();
    const dayLetter = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    const getInitialDay = (yr, mnth) => {
        const day = new Date(yr, mnth, 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const getLastDay = (yr, mnth) => {
        const lastDay = new Date(yr, mnth, 0);
        return lastDay.getDate();
    };

    const getHighlightDayClass = day => {
        const dictionary = {
            Inamovible: ' --immovable',
            Puente: ' --bridge',
            Trasladable: ' --transferable'
        };
        const dayHighlight = holidayData.length
            ? holidayData.find(h => day === h.days[0])
            : undefined;
        if (!dayHighlight) return '';
        return dictionary[dayHighlight.day_type_name];
    };
    const initialDay = getInitialDay(Number(validYear), validMonth);
    const lastDayOfMonth = getLastDay(Number(validYear), validMonth + 1);
    const days = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1);
    const emptyDays = new Array(initialDay).fill(' ');
    const daysMonth = [...emptyDays, ...days];
    const attributes = {
        home: {
            titleTag: 'h3',
            titleLink: `Ir a feriados de ${validMonthName} del ${year}`,
            link: `https://www.lanacion.com.ar/feriados/${year}/${validMonthName.toLowerCase()}/`
        },
        month: {
            titleTag: 'h2',
            titleLink: undefined,
            link: false
        }
    };
    const { titleTag, titleLink, link } = attributes[layout];
    return (
        <section className="calendar-common">
            <div className="labeled-calendar">
                <Text
                    tag={titleTag}
                    size="--4xs"
                    weight="bold"
                    extraClass="com-text --title"
                >
                    <Link link={link} title={titleLink}>
                        {validMonthName}
                    </Link>
                </Text>
                <div className="days-of-week">
                    {dayLetter.map(letter => (
                        <Text tag="h2" size="--4xs" weight="bold">
                            {letter}
                        </Text>
                    ))}
                </div>
            </div>
            <div className="date-calendar">
                {daysMonth.map(day => (
                    <Text
                        key={day}
                        extraClass={`com-text${getHighlightDayClass(day)}`}
                    >
                        {day}
                    </Text>
                ))}
            </div>
        </section>
    );
};

Calendar.propTypes = {
    year: PropTypes.string,
    monthNumber: PropTypes.number,
    monthName: PropTypes.string,
    holidayData: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.number,
            class: PropTypes.oneOf(['Trasladable', 'Inamovible', 'Puente'])
        })
    ),
    layout: PropTypes.oneOf(['home', 'month'])
};

export default Calendar;
