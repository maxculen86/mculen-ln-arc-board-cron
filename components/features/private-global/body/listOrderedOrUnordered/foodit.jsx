import React from 'react';
import { List } from '@ln/foodit-ui-list';

export const ListOrderedOrUnordered = ({ data }) => {
    const setExternalLinks = (text = '') => {
        const regex = /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g;
        const classRegex = /(?:<a)(?:.(?!<\/a>))*?class="(link)"/g;
        const filteredText = text.replace(classRegex, (fullMatch, group) => {
            return fullMatch.replace(group, '');
        });
        return filteredText.replace(regex, match => {
            return match.replace(/href=(["'\\])+(.*?)\1/, _match => {
                return `${_match} class="link foodit-link" data-variant="secondary"`;
            });
        });
    };

    if (!data.items.some(e => e.type === 'text')) return <></>;

    return (
        <List variant={data.list_type}>
            {data.items.map(element => {
                if (element.type === 'list') {
                    return (
                        <ListOrderedOrUnordered
                            key={element._id}
                            data={element}
                        />
                    );
                }

                return (
                    <List.Item
                        key={element._id}
                        dangerouslySetInnerHTML={{
                            __html: setExternalLinks(element.content)
                        }}
                    />
                );
            })}
        </List>
    );
};

export default ListOrderedOrUnordered;
