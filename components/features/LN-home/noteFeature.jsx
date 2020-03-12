import React, { useEffect, useState } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import NoteCard from '../../private/LN/home/components/noteCard/noteCard';
import get from '../../private/common/utils/get';

const validateIsOpening = (tree, id) => {
    const childrenChainApertura = get(
        tree,
        'children[0].children[0].children[0].props.id'
    );
    return !!(childrenChainApertura === id);
};

const NoteFeature = ({ customFields, id: idNoteFeature, tree }) => {
    const [isOpening, setIsOpening] = useState();
    const { noteId: id } = customFields;

    useEffect(() => {
        setIsOpening(validateIsOpening(tree, idNoteFeature));
    }, [tree, idNoteFeature]);

    const content = useContent({
        source: 'articleSourceNota',
        query: { id }
    });
    if (!id) throw Error('El campo Id de la Nota es obligatorio.');
    // if (!content) throw Error(`No se encuentran resultados para el id ${id}.`);
    return (
        <NoteCard
            content={content}
            customFields={customFields}
            isOpening={isOpening}
        />
    );
};

NoteFeature.label = 'LN Home NoteCard';

NoteFeature.propTypes = {
    id: PropTypes.string.isRequired,
    tree: PropTypes.arrayOf(PropTypes.node).isRequired,
    customFields: PropTypes.shape({
        noteId: PropTypes.string.tag({
            name: 'Ingresar id de nota',
            description: 'Ingrese aquí el id de la nota',
            group: 'Custom Fields'
        }),
        imageId: PropTypes.string.tag({
            name: 'Ingresar id de imagen',
            description: 'Ingrese aquí el id de la imagen',
            default: undefined,
            group: 'Custom Fields'
        }),
        lead: PropTypes.string.tag({
            name: 'Volanta',
            description: 'Ingrese aquí el texto de la volanta',
            group: 'Custom Fields'
        }),
        title: PropTypes.string.tag({
            name: 'Título',
            description: 'Ingrese aquí el texto del título',
            default: undefined,
            group: 'Custom Fields'
        }),
        description: PropTypes.string.tag({
            name: 'Bajada',
            description: 'Ingrese aquí el texto de la bajada',
            default: undefined,
            group: 'Custom Fields'
        }),
        authors: PropTypes.string.tag({
            name: 'Marquesina',
            description: 'Ingrese aquí el texto de la marquesina',
            default: undefined,
            group: 'Custom Fields'
        })
    }).isRequired
};

export default Consumer(NoteFeature);
