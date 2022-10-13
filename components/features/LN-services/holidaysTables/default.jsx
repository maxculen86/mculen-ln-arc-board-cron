import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../../private/common/staticValidation';
import get from '../../../private/common/utils/get';
import Table from '../../../private/LN/nota/cuerpo/table';

const HolidaysTables = ({ id: _featureId, customFields = {} }) => {
    const { holidayType } = customFields;

    const holidays = get(
        useAppContext(),
        'globalContent.dataService.holidays',
        []
    );
    console.log('🚀 ~ file: default.jsx ~ line 41 ~ holidayType', holidayType);
    const monthHolidays = get(holidays, 'holiday_month_contents', []);
    if (!Object.keys(holidays).length) return null;
    return (
        <StaticValidation id={_featureId} htmlOnly persistent>
            <h1>HOLAAAAA</h1>
            {/* {monthHolidays.map(data => (
                <Table />
            ))} */}
        </StaticValidation>
    );
};
HolidaysTables.label = 'LN Tablas Feriados';
HolidaysTables.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        holidayType: PropTypes.oneOf([
            'Inamovible',
            'Trasladable',
            'Puente',
            'Judio'
        ]).tag({
            label: 'Tipo de feriado',
            defaultValue: 'Inamovible'
        })
    }).isRequired
};

export default HolidaysTables;
