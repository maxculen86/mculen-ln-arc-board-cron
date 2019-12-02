import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import MasNotas from '../../private/LN/nota/masNotas';

const masNotas = props => {
    return (
        <Static id="apertura-receta">
            <MasNotas {...props} />
        </Static>
    );
};

masNotas.label = 'LN-Nota-masNotas';

masNotas.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' }),
        filter: PropTypes.oneOf(Object.keys(MasNotas.filterTypes)).tag({
            labels: MasNotas.filterTypes,
            label: 'Filtrar por',
            defaultValue: Object.keys(MasNotas.filterTypes)[0]
        })
    })
};

export default Consumer(masNotas);
