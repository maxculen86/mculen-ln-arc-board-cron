import React from 'react';
import { SummaryItem } from './summaryItem';

export const SummaryBox = ({ items = [] }) => {
    return (
        <ul className="p-16 p-24_md p-32_lg flex flex-column gap-24 border border-all border-thin border-light-300 text-16">
            {items.map((item, i) => (
                <SummaryItem key={i} {...item} />
            ))}
        </ul>
    );
};

export default SummaryBox;
