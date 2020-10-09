import React from 'react';
import PropTypes from 'fusion:prop-types';

import Paragraph from './parrafo';
import ModParagraph from '../../../common/mod-paragraph';
import ListOrderedOrUnordered from './listOrderedOrUnordered';

const blockQuote = ({ data }) => {
    const {
        content_elements: {
            0: { content, items, list_type: listType }
        },
        subtype
    } = data;

    return (
        subtype === 'blockquote' /* pullquote */ && (
            <ModParagraph>
                {content && <Paragraph data={{ content }} />}
                {items && (
                    <ListOrderedOrUnordered
                        data={{ items, list_type: listType }}
                    />
                )}
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
