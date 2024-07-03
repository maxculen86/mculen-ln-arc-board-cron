import React from 'react';
import { DollarItem } from './dollarItem';

export const Dollar = ({ dollarData = [] }) => {
    if (dollarData.length === 0) return <></>;

    return (
        <div className="dollar dollar-container flex --scroll-x --degrade-scroll_max1279">
            <ul className="flex --bullet-list_4">
                {dollarData.map((data, dollarIndex) => (
                    <DollarItem key={dollarIndex} {...data} />
                ))}
            </ul>
        </div>
    );
};
