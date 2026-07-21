import React from 'react';
import { SummaryItem } from './summaryItem';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

export function SummaryBox({ cookTime, prepTime, counterTime }) {
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

    return (cookTime || prepTime) && counterTime ? (
        <div>
            <ul className="p-16 p-24_md p-32_lg flex flex-column gap-16 border border-all border-thin border-light-300 text-16">
                {items
                    .filter(item => item.type)
                    .map((item, i) => (
                        <SummaryItem
                            key={`${item.time}-${item.type}`}
                            {...item}
                        />
                    ))}
            </ul>
        </div>
    ) : (
        <></>
    );
}

export default SummaryBox;
