/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import Ranking from '../../private/LN/common/ranking';

const ranking = props => {
    const { id: featureId, outputType } = props;
    return (
        outputType !== 'amp' && (
            <Static id={featureId}>
                <Ranking {...props} />
            </Static>
        )
    );
};

const requestConfigProps = (index, defaultDays, defaultWeeks) => {
    return {
        [`size${index}`]: PropTypes.number.tag({
            group: `Configuración consulta ${index}`,
            defaultValue: 3,
            description: 'Cantidad de notas a listar',
            label: 'Cantidad de Notas'
        }),
        [`daysAgo${index}`]: PropTypes.oneOf([1, 2, 3, 4, 5]).tag({
            group: `Configuración consulta ${index}`,
            defaultValue: defaultDays,
            description: 'Número de días atrás en relación a hoy',
            label: 'Días'
        })
    };
};

ranking.label = 'LN-Common-Ranking';

ranking.propTypes = {
    outputType: PropTypes.string,
    customFields: PropTypes.shape({
        ...requestConfigProps(1, 1, 1),
        ...requestConfigProps(2, 5, 2)
    }).isRequired
};

export default Consumer(ranking);
