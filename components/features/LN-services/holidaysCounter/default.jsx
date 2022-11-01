import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../../private/common/staticValidation';
import HolidaysCounter from '../../../private/LN/services/holidays/HolidaysCounter';

const HolidaysCountdown = ({ id: _featureId }) => {
    return (
        <StaticValidation id={_featureId} htmlOnly persistent>
            <HolidaysCounter
                nextHoliday={25}
                month={'Diciembre'}
                remainingDays={20}
                description={'Navidad'}
                typeHoliday={'inamovibles'}
            />
        </StaticValidation>
    );
};

HolidaysCountdown.label = 'LN Feriados Contador';

HolidaysCountdown.propTypes = { id: PropTypes.string.isRequired };

export default HolidaysCountdown;
