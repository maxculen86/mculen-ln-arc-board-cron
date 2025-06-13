import React from 'react';
import PropTypes from 'prop-types';

import Paragraph from './parrafo';
import ModParagraph from '../../../common/mod-paragraph';
import ListOrderedOrUnordered from './listOrderedOrUnordered';
import '../../../../../resources/dist/css/ln/components/blockquote.css';

function blockQuote({
    data: { content_elements: contentElements = [], subtype }
}) {
    const {
        content,
        items,
        list_type: listType
    } = contentElements.length === 0 ? {} : contentElements[0];

    return (content || items) && subtype === 'blockquote' ? (
        <ModParagraph classCondition="container-center-100">
            {content && (
                <Paragraph
                    size="--l"
                    classCondition="--font-primary --font-extra"
                    data={{ content }}
                />
            )}
            {items && (
                <ListOrderedOrUnordered data={{ items, list_type: listType }} />
            )}
        </ModParagraph>
    ) : null;
}

blockQuote.arcType = 'blockquote';
blockQuote.isStatic = true;

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
