import React from 'react';
import { Text } from '@ln/common-ui-text';
import { List } from '@ln/foodit-ui-list';

export const Nutritional = props => {
    const { items = [], titleList } = props;
    if (items.legth) return <></>;
    return (
        <div className="flex flex-column gap-16">
            {titleList && (
                <Text as="h2" className="prumo prumo-light text-24">
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

export default Nutritional;
