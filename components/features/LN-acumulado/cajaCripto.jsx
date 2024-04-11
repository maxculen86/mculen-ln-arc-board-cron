import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModCripto from '../../private/common/mod-cripto';
import Static from 'fusion:static';

const CajaCripto = ({ id: featureId }) => {
    return featureId ? (
        <Static id={featureId}>
            <ModCripto />
        </Static>
    ) : null;
};

CajaCripto.label = 'LN Acumulado Caja Criptomonedas';

CajaCripto.propTypes = {
    id: PropTypes.string.isRequired
};

export default CajaCripto;
