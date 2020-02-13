import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { NoteCard } from '../features/LN-home/noteCard';

const CollectionsNotes = props => {
    const { idCollection: id } = props;

    const content = useContent({
        source: 'collectionsV2Source',
        query: { id }
    });

    if (content) {
        const { content_elements: contentElements } = content;
        return contentElements
            ? contentElements.map(_content => <NoteCard content={_content} />)
            : [];
    }

    return [];
};

CollectionsNotes.propTypes = {
    idCollection: PropTypes.string.isRequired
};

const Apertura = props => {
    const {
        children,
        customFields: { idCollection }
    } = props;

    if (idCollection && idCollection !== '') {
        return (
            <section>
                <CollectionsNotes idCollection={idCollection} />
            </section>
        );
    }

    return <section>{children}</section>;
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
        })
    }).isRequired
};

export default Apertura;
