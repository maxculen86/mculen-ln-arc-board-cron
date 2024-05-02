import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import get from '../../../private/common/utils/get';
import HolidaysGridContainer from '../../../private/LN/services/holidays/HolidaysGridContainer';
import HolidaysNav from '../../../private/LN/services/holidays/HolidaysNav';

const HolidaysHomeCalendar = () => {
    const { globalContent = {} } = useAppContext();
    const serviceItem = get(globalContent, 'serviceItem', '');
    const calendars = get(globalContent, 'dataService.calendars', []);

    return calendars.length ? (
        <Static id="home-holidays-calendar" htmlOnly>
            <HolidaysNav layout="home" year={serviceItem} />
            <HolidaysGridContainer calendars={calendars} year={serviceItem} />
        </Static>
    ) : (
        <></>
    );
};

HolidaysHomeCalendar.label = 'LN Calendarios Home Feriados';

export default HolidaysHomeCalendar;
