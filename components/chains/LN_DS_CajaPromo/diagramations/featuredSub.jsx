import React from 'react';
import { cx } from '@ln/ds-cva';

const gap = 'gap-16 md:gap-24 xl:gap-32';

function CardGridFeaturedSub({ children, className }) {
    return (
        <div className={cx('grid grid-cols-2', gap, className)}>{children}</div>
    );
}

CardGridFeaturedSub.displayName = 'CardGrid.Featured.Sub';

export default CardGridFeaturedSub;
