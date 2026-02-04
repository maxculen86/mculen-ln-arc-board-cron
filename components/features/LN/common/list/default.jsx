/* eslint-disable react/no-danger */
import React from 'react';
import hasRenderableItems from './helpers/hasRenderableItems';

// TODO para front: realizar ajustes de estilos segun diseño
function List({ data }) {
    if (!hasRenderableItems(data?.items)) {
        // Disabled because static rendering does not support null handling
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <></>;
    }

    const Tag = data.list_type === 'ordered' ? 'ol' : 'ul';

    return (
        <Tag>
            {data.items.map(element => {
                if (element.type === 'list') {
                    return <List key={element._id} data={element} />;
                }

                return (
                    <li
                        key={element._id}
                        dangerouslySetInnerHTML={{
                            __html: element.content
                        }}
                    />
                );
            })}
        </Tag>
    );
}

List.arcType = 'list';
List.isStatic = true;

export default List;
