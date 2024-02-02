import React from 'react';
import { List } from '@ln/foodit-ui-list';
import get from '../../../../private/common/utils/get';

export const PowerUpPreparacion = ({ data }) => {
    const { items = [], titleList = '' } = get(data, 'embed.config', {});

    return items.length > 0 ? (
        <div className="flex flex-column gap-24">
            <h3 className="prumo prumo-light text-24 text-32_md text-36_lg">
                {titleList}
            </h3>
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
