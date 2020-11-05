import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';

import TePuedeInteresar from '../../private/LN/nota/tePuedeInteresar';

const tePuedeInteresar = props => {
    const {
        customFields: { cantidadNotas = 6 },
        id
    } = props;
    return (
        <Static id={id}>
            <TePuedeInteresar cantidadNotas={cantidadNotas} />
        </Static>
    );
};

tePuedeInteresar.label = 'LN-Nota-tePuedeInteresar';

tePuedeInteresar.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({
            defaultValue: 6,
            min: 3,
            label: 'Cantidad de Notas'
        }).isRequired
    }).isRequired
};

export default tePuedeInteresar;
