import React from 'react';
import PropTypes from 'fusion:prop-types';
import Ranking from '../../private/LN/common/ranking';

const ranking = ({ customFields: { cantidadNotas, titulo } }) => {
    return <Ranking size={cantidadNotas} />;
};

ranking.label = 'LN-Common-Ranking';
ranking.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' })
    }).isRequired
};

export default ranking;
