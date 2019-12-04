import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import TePuedeInteresar from '../../private/LN/nota/tePuedeInteresar';

const tePuedeInteresar = props => {
    return <TePuedeInteresar {...props} />;
};

tePuedeInteresar.label = 'LN-Nota-tePuedeInteresar';

tePuedeInteresar.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' })
    })
};

export default Consumer(tePuedeInteresar);
