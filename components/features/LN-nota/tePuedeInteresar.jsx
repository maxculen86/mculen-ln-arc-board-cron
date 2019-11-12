import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import TePuedeInteresar from '../../private/LN/nota/tePuedeInteresar';

TePuedeInteresar.label = 'LN-Nota-tePuedeInteresar';

TePuedeInteresar.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' })
    })
};

export default Consumer(TePuedeInteresar);
