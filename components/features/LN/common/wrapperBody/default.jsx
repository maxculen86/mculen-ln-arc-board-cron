import React from 'react';
import { cx } from '@ln/ds-cva';
import { gridContentVariants } from './styles';

export function WrapperBody({ children, className, variant = 'narrow', ...r }) {
    const _className = cx(gridContentVariants[variant], className);
    return (
        <div className={_className} {...r}>
            {children}
        </div>
    );
}
