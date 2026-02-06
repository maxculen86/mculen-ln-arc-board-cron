import React from 'react';
import { cx } from '@ln/cva';
import ShareBarButton from './ShareBarButton';

function ShareBar({ children, className, isHorizontal }) {
    return (
        <div
            className={cx(className, [
                'flex',
                'gap-24_lg',
                'p-16',
                'w-max',
                !isHorizontal && 'flex-column'
            ])}
        >
            {children}
        </div>
    );
}

ShareBar.Button = ShareBarButton;

export default ShareBar;
