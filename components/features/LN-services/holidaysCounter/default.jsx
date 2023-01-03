import React from 'react';
import { useContent } from 'fusion:content';
import HolidaysCounter from '../../../private/LN/services/holidays/HolidaysCounter';
import { getNextHolidayData } from '../../../../content/sources/utils/servicesSource/holidays/holidaysHelper';
import filter from '../../../../content/filters/LN/services/nextHolidayFilter';
import StaticContent from '../../../private/common/staticContent';

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
        <StaticContent>
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
        </StaticContent>
    );
};

HolidaysCountdown.label = 'LN Feriados Contador Próximo';

export default HolidaysCountdown;
