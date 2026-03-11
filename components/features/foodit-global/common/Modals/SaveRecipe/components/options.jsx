import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import IconSprite from '../../../../../private-global/common/iconSprite/IconSprite';

/* eslint-disable react/require-default-props */
function RenderOption({
    value = '',
    bookmarkGroup,
    propsAs,
    currentCollectionId = null
}) {
    const itemDisabled = value === currentCollectionId;
    if (value === 'new') {
        return (
            <span
                className="flex ai-center roboto-bold py-8 text-14 gap-8 border border-bottom border-thin border-light-100 text-accent-lechuga__hover"
                data-test-id="button-bookmark-create-collection"
            >
                <Icon size={16}>
                    <IconSprite name="plus" />
                </Icon>
                {bookmarkGroup}
            </span>
        );
    }
    return (
        <Itemcard
            disabled={itemDisabled}
            className={itemDisabled && 'card-item-disabled'}
            type="button"
            {...propsAs}
        />
    );
}

export default RenderOption;
