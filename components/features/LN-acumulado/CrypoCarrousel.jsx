import React from 'react';
import PropTypes from 'fusion:prop-types';
import StaticContent from '../../private/common/staticContent';
import ModCriptoCarrousel from '../../private/common/mod-crypto-carrousel';

const CryptoCarrousel = ({ id: featureId }) => {
    return featureId ? (
        <StaticContent id={featureId}>
            <ModCriptoCarrousel />
        </StaticContent>
    ) : null;
};

CryptoCarrousel.label = 'LN Acumulado Crypto Carrousel';

CryptoCarrousel.propTypes = {
    id: PropTypes.string.isRequired
};

export default CryptoCarrousel;
