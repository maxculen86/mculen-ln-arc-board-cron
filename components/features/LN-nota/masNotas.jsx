import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import MasNotas from '../../private/LN/nota/masNotas';

MasNotas.label = 'LN-Nota-masNotas';

MasNotas.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number,
        //filtrar: PropTypes.oneOf(['Ultimas Noticias', 'Sección'])
        filtrar: PropTypes.shape(
            PropTypes.arrayOf([
                PropTypes.shape({
                    id: PropTypes.number,
                    text: PropTypes.string
                })
            ])
        )
    })
};

MasNotas.defaultProps = {
    customFields: {
        filtrar: [
            { id: 0, text: 'Ultimas Noticias' },
            { id: 1, text: 'Seccion' }
        ]
    }
};

export default Consumer(MasNotas);
