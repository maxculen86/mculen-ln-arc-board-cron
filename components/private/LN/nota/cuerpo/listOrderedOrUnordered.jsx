/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ListOrderedOrUnordered = ({ data }) => {
    const [classList] = useState(
        data.list_type === 'ordered' ? 'com-ordered' : 'com-unordered'
    );

    const setExternalLinks = text => {
        const regex = /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g;
        const classRegex = /(?:class|className)=(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]/;
        const filteredText = text.replace(classRegex, `class="com-link"`);
        return filteredText.replace(regex, match => {
            return match.replace(/href=(["'\\])+(.*?)\1/, match => {
                return `${match} class="com-link"`;
            });
        });
    };

    return (
        <ul className={classList}>
            {data.items.map(element => (
                <li
                    key={element._id}
                    className="com-item"
                    dangerouslySetInnerHTML={{
                        __html: setExternalLinks(element.content)
                    }}
                />
            ))}
        </ul>
    );
};

ListOrderedOrUnordered.arcType = 'list';
ListOrderedOrUnordered.isStatic = true;

ListOrderedOrUnordered.propTypes = {
    data: PropTypes.shape({
        list_type: PropTypes.string.isRequired,
        items: PropTypes.arrayOf.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired
};

export default ListOrderedOrUnordered;
