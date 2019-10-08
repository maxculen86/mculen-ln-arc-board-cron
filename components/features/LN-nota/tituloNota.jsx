import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import TituloNota from '../../private/LN/nota/apertura/titleAndIconArticle';

TituloNota.label = 'LN-Nota-Titulo';

TituloNota.propTypes = {
    customFields: PropTypes.shape({
        prefix: PropTypes.string.tag({
            label: 'Prefijo',
            defaultValue: ''
        })
    })
};

export default Consumer(TituloNota);
