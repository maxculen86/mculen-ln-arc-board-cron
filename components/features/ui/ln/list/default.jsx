import React from 'react';
import { List as CommonList } from '@ln/ds-common-list';

/**
 * @typedef {import('@ln/ds-common-list').ListRootProps} ListRootProps
 */

/**
 * Componente facade para List que consume la librería DS
 * @param {ListRootProps} props
 * @returns {React.ReactElement}
 */
function List({ tag = 'ul', direction = 'vertical', size = 16, ...props }) {
    return (
        <CommonList tag={tag} direction={direction} size={size} {...props} />
    );
}

List.Title = CommonList.Title;
List.Item = CommonList.Item;
List.Separator = CommonList.Separator;

export default List;
