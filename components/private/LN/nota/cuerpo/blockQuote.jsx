import React from 'react';
import PropTypes from 'fusion:prop-types';

import Paragraph from './parrafo';
import ModParagraph from '../../../common/mod-paragraph';
import ListOrderedOrUnordered from './listOrderedOrUnordered';

const blockQuote = ({
    data: { content_elements: contentElements = [], subtype }
}) => {
    const { content, items, list_type: listType } =
        contentElements.length === 0 ? {} : contentElements[0];

    return (content || items) && subtype === 'blockquote' ? (
        <ModParagraph>
            {content && (
                <Paragraph
                    size="--m"
                    classCondition="--sueca --font-bold"
                    data={{ content }}
                />
            )}
            {items && (
                <ListOrderedOrUnordered data={{ items, list_type: listType }} />
            )}
        </ModParagraph>
    ) : (
        <></>
    );
};

blockQuote.arcType = 'blockquote';

blockQuote.propTypes = {
    data: PropTypes.shape({
        content_elements: PropTypes.arrayOf(
            PropTypes.shape({
                content: PropTypes.string
            })
        ),
        subtype: PropTypes.string
    }).isRequired
};

export default blockQuote;
