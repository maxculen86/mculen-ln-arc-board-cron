import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';

import FirmaExterno from '../../private/LN/nota/firma';

const FirmaLogoExterno = ({ globalContent: { distributor } }) => {
    const { name: distributorName } = distributor || {};
    return <FirmaExterno distributorName={distributorName} />;
};

FirmaLogoExterno.propTypes = {
    globalContent: PropTypes.shape({
        distributor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

FirmaLogoExterno.label = 'LN-Nota-FirmaLogoExterno';

export default Context(FirmaLogoExterno);
