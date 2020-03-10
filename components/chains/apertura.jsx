import React from 'react';
import PropTypes from 'fusion:prop-types';
import FocalFactory from '../private/LN/home/templatesContainers/focalFactory';
import CollectionsNotes from '../private/LN/home/collectionsNotes';

// TODO: Extraer las funciones validateChildren y validateFeatures en otro archivo (definir en qué carpetas se guardarán para luego ser importadas acá)
const validateChildren = children => {
    if (['array', 'object'].indexOf(typeof children) && !children.length)
        throw Error(
            'En este caso por no tener id Definido o Features agregados'
        );
};

const validateFeatures = childProps => {
    childProps.forEach(childProp => {
        if (
            !(
                childProp.collection === 'features' &&
                childProp.type === 'LN-home/noteFeature'
            )
        )
            throw Error(
                'El Chain Apertura sólo admite Features del tipo LN Home NoteCard'
            );
    });
};

const isValidChildren = (childProps, children) => {
    validateChildren(children);
    validateFeatures(childProps);
    return true;
};

const Apertura = props => {
    const {
        children,
        childProps,
        customFields: { idCollection, directionFocal }
    } = props;

    isValidChildren(childProps, children);

    const notes =
        idCollection && idCollection !== ''
            ? CollectionsNotes(idCollection)
            : children;

    return (
        <div className="row hlp-margintop-50">
            <div className="lay">
                <FocalFactory directionFocal={directionFocal}>
                    {notes}
                </FocalFactory>
            </div>
        </div>
    );
};

Apertura.label = 'LN Home Apertura';

Apertura.propTypes = {
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

export default Apertura;
