import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import MasNotas from '../../private/LN/nota/masNotas';

MasNotas.label = 'LN-Nota-masNotas';

MasNotas.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number
    })
};

export default Consumer(MasNotas);
