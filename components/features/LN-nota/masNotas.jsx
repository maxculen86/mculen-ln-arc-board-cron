import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import MasNotas from '../../private/LN/nota/masNotas';

const masNotas = props => {
    const {
        outputType,
        customFields: { cantidadNotas },
        id: featureId
    } = props;
    return outputType === 'amp' ? (
        <Static id={featureId}>
            <MasNotas {...props} cantidadNotas={cantidadNotas} />
        </Static>
    ) : (
        <MasNotas {...props} cantidadNotas={cantidadNotas} />
    );
};

masNotas.label = 'LN-Nota-masNotas';

masNotas.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' }),
        filter: PropTypes.oneOf(Object.keys(MasNotas.filterTypes)).tag({
            labels: MasNotas.filterTypes,
            label: 'Filtrar por',
            defaultValue: Object.keys(MasNotas.filterTypes)[0]
        })
    }).isRequired
};

export default Consumer(masNotas);
