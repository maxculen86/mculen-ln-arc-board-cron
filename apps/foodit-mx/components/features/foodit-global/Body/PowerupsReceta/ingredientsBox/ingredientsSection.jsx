import React from 'react';
import { List } from '@ln/foodit-ui-list';
import { Text } from '@ln/common-ui-text';

export function IngredientsSection({ items = [], titleList = '' }) {
    return (
        items.length > 0 && (
            <div className="flex flex-column gap-16" key={titleList}>
                {titleList && (
                    <Text as="h4" className="roboto-bold text-16 text-18_md">
                        {titleList}
                    </Text>
                )}
                <List variant="unordered">
                    {items.map(item => (
                        <List.Item key={item} size={12}>
                            {item}
                        </List.Item>
                    ))}
                </List>
            </div>
        )
    );
}

export default IngredientsSection;
