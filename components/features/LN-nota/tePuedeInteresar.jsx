import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';

import TePuedeInteresar from '../../private/LN/nota/tePuedeInteresar';

const tePuedeInteresar = props => {
    const {
        customFields: { cantidadNotas },
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
            defaultValue: 12,
            label: 'Cantidad de Notas'
        })
    }).isRequired
};

export default tePuedeInteresar;
