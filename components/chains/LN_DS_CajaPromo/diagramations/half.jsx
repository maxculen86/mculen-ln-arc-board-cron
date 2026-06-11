import React, { Children } from 'react';
import { cx } from '@ln/ds-cva';

const gap = 'gap-16 md:gap-24 xl:gap-32';
const mb = 'mb-16 md:mb-24 xl:mb-32';

function CardGridHalf({ children, className }) {
    return (
        <div className={cx('grid grid-cols-2', gap, mb, className)}>
            {Children.toArray(children).slice(0, 2)}
        </div>
    );
}

CardGridHalf.displayName = 'CardGrid.Half';

export default CardGridHalf;
