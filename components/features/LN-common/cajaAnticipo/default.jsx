import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComAdvance from '../../../private/common/com-advance';
import { groupCustomFields } from '../../../private/common/utils/propTypesHelper';
import StaticContent from '../../../private/common/staticContent';

const CajaAnticipo = ({
    customFields: { hide, title, link, hideBadge } = {}
}) => {
    return !hide && title ? (
        <StaticContent>
            <ComAdvance
                title={title}
                link={link}
                size="--md"
                withBadgeLiveblog={hideBadge}
            />
        </StaticContent>
    ) : (
        <></>
    );
};

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
        }),
        hideBadge: PropTypes.bool.tag({
            name: 'Mostrar chapita',
            description: 'Definí la visibilidad de la chapita anticipo',
            default: false,
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
