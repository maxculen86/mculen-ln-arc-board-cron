import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import TituloNota from '../../private/LN/nota/apertura/titleAndIconArticle';
import StaticContent from '../../private/common/staticContent';

// TODO fix props y hacer unit test

const tituloNota = props => {
    return (
        <StaticContent>
            <TituloNota {...props} />
        </StaticContent>
    );
};

tituloNota.label = 'LN-Nota-Titulo';

tituloNota.propTypes = {
    customFields: PropTypes.shape({
        prefix: PropTypes.string.tag({
            label: 'Prefijo',
            defaultValue: ''
        })
    }).isRequired
};

export default Consumer(tituloNota);
