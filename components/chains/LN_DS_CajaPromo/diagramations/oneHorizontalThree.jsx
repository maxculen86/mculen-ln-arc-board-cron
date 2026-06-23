import React, { Children } from 'react';
import { cx } from '@ln/ds-cva';

const gap = 'gap-16 md:gap-24 xl:gap-32';
const mb = 'mb-16 md:mb-24 xl:mb-32';

function CardGridOneHorizontalThree({ children, className }) {
    const items = Children.toArray(children);
    const [first, ...rest] = items;
    return (
        <div
            className={cx(
                'grid grid-cols-1 md:grid-cols-12',
                gap,
                mb,
                className
            )}
        >
            <div className="md:col-span-6">{first}</div>
            {rest.slice(0, 3).map(child => (
                <div key={child.key} className="md:col-span-2">
                    {child}
                </div>
            ))}
        </div>
    );
}

CardGridOneHorizontalThree.displayName = 'CardGrid.OneHorizontalThree';

export default CardGridOneHorizontalThree;
