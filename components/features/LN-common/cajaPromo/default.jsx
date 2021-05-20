import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModPromo from '../../../private/common/mod-promo';

const CajaPromo = ({ customFields }) => {
    const { text, link, logoName } = customFields;
    return <ModPromo text={text} link={link} logoName={logoName} />;
};

CajaPromo.label = 'LN Caja Promo';

CajaPromo.propTypes = {
    customFields: PropTypes.shape({
        text: PropTypes.string.tag({
            name: 'Texto',
            description: 'Ingrese aquí el texto de la caja',
            default: '',
            group: 'Custom Fields'
        }),
        link: PropTypes.string.tag({
            name: 'URL',
            description: 'Ingrese aquí la url de la caja promo',
            default: '',
            group: 'Custom Fields'
        }),
        logoName: PropTypes.string.tag({
            name: 'Logo',
            description: 'Ingrese aquí el nombre del logo',
            default: '',
            group: 'Custom Fields'
        })
    }).isRequired
};

export default CajaPromo;
