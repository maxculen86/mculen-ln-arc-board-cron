import React from 'react';
import { Button } from '@ln/foodit-ui-button';

export const Tags = ({ items = [] }) => {
    return items.length > 0 ? (
        <ul className="flex flex-wrap gap-16">
            {items.map(({ text, url }, i) => {
                return (
                    <li key={text}>
                        <Button variant="secondary" title={text} href={url}>
                            {text}
                        </Button>
                    </li>
                );
            })}
        </ul>
    ) : (
        <></>
    );
};

export default Tags;
