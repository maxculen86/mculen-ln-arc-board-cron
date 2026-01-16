/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import hasRenderableItems from '../../../../features/LN/common/list/helpers/hasRenderableItems';

function ListOrderedOrUnordered({ data }) {
    const [classList] = useState(
        data.list_type === 'ordered' ? 'com-ordered' : 'com-unordered'
    );

    const setExternalLinks = (text = '') => {
        const regex = /<a[\s]+([^>]+)>((?:.(?!<\/a>))*.)<\/a>/g;
        const classRegex = /(?:<a)(?:.(?!<\/a>))*?class="(link)"/g;
        const filteredText = text.replace(classRegex, (fullMatch, group) =>
            fullMatch.replace(group, 'com-link')
        );
        return filteredText.replace(regex, match =>
            match.replace(
                /href=(["'\\])+(.*?)\1/,
                _match => `${_match} class="com-link"`
            )
        );
    };

    if (!hasRenderableItems(data?.items)) {
        // Disabled because static rendering does not support null handling
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <></>;
    }

    return (
        <ul className={classList}>
            {data.items.map(element => {
                if (element.type === 'list') {
                    return <ListOrderedOrUnordered data={element} />;
                }

                return (
                    <li
                        key={element._id}
                        className="com-item"
                        dangerouslySetInnerHTML={{
                            __html: setExternalLinks(element.content)
                        }}
                    />
                );
            })}
        </ul>
    );
}

ListOrderedOrUnordered.arcType = 'list';
ListOrderedOrUnordered.isStatic = true;

export default ListOrderedOrUnordered;
