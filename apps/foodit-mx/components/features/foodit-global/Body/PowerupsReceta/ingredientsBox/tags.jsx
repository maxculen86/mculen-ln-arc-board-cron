import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';

export function Tags({ items = [] }) {
    const handleClick = text => {
        addEventToDataLayerV2({
            event: 'click_tag',
            button: text
        });
    };

    return (
        items.length > 0 && (
            <ul className="flex flex-wrap gap-16">
                {items.map(({ text, url }) => (
                    <li key={text}>
                        <Button
                            variant="secondary"
                            title={text}
                            size={32}
                            href={url}
                            onClick={() => handleClick(text)}
                        >
                            {text}
                        </Button>
                    </li>
                ))}
            </ul>
        )
    );
}

Tags.lazy = true;

export default Tags;
