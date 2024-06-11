import React from 'react';
import { List } from '@ln/foodit-ui-list';
import get from '../../../../private/common/utils/get';
import { Text } from '@ln/common-ui-text';

export const PowerUpPreparacion = ({ data }) => {
    const { items = [], titleList = '' } = get(data, 'embed.config', {});

    return items.length > 0 ? (
        <div className="flex flex-column gap-16">
            {titleList && (
                <Text as="h4" className="roboto-bold text-16 text-18_md">
                    {titleList}
                </Text>
            )}
            <List variant="unordered">
                {items.map(item => {
                    return (
                        <List.Item
                            key={item}
                            dangerouslySetInnerHTML={{
                                __html: item
                            }}
                        />
                    );
                })}
            </List>
        </div>
    ) : (
        <></>
    );
};

export default PowerUpPreparacion;
