import React from 'react';
import PropTypes from 'fusion:prop-types';

const blockQuote = ({ data }) => {
    const {
        content_elements: {
            0: { content }
        },
        subtype
    } = data;
    return (
        subtype === 'pullquote' && (
            <blockquote className="blockquote">{content}</blockquote>
        )
    );
};
blockQuote.arcType = 'quote';

export default blockQuote;
