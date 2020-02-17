import React from 'react';
import PropTypes from 'fusion:prop-types';

const NoteCard = ({ content }) => (
    <p>{content && content.headlines && content.headlines.basic}</p>
);

NoteCard.propTypes = {
    content: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string
        })
    }).isRequired
};

export default NoteCard;
