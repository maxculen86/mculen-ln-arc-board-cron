import React from 'react';

import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import FocalFactory from '../private/LN/home/templatesContainers/focalFactory';
import CollectionsNotes from '../private/LN/home/collectionsNotes';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const validate = (children, childProps, idCollection, directionFocal) => {
    let error;
    if (
        ['array', 'object'].indexOf(typeof children) &&
        !children.length &&
        !idCollection
    )
        error = {
            type: 'warning',
            message:
                'Se requiere el id de la colección de la apertura o features agregados manualmente'
        };

    childProps &&
        childProps.forEach(childProp => {
            if (
                childProp.collection !== 'features' ||
                childProp.type !== 'LN-common/articulo'
            )
                error = {
                    type: 'warning',
                    message:
                        'El Chain Apertura sólo admite Features del tipo LN Artículo'
                };
        });

    if (!directionFocal)
        error = {
            type: 'warning',
            message: 'Seleccione la dirección focal de la apertura'
        };
    return error;
};

const getMissingNotes = (childProps, notes) => {
    let missingNotes = notes ? 6 - notes.length : 6;
    childProps.forEach(childProp => {
        if (
            !childProp.customFields.noteId &&
            childProp.type === 'LN-common/articulo'
        ) {
            missingNotes += 1;
        }
    });
    return missingNotes;
};

const Apertura = ({
    id: featureId,
    isAdmin,
    children,
    childProps,
    customFields: { idCollection, directionFocal }
}) => {
    const error = validate(children, childProps, idCollection, directionFocal);

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

    const notes = idCollection
        ? CollectionsNotes(idCollection, 'apertura')
        : children;

    const missingNotes = getMissingNotes(childProps, notes);

    if (isAdmin && notes && missingNotes) {
        for (let i = 0; i <= missingNotes; i += 1) {
            notes.push(
                <div
                    style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        width: '100%'
                    }}
                >
                    <PageBuilderMessage
                        key={`${featureId}${i}`}
                        type="warning"
                        message={`Falta cargar ${missingNotes} nota${
                            missingNotes > 1 ? 's' : ''
                        }`}
                    />
                </div>
            );
        }
    }

    // el 6 esta hardcode para simbolizar que hay iría en un futuro el limite de notas de la apertura
    const elements = notes && 6 ? notes.slice(0, 6) : null;

    if (
        (isAdmin && elements && elements.length >= 6 && !error) ||
        (!isAdmin && !missingNotes)
    )
        return (
            // <Static id={featureId}>
            <div className="row hlp-margintop-50">
                <div className="lay">
                    <FocalFactory directionFocal={directionFocal}>
                        {elements}
                    </FocalFactory>
                </div>
            </div>
            // </Static>
        );

    return <></>;
};

Apertura.label = 'LN Home Apertura';

Apertura.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    childProps: PropTypes.arrayOf(PropTypes.object).isRequired,
    customFields: PropTypes.shape({
        idCollection: PropTypes.string.tag({
            label: 'ID de la collection',
            description: 'Ingrese aquí el ID de la collection',
            defaultValue: '',
            group: 'Custom Fields'
        }),
        directionFocal: PropTypes.oneOf(['FocalDerecho', 'FocalIzquierdo']).tag(
            {
                label: {
                    FocalDerecho: 'Focal Derecho',
                    FocalIzquierdo: 'Focal Izquierdo'
                },
                description: 'Seleccione aquí el tipo de focal',
                defaultValue: 'FocalIzquierdo',
                group: 'Custom Fields'
            }
        )
    }).isRequired
};

// export default Consumer(Apertura);
