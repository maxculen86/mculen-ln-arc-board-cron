import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComPartner from '../../../common/com-partner';

const Firma = ({ distributorName }) => {
    if (
        distributorName === 'The New York Times' ||
        distributorName === 'EL PAIS' ||
        distributorName === 'Ovrik' ||
        distributorName === 'The Wall Street Journal'
    )
        return <ComPartner size="xs">{distributorName}</ComPartner>;

    return null;
};

Firma.propTypes = {
    distributorName: PropTypes.string.isRequired
};

export default Firma;
