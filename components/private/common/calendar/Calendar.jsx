/* eslint-disable no-plusplus */
/* eslint-disable react/require-default-props */
import React from 'react';
import Link from '../com-link';
import Text from '../text';
import {
    dayLetter,
    getInitialDay,
    getLastDay,
    getHighlightDayClass
} from './helper/dayHelper';
import { getArgentinaYear } from '../utils/dateAndTimeUtil';
import '../../../../resources/dist/css/ln/modules/calendar.css';

function Calendar({
    year,
    monthNumber,
    holidayData = [],
    monthName,
    layout = 'month'
}) {
    const newDate = new Date();
    const validMonth = monthNumber ? monthNumber - 1 : newDate.getMonth();
    const validMonthName =
        monthName ||
        newDate.toLocaleDateString('es-ES', {
            month: 'long'
        });
    const validYear = Number(year) || getArgentinaYear();
    const initialDay = getInitialDay(validYear, validMonth);
    const lastDayOfMonth = getLastDay(validYear, validMonth + 1);
    const days = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: initialDay }).fill(' ');
    const daysMonth = [...emptyDays, ...days];
    const attributes = {
        home: {
            titleTag: 'h3',
            titleLink: `Ir a feriados de ${validMonthName.toLowerCase()} del ${year}`,
            link: `/feriados/${year}/${validMonthName.toLowerCase()}/`
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
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
                        extraClass={`com-text${getHighlightDayClass(
                            holidayData,
                            day
                        )}`}
                    >
                        {day}
                    </Text>
                ))}
            </div>
        </section>
    );
}

export default Calendar;
