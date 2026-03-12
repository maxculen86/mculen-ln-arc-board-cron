import React from 'react';
import { DollarItem } from './dollarItem';

function Dollar({ dollarData }) {
    if (dollarData && dollarData.length === 0) return null;

    return (
        <div className="dollar dollar-container flex --scroll-x --degrade-scroll_max1279">
            <ul className="flex --bullet-list_4">
                {dollarData.map(dolarType => (
                    <DollarItem key={dolarType.text} {...dolarType} />
                ))}
            </ul>
        </div>
    );
}

export default Dollar;
