import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { Search as SearchIcon } from '@ln/foodit-ui-assets';

import classNames from 'classnames';

export const Search = ({ className, ...r }) => {
    const classnames = classNames('foodit-search w-100 as-center', className);
    // TODO: implementar funcionalidad de búsqueda con el proveedor
    return (
        <div className={classnames} {...r}>
            <div className="flex ai-center h-44 border border-all border-thin border-light-100 p-16 rounded-4 gap-8 bg-light-1">
                <Icon size={24}>
                    <SearchIcon />
                </Icon>
                <Text className="text-light-600 text-14">
                    ¿Qué querés cocinar hoy?
                </Text>
            </div>
        </div>
    );
};
