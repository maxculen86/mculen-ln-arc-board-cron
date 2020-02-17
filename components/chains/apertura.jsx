import React from 'react';
import PropTypes from 'fusion:prop-types';
import FocalFactory from '../private/LN/home/templatesContainers/focalFactory';
import CollectionsNotes from '../private/LN/home/collectionsNotes';

const hasChildren = children =>
    ['array', 'object'].indexOf(typeof children) && children.length > 0;

const Apertura = props => {
    const {
        children,
        customFields: { idCollection, directionFocal }
    } = props;

    if (idCollection && idCollection !== '') {
        const Notes = CollectionsNotes(idCollection);
        return (
            <div className="row hlp-margintop-50">
                <div className="lay">
                    <FocalFactory directionFocal={directionFocal}>
                        {Notes}
                    </FocalFactory>
                </div>
            </div>
        );
    }

    if (!hasChildren(children))
        throw new Error(
            'Texto de error que solo sale en PageBuilder. En este caso por no tener id Definido o Features agregados'
        );

    return (
        hasChildren(children) && (
            <div className="row hlp-margintop-50">
                <div className="lay">
                    <FocalFactory directionFocal={directionFocal}>
                        {children}
                    </FocalFactory>
                </div>
            </div>
        )
    );
};

Apertura.label = 'LN Home Apertura';

Apertura.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
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
                description: 'Ingrese aquí el ID de la collection',
                defaultValue: 'FocalDerecho',
                group: 'Custom Fields'
            }
        )
    }).isRequired
};

export default Apertura;
