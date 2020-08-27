import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import Ranking from '../../private/LN/common/ranking';

const ranking = props => {
    const { outputType } = props;
    return (
        outputType !== 'amp' && (
            <Static id="ranking">
                <Ranking {...props} />
            </Static>
        )
    );
};

ranking.label = 'LN-Common-Ranking';
ranking.propTypes = {
    outputType: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' })
    }).isRequired
};

export default Consumer(ranking);
