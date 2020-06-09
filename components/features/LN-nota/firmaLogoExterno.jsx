import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';

import FirmaExterno from '../../private/LN/nota/firmaExterno';

const FirmaLogoExterno = ({ globalContent: { distributor } }) => {
    const { name: distributorName } = distributor || {};
    return <FirmaExterno distributorName={distributorName} />;
};

FirmaLogoExterno.propTypes = {
    globalContent: PropTypes.shape({
        distributor: PropTypes.shape({
            name: PropTypes.string,
            category: PropTypes.string
        })
    })
};

FirmaLogoExterno.label = 'LN-Nota-FirmaLogoExterno';

export default Context(FirmaLogoExterno);
