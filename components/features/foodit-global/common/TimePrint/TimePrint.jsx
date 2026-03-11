import React from 'react';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { TimeItem } from './TimeItem';

export function TimePrint({ cookTime, prepTime, counterTime }) {
    const items = [
        {
            type: cookTime && 'cookTime',
            icon: <IconSprite name="fire" />,
            time: `${cookTime} min.`,
            text: 'Tiempo de cocción'
        },
        {
            type: prepTime && 'prepTime',
            icon: <IconSprite name="resto" />,
            time: `${prepTime} min.`,
            text: 'Tiempo de preparación'
        },
        {
            type: counterTime && 'counterTime',
            icon: <IconSprite name="clock" />,
            time: `${counterTime} min.`,
            text: 'Tiempo total'
        }
    ];

    return (
        (cookTime || prepTime) &&
        counterTime && (
            <ul className="flex jc-center border border-bottom border-thin border-light-100 pb-40">
                {items
                    .filter(filteredItem => filteredItem.type)
                    .map((item, i) => (
                        <TimeItem
                            {...item}
                            key={`${item.time}-${item.type}`}
                            index={i}
                        />
                    ))}
            </ul>
        )
    );
}
