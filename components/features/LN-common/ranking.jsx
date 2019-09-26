import React from 'react';
import PropTypes from 'fusion:prop-types';
import Ranking from '../../private/LN/common/ranking';

const ranking = ({ customFields: { cantidadNotas, dataSection } }) => {
    return <Ranking dataSection={dataSection} size={cantidadNotas} />;
};

ranking.label = 'LN-Common-Ranking';
ranking.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' }),
        dataSection: PropTypes.string.tag({ label: 'Sección (data-section)' })
    }).isRequired
};

export default ranking;
