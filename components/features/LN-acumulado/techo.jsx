import React from 'react';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import ComTitle from '../../private/common/com-title';

const TechoFeatured = props => {
    const {
        customFields: { url, title },
        id: featureId
    } = props;

    if (!title) return <></>;

    return (
        <Static id={featureId}>
            <ComTitle tag="h2" size="--l" content={title} link={url} />
        </Static>
    );
};

TechoFeatured.label = 'LN-Acumulado-Techo-Grilla';

TechoFeatured.propTypes = {
    customFields: PropTypes.shape({
        url: PropTypes.string.tag({
            label: 'Url',
            description:
                'Ingrese la url que redirige al hacer click al titulo. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Custom Fields'
        }),
        title: PropTypes.string.tag({
            name: 'Título / Techo',
            description: 'Ingrese aquí el título separador',
            defaultValue: '',
            group: 'Custom Fields'
        })
    }).isRequired,
    id: PropTypes.string.isRequired
};

export default TechoFeatured;
