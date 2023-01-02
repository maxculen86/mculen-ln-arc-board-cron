import React from 'react';
import { useAppContext } from 'fusion:context';
import StaticContent from '../../../private/common/staticContent';
import get from '../../../private/common/utils/get';
import HolidaysMonthNav from '../../../private/LN/services/holidays/HolidaysMonthNav';
import HolidaysNav from '../../../private/LN/services/holidays/HolidaysNav';

const HolidaysCalendarDetail = () => {
    const { globalContent = {} } = useAppContext();
    const serviceItem = get(globalContent, 'serviceItem', '');
    const { previousAndNextCalendar = {}, calendar = {} } = get(
        globalContent,
        'dataService',
        {}
    );
    return Object.keys(calendar).length ? (
        <StaticContent>
            <HolidaysNav year={serviceItem} layout="month" />
            <HolidaysMonthNav
                calendar={calendar}
                previousAndNextCalendar={previousAndNextCalendar}
                year={serviceItem}
            />
        </StaticContent>
    ) : (
        <></>
    );
};

HolidaysCalendarDetail.label = 'LN Calendario Detalle';

export default HolidaysCalendarDetail;
