import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModCriptoCarrousel from '../../private/common/mod-crypto-carrousel';
import Static from 'fusion:static';

const CryptoCarrousel = ({ id: featureId }) => {
    return featureId ? (
        <Static id={featureId}>
            <ModCriptoCarrousel />
        </Static>
    ) : null;
};

CryptoCarrousel.label = 'LN Acumulado Crypto Carrousel';

CryptoCarrousel.propTypes = {
    id: PropTypes.string.isRequired
};

export default CryptoCarrousel;
