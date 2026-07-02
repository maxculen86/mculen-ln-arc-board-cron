import React, { Children } from 'react';
import { cx } from '@ln/ds-cva';

const gap = 'gap-24 xl:gap-16';
const mb = 'mb-16 md:mb-24 xl:mb-32';

function CardGridThree({ children, className }) {
    return (
        <div
            className={cx(
                'grid grid-cols-1 md:grid-cols-3',
                gap,
                mb,
                className
            )}
        >
            {Children.toArray(children).slice(0, 3)}
        </div>
    );
}

CardGridThree.displayName = 'CardDiagramation.Three';

export default CardGridThree;
