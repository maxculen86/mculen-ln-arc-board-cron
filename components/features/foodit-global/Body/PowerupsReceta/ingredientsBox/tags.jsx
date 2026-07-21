import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { pushFooditEvent } from '../../../common/utils/pushFooditEvent';

export function Tags({ items = [] }) {
    const handleClick = text => {
        pushFooditEvent({
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
