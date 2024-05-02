import React from 'react';
import { useContent } from 'fusion:content';
import Static from 'fusion:static';
import HolidaysCounter from '../../../private/LN/services/holidays/HolidaysCounter';
import { getNextHolidayData } from '../../../../content/sources/utils/servicesSource/holidays/holidaysHelper';
import filter from '../../../../content/filters/LN/services/nextHolidayFilter';

const HolidaysCountdown = () => {
    const { dataService = {} } =
        useContent({
            source: 'servicesSource',
            query: {
                id: '/feriados',
                service: 'feriados'
            },
            staticMode: true,
            filter
        }) || {};
    return (
        <Static id="next-holiday-counter" htmlOnly>
            {(() => {
                const { calendars = [] } = dataService;

                const result = getNextHolidayData(calendars);
                const { countdown, monthName, day, reason, typeHoliday } =
                    result || {};

                return calendars.length && result ? (
                    <HolidaysCounter
                        nextHoliday={day}
                        month={monthName}
                        remainingDays={countdown}
                        description={reason}
                        typeHoliday={typeHoliday}
                    />
                ) : (
                    <></>
                );
            })()}
        </Static>
    );
};

HolidaysCountdown.label = 'LN Feriados Contador Próximo';

export default HolidaysCountdown;
