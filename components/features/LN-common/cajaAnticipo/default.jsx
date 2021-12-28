import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComAdvance from '../../../private/common/com-advance';

const CajaAnticipo = ({ customFields: { hide, title, link } }) => {
    return !hide && title ? (
        <ComAdvance title={title} link={link} size="--md" />
    ) : (
        <></>
    );
};

const groupCustomFields = 'Custom Fields';
CajaAnticipo.label = 'LN Caja Anticipo';

CajaAnticipo.propTypes = {
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({
            name: 'Título',
            description: 'Ingrese aquí el título del anticipo',
            default: '',
            group: groupCustomFields
        }),
        link: PropTypes.string.tag({
            name: 'URL',
            description: 'Ingrese aquí la url del anticipo',
            default: '',
            group: groupCustomFields
        }),
        hide: PropTypes.bool.tag({
            name: 'Ocultar',
            description: 'Definí la visibilidad del anticipo',
            default: true,
            group: groupCustomFields
        })
    })
};

CajaAnticipo.defaultProps = {
    customFields: {
        title: '',
        link: '',
        hide: true
    }
};

export default CajaAnticipo;
