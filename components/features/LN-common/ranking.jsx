import React from 'react';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';

import Ranking from '../../private/LN/common/ranking';

const ranking = ({ customFields: { cantidadNotas, dataSection } }) => {
    return (
        <Static id="ranking">
            <Ranking dataSection={dataSection} size={cantidadNotas} />
        </Static>
    );
};

ranking.label = 'LN-Common-Ranking';
ranking.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' }),
        dataSection: PropTypes.string.tag({ label: 'Sección (data-section)' })
    }).isRequired
};

export default ranking;
