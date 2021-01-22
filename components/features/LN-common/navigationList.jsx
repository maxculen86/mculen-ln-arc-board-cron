import React from 'react';
import PropTypes from 'fusion:prop-types';
import NavigationList from '../../private/common/navigationList';

const NavigationListFeature = ({
    customFields,
    customFields: { title, hierarchy } = {}
}) =>
    (hierarchy && (
        <NavigationList
            title={title}
            hierarchy={hierarchy}
            extraClass="--tags"
        />
    )) ||
    null;

NavigationListFeature.propTypes = {
    customFields: PropTypes.shape({
        hierarchy: PropTypes.string.tag({
            group: 'Configuración',
            description:
                'Obligatorio. Id de navegación obtenido desde "Site Service".',
            label: 'Id de Navegación'
        }).isRequired,
        title: PropTypes.string.tag({
            group: 'Configuración',
            description: 'Opcional. Título del listado de links.',
            label: 'Título'
        })
    })
};

NavigationListFeature.label = 'LN Common Navigation List';

export default NavigationListFeature;
