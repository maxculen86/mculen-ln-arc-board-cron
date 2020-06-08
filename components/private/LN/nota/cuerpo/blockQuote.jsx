import React from 'react';
import PropTypes from 'fusion:prop-types';

import Paragraph from './parrafo';
import ModParagraph from '../../../common/mod-paragraph';

const blockQuote = ({ data }) => {
    const {
        content_elements: {
            0: { content }
        },
        subtype
    } = data;
    return (
        subtype === 'blockquote' /* pullquote */ && (
            <ModParagraph>
                <Paragraph data={{ content }} />
            </ModParagraph>
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
