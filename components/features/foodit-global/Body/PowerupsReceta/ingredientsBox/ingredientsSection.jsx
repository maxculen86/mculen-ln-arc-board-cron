import React from 'react';
import { List } from '@ln/foodit-ui-list';
import { Text } from '@ln/common-ui-text';

export const IngredientsSection = ({ items = [], titleList = '' }) => {
    if (items.legth) return <></>;
    return (
        <div className="flex flex-column gap-16">
            {titleList && (
                <Text as="h4" className="roboto-bold text-14 text-18_md">
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
    );
};

export default IngredientsSection;
