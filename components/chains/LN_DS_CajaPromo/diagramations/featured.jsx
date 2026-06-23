import React, { Children } from 'react';
import { cx } from '@ln/ds-cva';
import FeaturedSub from './featuredSub';

const gap = 'gap-16 md:gap-24 xl:gap-32';
const mb = 'mb-16 md:mb-24 xl:mb-32';

function CardGridFeaturedRoot({ children, className }) {
    const items = Children.toArray(children);
    const [first, ...rest] = items;
    return (
        <div
            className={cx(
                'grid grid-cols-1 md:grid-cols-2',
                gap,
                mb,
                className
            )}
        >
            <div className="col-span-1">{first}</div>
            <FeaturedSub>{rest.slice(0, 4)}</FeaturedSub>
        </div>
    );
}

CardGridFeaturedRoot.displayName = 'CardDiagramation.Featured';
CardGridFeaturedRoot.Sub = FeaturedSub;

export default CardGridFeaturedRoot;
