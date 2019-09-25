import React from 'react';
import PropTypes from 'fusion:prop-types';

import GrillaNotas from '../../private/LN/acumulado/grillaNotas';

function GrillaNotasFeature({ customFields: { cantidadNotas } }) {
    return <GrillaNotas size={cantidadNotas} />;
}

GrillaNotasFeature.label = 'LN-Acumulado-Grilla-Notas';
GrillaNotasFeature.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' })
    }).isRequired
};

export default GrillaNotasFeature;
