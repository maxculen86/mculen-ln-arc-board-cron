import React from 'react';
import { List } from '@ln/foodit-ui-list';

export function ListOrderedOrUnordered({ data }) {
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
                            __html: element.content
                        }}
                    />
                );
            })}
        </List>
    );
}

export default ListOrderedOrUnordered;
