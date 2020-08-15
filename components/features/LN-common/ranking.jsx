import React from 'react';
import PropTypes from 'fusion:prop-types';
import withStatic from '../../private/common/hocs/withStatic';

import Ranking from '../../private/LN/common/ranking';

const ranking = ({ outputType, customFields: { cantidadNotas } }) => {
    return outputType !== 'amp' && <Ranking />;
};

ranking.label = 'LN-Common-Ranking';
ranking.propTypes = {
    outputType: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' })
    }).isRequired
};

export default withStatic(ranking);
