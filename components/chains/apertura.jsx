import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';

const Apertura = props => {
    console.log(props);
    return <section>{props.children}</section>;
};

Apertura.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' })
    })
};

export default Consumer(Apertura);
