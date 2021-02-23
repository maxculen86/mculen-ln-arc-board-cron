import React from 'react';
import PropTypes from 'fusion:prop-types';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import CajaTemasPropiedades from '../private/LN/acumulado/cajaTemasPropiedades/index';

const CajaTemaPropiedades = props => {
    const validateFeature = idCollection => {
        let error;
        if (!idCollection)
            error = {
                type: 'warning',
                message: 'Se requiere el id de la colección de la caja de temas'
            };
        return error;
    };

    const {
        id: featureId,
        isAdmin,
        customFields: { idCollection, url, title },
        outputType
    } = props;

    const error = validateFeature(idCollection);

    if (isAdmin && !!error) {
        return (
            <div
                style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    width: '100%'
                }}
            >
                <PageBuilderMessage
                    key={featureId}
                    type={error.type}
                    message={error.message}
                />
            </div>
        );
    }

    return (
        <CajaTemasPropiedades
            title={title}
            url={url}
            outputType={outputType}
            size="6"
            idCollection={idCollection}
        />
    );
};

CajaTemaPropiedades.label = 'LN Acum Caja Tema Propiedades (no usar)';

CajaTemaPropiedades.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    outputType: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        idCollection: PropTypes.string.tag({
            label: 'ID de la collection',
            description: 'Ingrese aquí el ID de la collection',
            defaultValue: '',
            group: 'Custom Fields'
        }),
        url: PropTypes.string.tag({
            label: 'Url',
            description:
                'Ingrese la url que redirige al hacer click al titulo. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Custom Fields'
        }),
        title: PropTypes.string.tag({
            name: 'Título / Techo',
            description: 'Ingrese aquí el título de la caja de temas',
            defaultValue: '',
            group: 'Custom Fields'
        })
    }).isRequired
};

export default CajaTemaPropiedades;
