import React from 'react';
import { SummaryItem } from './summaryItem';
import IconSprite from '../../../../../features/private-global/common/iconSprite/IconSprite';

export const SummaryBox = ({ cookTime, prepTime, counterTime }) => {
    const items = [
        {
            icon: <IconSprite name="timer" />,
            time: `${cookTime} min.`,
            text: 'Tiempo de cocción'
        },
        {
            icon: <IconSprite name="resto" />,
            time: `${prepTime} min.`,
            text: 'Tiempo de Preparación'
        },
        {
            icon: <IconSprite name="timer" />,
            time: `${counterTime} min.`,
            text: 'Tiempo total'
        }
    ];

    return cookTime && prepTime && counterTime ? (
        <ul className="p-16 p-24_md p-32_lg flex flex-column gap-24 border border-all border-thin border-light-300 text-16">
            {items.map((item, i) => (
                <SummaryItem key={i} {...item} />
            ))}
        </ul>
    ) : (
        <></>
    );
};

export default SummaryBox;
