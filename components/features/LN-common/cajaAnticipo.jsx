import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComAdvance from '../../private/common/com-advance';

const CajaAnticipo = ({ customFields: { hide, title, url } }) => {
    return !hide && title ? <ComAdvance title={title} /> : <></>;
};

CajaAnticipo.label = 'LN Caja Anticipo';

CajaAnticipo.propTypes = {
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({
            name: 'Título',
            description: 'Ingrese aquí el título del anticipo',
            default: '',
            group: 'Custom Fields'
        }),
        url: PropTypes.string.tag({
            name: 'URL',
            description: 'Ingrese aquí la url del anticipo',
            default: '',
            group: 'Custom Fields'
        }),
        hide: PropTypes.bool.tag({
            name: 'Ocultar',
            description: 'Definí la visibilidad del anticipo',
            default: true,
            group: 'Custom Fields'
        })
    })
};

export default CajaAnticipo;
