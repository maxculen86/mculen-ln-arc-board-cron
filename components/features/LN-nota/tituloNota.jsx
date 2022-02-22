import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import StaticValidation from '../../private/common/staticValidation';
import TituloNota from '../../private/LN/nota/apertura/titleAndIconArticle';

const tituloNota = props => {
    const { id: featureId = 'StaticTitle' } = props;
    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            <TituloNota {...props} />
        </StaticValidation>
    );
};

tituloNota.label = 'LN-Nota-Titulo';

tituloNota.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        prefix: PropTypes.string.tag({
            label: 'Prefijo',
            defaultValue: ''
        })
    }).isRequired
};

export default Consumer(tituloNota);
