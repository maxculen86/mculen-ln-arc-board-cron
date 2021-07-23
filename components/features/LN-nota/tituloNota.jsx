import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import withStatic from '../../private/common/hocs/withStatic';

import TituloNota from '../../private/LN/nota/apertura/titleAndIconArticle';

const tituloNota = props => <TituloNota {...props} />;

tituloNota.label = 'LN-Nota-Titulo';

tituloNota.propTypes = {
    customFields: PropTypes.shape({
        prefix: PropTypes.string.tag({
            label: 'Prefijo',
            defaultValue: ''
        })
    }).isRequired
};

tituloNota.lazy = ['default', 'amp'];

export default withStatic(Consumer(tituloNota));
