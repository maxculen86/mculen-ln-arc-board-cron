import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../../private/common/staticValidation';
import get from '../../../private/common/utils/get';
import HolidaysGridContainer from '../../../private/LN/services/holidays/HolidaysGridContainer';
import HolidaysNav from '../../../private/LN/services/holidays/HolidaysNav';

const HolidaysHomeCalendar = ({ id: _featureId }) => {
    const calendars = get(
        useAppContext(),
        'globalContent.dataService.calendars',
        []
    );
    const serviceItem = get(useAppContext(), 'globalContent.serviceItem', '');

    if (!Object.keys(calendars).length) return null;

    return (
        <StaticValidation id={_featureId} htmlOnly persistent>
            <HolidaysNav layout="home" year={serviceItem} />
            <HolidaysGridContainer calendars={calendars} year={serviceItem} />
        </StaticValidation>
    );
};

HolidaysHomeCalendar.label = 'LN Calendarios Home Feriados';

HolidaysHomeCalendar.propTypes = { id: PropTypes.string.isRequired };

export default HolidaysHomeCalendar;
