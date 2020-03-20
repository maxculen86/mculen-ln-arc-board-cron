import React, { useEffect, useState } from 'react';

import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import { useContent } from 'fusion:content';

import NoteCard from '../../private/LN/home/components/noteCard/noteCard';
import PageBuilderMessage from '../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import get from '../../private/common/utils/get';

const validateIsOpening = (tree, id) => {
    const childrenChainApertura = get(
        tree,
        'children[0].children[0].children[0].props.id'
    );
    return !!(childrenChainApertura === id);
};

const validateNoteFeature = (id, content) => {
    if (!id)
        return {
            type: 'warning',
            message: 'El campo Id de la Nota es obligatorio.'
        };
};

const NoteFeature = ({ isAdmin, customFields, id: idNoteFeature, tree }) => {
    const [isOpening, setIsOpening] = useState();
    const [error, setError] = useState();
    const { noteId: id } = customFields;

    const content = useContent({
        source: 'articleSourceNota',
        query: { id }
    });

    useEffect(() => {
        setIsOpening(validateIsOpening(tree, idNoteFeature));
        setError(validateNoteFeature(id, content));
    }, [tree, idNoteFeature, content, id]);

    if (isAdmin && !!error) {
        return <PageBuilderMessage type={error.type} message={error.message} />;
    }

    // if (!content) throw Error(`No se encuentran resultados para el id ${id}.`);

    // Se agrega el belongsTo como 'apertura' porque por el momento solo apertura puede ser de tipo manual
    return (
        // <Static id={idNoteFeature}>
        <NoteCard
            content={content}
            customFields={customFields}
            belongsTo="apertura"
            isOpening={isOpening}
        />
        // </Static>
    );
};

NoteFeature.label = 'LN Home NoteCard';

NoteFeature.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
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
