import React from 'react';
import PropTypes from 'fusion:prop-types';

const index = props => {
    return <h2>Cambiar a OutputType JSON para visualizar el contenido</h2>;
};

const requestConfigProps = (index, defaultDays, defaultWeeks) => {
    return {
        [`size${index}`]: PropTypes.number.tag({
            group: `Configuración consulta ${index}`,
            defaultValue: 3,
            description: 'Cantidad de notas a listar',
            label: 'Cantidad de Notas'
        }),
        [`daysAgo${index}`]: PropTypes.number.tag({
            group: `Configuración consulta ${index}`,
            defaultValue: defaultDays,
            description: 'Número de días atrás en relación a hoy',
            label: 'Días'
        }),
        [`weeksAgo${index}`]: PropTypes.number.tag({
            group: `Configuración consulta ${index}`,
            defaultValue: defaultWeeks,
            description: 'Número de semanas de antiguedad de las publicaciones',
            label: 'Semanas de publicación'
        })
    };
};

index.label = 'LN-Api-Ranking';

index.propTypes = {
    customFields: PropTypes.shape({
        ...requestConfigProps(1, 1, 1),
        ...requestConfigProps(2, 5, 2)
    }).isRequired
};

export default index;
