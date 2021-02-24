import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import NoteCard from '../../../features/LN-common/articulo';

const FeedNotes = feedName => {
    const content = useContent({
        source: 'feedArticlesSource',
        query: { sectionId: feedName }
    });
    if (content) {
        const { content_elements: contentElements } = content;
        return contentElements
            ? contentElements.map(_content => <NoteCard content={_content} />)
            : [];
    }

    return [];
};

FeedNotes.propTypes = {
    feedName: PropTypes.string.isRequired
};

export default FeedNotes;
