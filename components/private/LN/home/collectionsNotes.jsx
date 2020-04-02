import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import NoteCard from './components/noteCard/noteCard';

const CollectionsNotes = (idCollection, type) => {
    const content = useContent({
        source: 'collectionsV2Source',
        query: { id: idCollection }
    });

    if (content) {
        const { content_elements: contentElements } = content;
        const elements =
            content && contentElements
                ? contentElements.map((_content, index) => (
                      <NoteCard
                          key={`${idCollection}${index}`}
                          content={_content}
                          isOpening={index === 0}
                          belongsTo={type}
                      />
                  ))
                : [];
        return elements;
    }
    return null;
};

CollectionsNotes.propTypes = {
    idCollection: PropTypes.string.isRequired
};

export default CollectionsNotes;
