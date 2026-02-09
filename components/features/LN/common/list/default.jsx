/* eslint-disable react/no-danger */
import React from 'react';
import { cx } from '@ln/ds-cva';
import hasRenderableItems from './helpers/hasRenderableItems';
import Icon from '../../../ui/ln/icon/default';
import ListComponent from '../../../ui/ln/list/default';

function List({ data, className }) {
    const tagValidation = data?.list_type === 'ordered' ? 'ol' : 'ul';

    if (!hasRenderableItems(data?.items)) {
        // Disabled because static rendering does not support null handling
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <></>;
    }

    return (
        <ListComponent
            tag={tagValidation}
            className={cx('ds-custom-list-body gap-16', className)}
        >
            {data.items.map((element, index) => {
                if (element?.type === 'list') {
                    return (
                        <ListComponent.Item key={element._id}>
                            <List data={element} className="pl-16" />
                        </ListComponent.Item>
                    );
                }
                const numberListOrdered = index + 1;
                return (
                    <ListComponent.Item key={element._id} align="center">
                        {data?.list_type === 'ordered' ? (
                            <div
                                className="text-22 md:text-18 leading-[130%] text-black-foreground bg-black-default p-8 font-primary mr-8 tabular-nums"
                                aria-hidden="true"
                            >
                                {numberListOrdered}
                            </div>
                        ) : (
                            <Icon size={24} name="bullet-filled" />
                        )}
                        <span
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                                __html: element?.content
                            }}
                            className="font-tertiary"
                        />
                    </ListComponent.Item>
                );
            })}
        </ListComponent>
    );
}

List.arcType = 'list';
List.isStatic = true;

export default List;
