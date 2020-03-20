import React from 'react';

import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import FocalFactory from '../private/LN/home/templatesContainers/focalFactory';
import CollectionsNotes from '../private/LN/home/collectionsNotes';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const validateChildren = (children, childProps) => {
    if (['array', 'object'].indexOf(typeof children) && !children.length)
        return {
            type: 'warning',
            message:
                'Se requiere el id de la colección de la apertura o features agregados manualmente'
        };

    childProps &&
        childProps.forEach(childProp => {
            if (
                childProp.collection !== 'features' ||
                childProp.type !== 'LN-home/noteFeature'
            )
                return {
                    type: 'warning',
                    message:
                        'El Chain Apertura sólo admite Features del tipo LN Home NoteCard'
                };
        });
    return null;
};

const Apertura = ({
    id: featureId,
    isAdmin,
    children,
    childProps,
    customFields: { idCollection, directionFocal }
}) => {
    const error = validateChildren(children, childProps);

    const notes =
        idCollection && idCollection !== ''
            ? CollectionsNotes(idCollection, 'apertura')
            : children;

    if (isAdmin && !!error) {
        return <PageBuilderMessage type={error.type} message={error.message} />;
    }
    if (notes)
        return (
            // <Static id={featureId}>
            <div className="row hlp-margintop-50">
                <div className="lay">
                    <FocalFactory directionFocal={directionFocal}>
                        {notes}
                    </FocalFactory>
                </div>
            </div>
            // </Static>
        );
};

Apertura.label = 'LN Home Apertura';

Apertura.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    childProps: PropTypes.arrayOf(PropTypes.node).isRequired,
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

export default Consumer(Apertura);
