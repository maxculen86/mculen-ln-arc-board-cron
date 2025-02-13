import React from 'react';
import PropTypes from 'fusion:prop-types';

function index() {
    return <h2>Cambiar a OutputType JSON para visualizar el contenido</h2>;
}

const requestConfigProps = propIndex => ({
    [`size${propIndex}`]: PropTypes.number.tag({
        group: `Configuración consulta ${propIndex}`,
        defaultValue: 3,
        description: 'Cantidad de notas a listar',
        label: 'Cantidad de Notas'
    })
});

index.label = 'LN-Api-Ranking';

index.propTypes = {
    customFields: PropTypes.shape({
        ...requestConfigProps(1)
    }).isRequired
};

export default index;
