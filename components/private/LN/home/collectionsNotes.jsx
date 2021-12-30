import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import NoteCard from './components/noteCard/noteCard';

const getNoteCard = (key, content, isOpening, type) => (
    <NoteCard
        key={key}
        content={content}
        isOpening={isOpening}
        belongsTo={type}
    />
);

const CollectionsNotes = (idCollection, type) => {
    const content = useContent({
        source: 'collectionsV2Source',
        query: { id: idCollection }
    });

    if (content) {
        const { content_elements: contentElements } = content;
        const elements = contentElements
            ? contentElements.map((_content, index) =>
                  getNoteCard(
                      `${idCollection}${index}`,
                      _content,
                      index === 0,
                      type
                  )
              )
            : [];
        return elements;
    }
    return null;
};

CollectionsNotes.propTypes = {
    idCollection: PropTypes.string.isRequired
};

export default CollectionsNotes;
