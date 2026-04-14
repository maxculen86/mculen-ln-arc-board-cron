import React from 'react';
import { gridContentVariants } from './styles';

export function WrapperBody({ children, className, variant = 'narrow', ...r }) {
    if (variant === null) return children;

    return (
        <div className={gridContentVariants({ variant, className })} {...r}>
            {children}
        </div>
    );
}
