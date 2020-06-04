import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComPartner from '../../../common/com-partner';

const Firma = props => {
    const {
        distributor: { name: distributorName }
    } = props;

    if (
        distributorName === 'The New York Times' ||
        distributorName === 'EL PAIS' ||
        distributorName === 'Obrik' ||
        distributorName === 'The Wall Street Journal'
    )
        return <ComPartner size="xs">{distributorName}</ComPartner>;

    return null;
};

Firma.propTypes = {
    distributor: PropTypes.shape({
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired
    }).isRequired
};

export default Firma;
