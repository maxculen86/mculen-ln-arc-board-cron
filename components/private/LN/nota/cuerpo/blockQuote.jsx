import React from 'react';
import PropTypes from 'fusion:prop-types';

import Paragraph from './parrafo';

const blockQuote = ({ data }) => {
    const {
        content_elements: {
            0: { content }
        },
        subtype
    } = data;
    return (
        subtype === 'blockquote' /* pullquote */ && (
            <blockquote className="blockquote w-100">
                <Paragraph data={{ content }} />
            </blockquote>
        )
    );
};

blockQuote.arcType = 'blockquote';

blockQuote.propTypes = {
    data: PropTypes.shape({
        content_elements: PropTypes.arrayOf(
            PropTypes.shape({
                content: PropTypes.string
            })
        )
    }).isRequired
};

export default blockQuote;
