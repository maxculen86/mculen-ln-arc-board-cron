import React from 'react';
import Static from 'fusion:static';
import ModCriptoCarrousel from '../../private/common/mod-crypto-carrousel';

function CryptoCarrousel({ id: featureId }) {
    return featureId ? (
        <Static id={featureId}>
            <ModCriptoCarrousel />
        </Static>
    ) : null;
}

CryptoCarrousel.label = 'LN Acumulado Crypto Carrousel';

export default CryptoCarrousel;
