import React from 'react';
import PropTypes from 'fusion:prop-types';
import FocalFactory from '../private/LN/home/templatesContainers/focalFactory';
import FeedNotes from '../private/LN/home/feedNotes';

const hasChildren = children =>
    ['array', 'object'].indexOf(typeof children) && children.length > 0;

const Feed = props => {
    const {
        children,
        customFields: { feedName, directionFocal }
    } = props;

    if (feedName && feedName !== '') {
        const Notes = FeedNotes(feedName);
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

Feed.label = 'LN Home Feed';

Feed.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    customFields: PropTypes.shape({
        feedName: PropTypes.string.tag({
            label: 'Ingrese el Nombre del Feed',
            description: 'Ingrese el Nombre del Feed ej: "deportes" ',
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
                defaultValue: 'FocalDerecho',
                group: 'Custom Fields'
            }
        )
    }).isRequired
};

export default Feed;
