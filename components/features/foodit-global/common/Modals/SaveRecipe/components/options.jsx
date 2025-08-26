import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@ln/common-ui-icon';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import IconSprite from '../../../../../private-global/common/iconSprite/IconSprite';

function RenderOption({ value, bookmarkGroup, propsAs, currentCollectionId }) {
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

RenderOption.propTypes = {
    value: PropTypes.string,
    bookmarkGroup: PropTypes.string.isRequired,
    propsAs: PropTypes.shape({
        children: PropTypes.string.isRequired
    }).isRequired,
    currentCollectionId: PropTypes.string
};

RenderOption.defaultProps = {
    value: '',
    currentCollectionId: null
};

export default RenderOption;
