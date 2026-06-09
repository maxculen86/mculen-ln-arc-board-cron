import React from 'react';
import Button from '../../../../../../ui/ln/button/default';
import IconSprite from '../../../../../../ui/ln/icon/default';
import { addEventToDataLayerV2 } from '../../../../../../../private/LN/common/utils/addEventToDataLayer';

function SearchButton() {
    return (
        <Button variant="ghost" color="secondary" isIconOnly asChild>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <label
                htmlFor="queryly_toggle"
                title="Ir al buscador"
                onClick={() => {
                    addEventToDataLayerV2({
                        event: 'e_linkclick',
                        action: 'header_logo',
                        category: 'home_ln10',
                        label: 'search'
                    });
                }}
            >
                <IconSprite name="search" size={24} />
            </label>
        </Button>
    );
}

export default SearchButton;
