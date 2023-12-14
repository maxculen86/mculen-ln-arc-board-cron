import React from 'react';
import { List } from '@ln/foodit-ui-list';

export const ListOrderedOrUnordered = ({ data }) => {
    // TODO: Evaluar si se lleva esta función a un utilitario para consumirlo también desde el componente <Paragraph />
    const setExternalLinks = (text = '') => {
        const regex = /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g;
        const classRegex = /(?:<a)(?:.(?!<\/a>))*?class="(link)"/g;
        const filteredText = text.replace(classRegex, (fullMatch, group) => {
            return fullMatch.replace(group, '');
        });
        return filteredText.replace(regex, match => {
            return match.replace(/href=(["'\\])+(.*?)\1/, _match => {
                return `${_match} class="link foodit-link contents" data-variant="secondary"`; // Las clases y data-variant son necesarios para los estilos propios de links
            });
        });
    };

    if (!data.items.some(e => e.type === 'text')) return <></>;

    return (
        <List variant={data.list_type}>
            {data.items.map(element => {
                if (element.type === 'list') {
                    return <ListOrderedOrUnordered data={element} />;
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
