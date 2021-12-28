import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModPromo from '../../../private/common/mod-promo';

const CajaPromo = ({ customFields }) => {
    const { text, link, logoName } = customFields;
    return <ModPromo text={text} link={link} logoName={logoName} />;
};

const groupCustomFields = 'Custom Fields';
CajaPromo.label = 'LN Caja Promo';

CajaPromo.propTypes = {
    customFields: PropTypes.shape({
        text: PropTypes.string.tag({
            name: 'Texto',
            description: 'Ingrese aquí el texto de la caja',
            default: '',
            group: groupCustomFields
        }),
        link: PropTypes.string.tag({
            name: 'URL',
            description: 'Ingrese aquí la url de la caja promo',
            default: '',
            group: groupCustomFields
        }),
        logoName: PropTypes.string.tag({
            name: 'Logo',
            description: 'Ingrese aquí el nombre del logo',
            default: '',
            group: groupCustomFields
        })
    }).isRequired
};

export default CajaPromo;
