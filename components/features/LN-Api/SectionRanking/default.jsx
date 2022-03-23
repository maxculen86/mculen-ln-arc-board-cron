import React from 'react';
import PropTypes from 'fusion:prop-types';

const index = props => {
    return <h2>Cambiar a OutputType JSON para visualizar el contenido</h2>;
};

const requestConfigProps = index => {
    return {
        [`size${index}`]: PropTypes.number.tag({
            group: `Configuración consulta ${index}`,
            defaultValue: 3,
            description: 'Cantidad de notas a listar',
            label: 'Cantidad de Notas'
        })
    };
};

index.label = 'LN-Api-Ranking';

index.propTypes = {
    customFields: PropTypes.shape({
        ...requestConfigProps(1)
    }).isRequired
};

export default index;
