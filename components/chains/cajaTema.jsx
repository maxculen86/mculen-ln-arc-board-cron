import React from 'react';

import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import ThemeBox from '../private/LN/home/components/ThemeBox/themeBox';
import CollectionsNotes from '../private/LN/home/collectionsNotes';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const CajaTema = ({
    id: featureId,
    isAdmin,
    customFields: { idCollection, title, notesQuantity }
}) => {
    const error = idCollection
        ? null
        : {
              type: 'warning',
              message: 'Se requiere el id de la colección de la caja de temas'
          };

    if (isAdmin && !!error) {
        return <PageBuilderMessage type={error.type} message={error.message} />;
    }

    const notes = CollectionsNotes(idCollection, 'caja tema').slice(
        0,
        parseInt(notesQuantity.charAt(0))
    );

    if (notes)
        return (
            // <Static id={featureId}>
            <div className="row hlp-margintop-50">
                <div className="lay">
                    <ThemeBox title={title} notes={notes} />
                </div>
            </div>
            // </Static>
        );
};

CajaTema.label = 'LN Home CajaTema';

CajaTema.propTypes = {
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
        notesQuantity: PropTypes.oneOf(['3 Notas', '6 Notas']).tag({
            label: {
                '3 Notas': '3',
                '6 Notas': '6'
            },
            name: 'Cantidad de Notas',
            description:
                'Seleccione aquí la cantidad de notas de la caja de tema',
            defaultValue: '3 Notas',
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

export default Consumer(CajaTema);
