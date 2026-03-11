import React from 'react';
import { cx } from '@ln/cva';

function LiveBody({ children, className = '', ...r }) {
    return (
        <div
            className={cx(
                'live-body py-16 pr-16 flex pt-0 overflow-x-auto overflow-y-hidden scrollbar-width-none scrollbar_l contenidos-scrollbar-gray --degrade-scroll mr-2',
                className
            )}
            {...r}
        >
            {children}
        </div>
    );
}

export default LiveBody;
