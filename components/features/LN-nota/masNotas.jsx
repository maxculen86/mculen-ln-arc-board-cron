import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import MasNotas from '../../private/LN/nota/masNotas';

MasNotas.label = 'LN-Nota-masNotas';

// TODO: ree diseñar el filter para que sea un Enum

MasNotas.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number,
        filter: PropTypes.oneOf(['Ultimas Noticias', 'Sección']).tag({
            label: 'Filtrar Por'
        })
    })
};

/* MasNotas.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number,
        filter: PropTypes.oneOf(['', 'Ultimas Noticias', 'Sección']).tag({
            label: 'Filtrar Por'
        }).isRequired
    })
}; */

/* MasNotas.defaultProps = {
    customFields: {
        filter: ''
    }
}; */

export default Consumer(MasNotas);
