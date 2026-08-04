import React from 'react';
import { cx } from '@ln/ds-cva';
import Icon from '../../../../../ui/foodit/icon/default';

export function Ingredients({ ingredients = [], title, className }) {
    if (!ingredients.length) return null;

    return (
        <div
            className={cx(
                'flex flex-col gap-16 p-12 font-secondary',
                className
            )}
        >
            {title && <p className="text-body-md font-bold">{title}</p>}
            <ul className="flex flex-col gap-16">
                {ingredients.map(label => (
                    <li key={label} className="flex gap-4 items-center">
                        <Icon
                            size={8}
                            className="text-base-default"
                            name="bullet-chat"
                        />
                        <p className="text-sm">{label}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
