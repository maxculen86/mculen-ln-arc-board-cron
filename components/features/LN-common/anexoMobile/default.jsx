import React from 'react';
import PropTypes from 'fusion:prop-types';

const AnexoFeature = () => {
    return <></>;
};

AnexoFeature.label = 'LN Anexo Mobile';

AnexoFeature.propTypes = {
    customFields: PropTypes.shape({
        url: PropTypes.url.tag({
            label: 'Url',
            group: 'Ajuste por URL',
            description: 'Ingrese aquí la URL del anexo',
            defaultValue: ''
        }),
        hideByUrl: PropTypes.bool.tag({
            label: 'Ocultar',
            group: 'Ajuste por URL',
            description: 'Marque para ocultar el anexo',
            defaultValue: false
        }),
        height: PropTypes.number.tag({
            label: 'Alto',
            group: 'Ajuste por URL',
            description: 'Ingrese aquí el alto fijo del anexo',
            defaultValue: 0
        })
    })
};

AnexoFeature.defaultProps = {
    customFields: {
        url: '',
        hideByUrl: false,
        html: '',
        height: 0,
        hideByHtml: false
    }
};

export default AnexoFeature;
