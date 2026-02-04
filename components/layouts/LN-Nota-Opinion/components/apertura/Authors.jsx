import React from 'react';
import { cx } from '@ln/ds-cva';

function Authors({ authorsConcat, className, ...props }) {
    if (!authorsConcat) return null;
    return (
        <span
            className={cx(
                'font-primary font-w-medium text-18 text-center leading-[130%]',
                className
            )}
            {...props}
        >
            {authorsConcat}
        </span>
    );
}

export default Authors;
