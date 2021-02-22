import React from 'react';

import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import ThemeBox from '../private/LN/home/components/ThemeBox/themeBox';
import CollectionsNotes from '../private/LN/home/collectionsNotes';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const validate = (idCollection, notesQuantity) => {
    let error;
    if (!notesQuantity)
        error = {
            type: 'warning',
            message:
                'Se requiere el número de notas a mostrar en la caja de temas'
        };
    if (!idCollection)
        error = {
            type: 'warning',
            message: 'Se requiere el id de la colección de la caja de temas'
        };
    return error;
};

const CajaTema = ({
    id: featureId,
    isAdmin,
    customFields: { idCollection, title, notesQuantity }
}) => {
    const error = validate(idCollection, notesQuantity);

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

    const notes = CollectionsNotes(idCollection, 'caja tema');
    const limit = notesQuantity ? parseInt(notesQuantity.charAt(0), 10) : null;
    const missingNotes = notes ? limit - notes.length : limit;

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

    const elements = notes && limit ? notes.slice(0, limit) : null;

    if (elements && elements.length >= limit && !error)
        return (
            // <Static id={featureId}>
            <div className="row hlp-margintop-50">
                <div className="lay">
                    <ThemeBox title={title} notes={elements} />
                </div>
            </div>
            // </Static>
        );
    return <></>;
};

CajaTema.label = 'LN Home CajaTema';

CajaTema.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
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

// export default Consumer(CajaTema);
