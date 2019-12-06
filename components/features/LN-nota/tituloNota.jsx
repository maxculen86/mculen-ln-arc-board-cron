import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import TituloNota from '../../private/LN/nota/apertura/titleAndIconArticle';

const tituloNota = props => {
    return (
        <Static id="apertura-receta">
            <TituloNota {...props} />
        </Static>
    );
};

tituloNota.label = 'LN-Nota-Titulo';

tituloNota.propTypes = {
    customFields: PropTypes.shape({
        prefix: PropTypes.string.tag({
            label: 'Prefijo',
            defaultValue: ''
        })
    })
};

export default Consumer(tituloNota);
