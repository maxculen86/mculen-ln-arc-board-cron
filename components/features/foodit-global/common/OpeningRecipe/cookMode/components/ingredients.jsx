import React from 'react';
import Icon from '../../../../../ui/foodit/icon/default';

export function Ingredients({ ingredients = [] }) {
    return (
        <>
            {ingredients.map(label => (
                <li key={label} className="flex gap-4 items-center">
                    <Icon
                        size={8}
                        className="text-base-default"
                        name="bullet-chat"
                    />
                    <p className="text-sm capitalize">{label}</p>
                </li>
            ))}
        </>
    );
}
