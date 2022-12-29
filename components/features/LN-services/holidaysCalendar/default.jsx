import React from 'react';
import { useAppContext } from 'fusion:context';
import get from '../../../private/common/utils/get';
import HolidaysGridContainer from '../../../private/LN/services/holidays/HolidaysGridContainer';
import HolidaysNav from '../../../private/LN/services/holidays/HolidaysNav';
import StaticContent from '../../../private/common/staticContent';

const HolidaysHomeCalendar = () => {
    const { globalContent = {} } = useAppContext();
    const serviceItem = get(globalContent, 'serviceItem', '');
    const calendars = get(globalContent, 'dataService.calendars', []);

    return calendars.length ? (
        <StaticContent>
            <HolidaysNav layout="home" year={serviceItem} />
            <HolidaysGridContainer calendars={calendars} year={serviceItem} />
        </StaticContent>
    ) : (
        <></>
    );
};

HolidaysHomeCalendar.label = 'LN Calendarios Home Feriados';

export default HolidaysHomeCalendar;
