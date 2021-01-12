import React from 'react';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import ModheaderSection from '../../private/common/mod-headerSection';

const TechoFeatured = props => {
    const {
        customFields: { url, title, color, imageId },
        id: featureId,
        outputType
    } = props;

    if (!title && !imageId) return <></>;

    return (
        <Static id={featureId}>
            <ModheaderSection
                title={title}
                link={url}
                size="--l"
                classCondition={color !== 'default' && `--bg ${color}`}
                imageId={imageId}
                outputType={outputType}
                line={color !== 'default' ? false : true}
            />
        </Static>
    );
};

TechoFeatured.label = 'LN-Common-Techo-Grilla';

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
        }),
        imageId: PropTypes.string.tag({
            name: 'Foto / Logo',
            description: 'Ingrese aquí el id de Photo Center de la imagen',
            defaultValue: '',
            group: 'Custom Fields'
        }),
        color: PropTypes.oneOf([
            'default',
            '--pink',
            '--blue',
            '--red',
            '--teal'
        ]).tag({
            defaultValue: 'default',
            description: 'Cambiar color de fondo',
            group: 'Custom Fields',
            labels: {
                default: 'Sin Color',
                '--pink': 'Rosa',
                '--blue': 'Azul',
                '--red': 'Rojo',
                '--teal': 'Turqueza'
            }
        })
    }).isRequired,
    id: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired
};

export default TechoFeatured;
