import React from 'react';
import Static from 'fusion:static';
import ModCripto from '../../private/common/mod-cripto';

function CajaCripto({ id: featureId }) {
    return featureId ? (
        <Static id={featureId}>
            <ModCripto />
        </Static>
    ) : null;
}

CajaCripto.label = 'LN Acumulado Caja Criptomonedas';

export default CajaCripto;
