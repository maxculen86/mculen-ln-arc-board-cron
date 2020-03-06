import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import NoteCard from './noteCard/noteCard';

const CollectionsNotes = idCollection => {
    const content = useContent({
        source: 'collectionsV2Source',
        query: { id: idCollection }
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

export default CollectionsNotes;
