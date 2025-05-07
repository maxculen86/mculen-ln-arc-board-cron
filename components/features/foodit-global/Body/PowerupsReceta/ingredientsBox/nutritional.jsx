import React from 'react';
import { Text } from '@ln/common-ui-text';
import { List } from '@ln/foodit-ui-list';

export const Nutritional = ({ nutritionLists = [] }) =>
    nutritionLists.map(list => {
        const { items = [], titleList } = list || {};

        return (
            items.length > 0 && (
                <>
                    <div className="flex flex-column gap-16" key={titleList}>
                        {titleList && (
                            <Text as="h2" className="prumo prumo-light text-24">
                                {titleList}
                            </Text>
                        )}
                        <List variant="unordered">
                            {items.map(item => {
                                const {
                                    text = '',
                                    unit = '',
                                    value
                                } = item || {};
                                const itemName = `${text}: ${value} ${unit}`;
                                return (
                                    <List.Item key={itemName} size={12}>
                                        {itemName}
                                    </List.Item>
                                );
                            })}
                        </List>
                    </div>
                    <hr className="print-hide" />
                </>
            )
        );
    });

export default Nutritional;
