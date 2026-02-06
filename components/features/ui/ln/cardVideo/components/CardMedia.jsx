import React from 'react';
import { cx } from '@ln/ds-cva';

function CardMedia({ className, children, ...props }) {
    if (!children) return null;
    return (
        <div
            className={cx(
                'flex justify-center items-center relative overflow-hidden h-full w-full -z-1',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export default CardMedia;
