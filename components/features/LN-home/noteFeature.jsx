import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import NoteCard from '../../private/LN/home/noteCard/noteCard';

const NoteFeature = ({ customFields }) => {
    const { noteId: id } = customFields;

    const content = useContent({
        source: 'articleSourceNota',
        query: { id }
    });
    if (!id) throw Error('El campo Id de la Nota es obligatorio.');
    // if (!content) throw Error(`No se encuentran resultados para el id ${id}.`);
    return <NoteCard content={content} customFields={customFields} />;
};

NoteFeature.label = 'LN Home NoteCard';

NoteFeature.propTypes = {
    customFields: PropTypes.shape({
        noteId: PropTypes.string.tag({
            label: 'Ingresar id de nota',
            description: 'Ingrese aquí el id de la nota',
            group: 'Custom Fields'
        }),
        imageId: PropTypes.string.tag({
            label: 'Ingresar id de imagen',
            description: 'Ingrese aquí el id de la imagen',
            default: undefined,
            group: 'Custom Fields'
        }),
        lead: PropTypes.string.tag({
            label: 'Volanta',
            description: 'Ingrese aquí el texto de la volanta',
            group: 'Custom Fields'
        }),
        title: PropTypes.string.tag({
            label: 'Título',
            description: 'Ingrese aquí el texto del título',
            default: undefined,
            group: 'Custom Fields'
        }),
        description: PropTypes.string.tag({
            label: 'Bajada',
            description: 'Ingrese aquí el texto de la bajada',
            default: undefined,
            group: 'Custom Fields'
        }),
        authors: PropTypes.string.tag({
            label: 'Marquesina',
            description: 'Ingrese aquí el texto de la marquesina',
            default: undefined,
            group: 'Custom Fields'
        })
    }).isRequired
};

export default NoteFeature;
