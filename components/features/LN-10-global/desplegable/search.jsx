import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import addEventToDataLayer from '../../../private/LN/common/utils/addEventToDataLayer';

export const Search = () => {
    return (
        <label
            className="flex w-100 cursor-pointer"
            htmlFor="queryly_toggle"
            onClick={() =>
                addEventToDataLayer({
                    event: 'e_linkclick',
                    action: 'menu_secciones',
                    category: 'home_ln10',
                    label: 'buscar'
                })
            }
        >
            <div className="flex ai-center flex-grow-1 py-8 px-20">
                <Text className="text-14">Buscá en LA NACION...</Text>
            </div>
            <div className="flex w-50 h-50 ai-center jc-center">
                <Icon size={16}>
                    <IconSprite name="search" critical />
                </Icon>
            </div>
        </label>
    );
};
