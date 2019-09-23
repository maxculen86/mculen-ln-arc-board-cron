import React from 'react';
import PropTypes from 'fusion:prop-types';
import Ranking from '../../private/LN/common/ranking';

const ranking = ({ customFields: { cantidadNotas, titulo } }) => {
    return <Ranking size={cantidadNotas} title={titulo} />;
};

ranking.label = 'LN-Common-Ranking';
ranking.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' }),
        titulo: PropTypes.string
    }).isRequired
};

export default ranking;
