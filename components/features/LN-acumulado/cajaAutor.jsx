import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import CajaAutor from '../../private/LN/acumulado/author/cajaAuthor';

CajaAutor.label = 'LN-Acumulado-Columnistas';

CajaAutor.propTypes = {
    customFields: PropTypes.shape({
        author: PropTypes.string.tag({
            label: 'Ingrese el autor'
        })
    })
};

export default Consumer(CajaAutor);
