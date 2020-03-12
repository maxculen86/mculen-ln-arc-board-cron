import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import ThemeBox from '../private/LN/home/components/ThemeBox/themeBox';
import CollectionsNotes from '../private/LN/home/collectionsNotes';

const CajaTema = ({ customFields: { idCollection, title, notesQuantity } }) => {
    if (!idCollection)
        throw Error('Se requiere el id de la colección de la caja de temas');

    const notes = CollectionsNotes(idCollection, 'caja tema').slice(
        0,
        parseInt(notesQuantity.charAt(0))
    );
    if (notes)
        return (
            <div className="row hlp-margintop-50">
                <div className="lay">
                    <ThemeBox title={title} notes={notes} />
                </div>
            </div>
        );
};

CajaTema.label = 'LN Home CajaTema';

CajaTema.propTypes = {
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
