import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import StaticValidation from '../../../private/common/staticValidation';
import HolidaysCounter from '../../../private/LN/services/holidays/HolidaysCounter';
import { getNextHolidayData } from '../../../../content/sources/utils/servicesSource/holidays/holidaysHelper';
import filter from '../../../../content/filters/LN/services/nextHolidayFilter';

const HolidaysCountdown = ({ id: _featureId }) => {
    return (
        <StaticValidation id={_featureId} htmlOnly persistent>
            {(() => {
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
        </StaticValidation>
    );
};

HolidaysCountdown.label = 'LN Feriados Contador Próximo';

HolidaysCountdown.propTypes = { id: PropTypes.string.isRequired };

export default HolidaysCountdown;
