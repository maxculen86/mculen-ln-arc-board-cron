import React from 'react';
import Carousell from '../../../common/carousell';
import CurrentProgramItem from './currentProgramsItem';

export default function CurrentPrograms({ items = [] }) {
    const currentItem = items.map((item, index) => {
        return (
            <CurrentProgramItem
                description={item.description}
                imgSrc={item.imgSrc}
                href={item.href}
                key={index}
            />
        );
    });
    return <Carousell>{currentItem}</Carousell>;
}
