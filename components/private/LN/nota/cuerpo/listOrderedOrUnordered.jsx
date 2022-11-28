/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ListOrderedOrUnordered = ({ data }) => {
    const [classList] = useState(
        data.list_type === 'ordered' ? 'com-ordered' : 'com-unordered'
    );

    const setExternalLinks = (text = '') => {
        const regex = /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g;
        const classRegex = /(?:<a)(?:.(?!<\/a>))*?class="(link)"/g;
        const filteredText = text.replace(classRegex, (fullMatch, group) => {
            return fullMatch.replace(group, 'com-link');
        });
        return filteredText.replace(regex, match => {
            return match.replace(/href=(["'\\])+(.*?)\1/, _match => {
                return `${_match} class="com-link"`;
            });
        });
    };

    const validateList = list => {
        if (list.some(e => e.type === 'list' || e.content === undefined)) {
            return false;
        }
        return true;
    };

    if (!validateList(data.items)) {
        return <></>;
    }
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
