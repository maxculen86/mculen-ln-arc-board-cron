import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModCripto from '../../private/common/mod-cripto';
import StaticContent from '../../private/common/staticContent';

const CajaCripto = ({ id: featureId }) => {
    return featureId ? (
        <StaticContent id={featureId}>
            <ModCripto />
        </StaticContent>
    ) : null;
};

CajaCripto.label = 'LN Acumulado Caja Criptomonedas';

CajaCripto.propTypes = {
    id: PropTypes.string.isRequired
};

export default CajaCripto;
