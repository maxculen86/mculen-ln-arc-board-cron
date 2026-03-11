import React from 'react';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

export function AccountItem({ item }) {
    return (
        <li className={item.classNameList}>
            <Itemcard
                data-test-id={`button-menu-user-${item.text}`}
                type="button"
                text={item.text}
                icon={item.icon}
                title={item.title ?? `Ir a ${item.text}`}
                onClick={item.onClick}
                level={1}
                fullWidth
                variant={item.variant}
                arrowIcon={<IconSprite name="arrow-right" />}
            />
        </li>
    );
}

export default AccountItem;
