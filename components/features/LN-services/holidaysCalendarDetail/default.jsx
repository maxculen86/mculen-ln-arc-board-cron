import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../../private/common/staticValidation';
import get from '../../../private/common/utils/get';
import HolidaysMonthNav from '../../../private/LN/services/holidays/HolidaysMonthNav';
import HolidaysNav from '../../../private/LN/services/holidays/HolidaysNav';

const HolidaysCalendarDetail = ({ id: _featureId }) => {
    const { globalContent = {} } = useAppContext();
    const serviceItem = get(globalContent, 'serviceItem', '');
    const { previousAndNextCalendar = {}, calendar = {} } = get(
        globalContent,
        'dataService',
        {}
    );
    if (!Object.keys(calendar).length) return null;

    return (
        <StaticValidation id={_featureId} htmlOnly persistent>
            <HolidaysNav year={serviceItem} layout="month" />
            <HolidaysMonthNav
                calendar={calendar}
                previousAndNextCalendar={previousAndNextCalendar}
                year={serviceItem}
            />
        </StaticValidation>
    );
};

HolidaysCalendarDetail.label = 'LN Calendario Detalle';

HolidaysCalendarDetail.propTypes = { id: PropTypes.string.isRequired };

export default HolidaysCalendarDetail;
