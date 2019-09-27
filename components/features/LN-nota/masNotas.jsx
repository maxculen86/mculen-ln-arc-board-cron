import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import MasNotas from '../../private/LN/nota/masNotas';

MasNotas.label = 'LN-Nota-masNotas';

// TODO: ree diseñar el filter para que sea un Enum

MasNotas.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' }),
        filter: PropTypes.oneOf(Object.keys(MasNotas.filterTypes)).tag({
            labels: MasNotas.filterTypes,
            label: 'Filtrar por',
            defaultValue: Object.keys(MasNotas.filterTypes)[0]
        })
    })
};

export default Consumer(MasNotas);
