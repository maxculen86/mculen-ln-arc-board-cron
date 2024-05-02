import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
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
    const id = get(globalContent, '_id', '');
    return Object.keys(calendar).length ? (
        <Static id={id} htmlOnly>
            <HolidaysNav year={serviceItem} layout="month" />
            <HolidaysMonthNav
                calendar={calendar}
                previousAndNextCalendar={previousAndNextCalendar}
                year={serviceItem}
            />
        </Static>
    ) : (
        <></>
    );
};

HolidaysCalendarDetail.label = 'LN Calendario Detalle';

export default HolidaysCalendarDetail;
