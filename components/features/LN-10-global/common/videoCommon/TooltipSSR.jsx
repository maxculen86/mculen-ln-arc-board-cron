import React from 'react';
import { cx } from '@ln/cva';

function TooltipSSR({ children, content, className: classNameProp }) {
    const className = cx(
        'tooltip absolute text-12 p-12 rounded-4 shadow-float transition-regular text-neutral-light-800',
        'w-max max-w-328 z-1 --with-arrow mb-8 top-0 right-100 bg-light-50 --mobile-none',
        classNameProp
    );
    return (
        <div className="relative w-max">
            {children}
            <div
                className={className}
                data-position="left-center"
                role="tooltip"
                style={{
                    animationName: 'fade-in',
                    animationFillMode: 'forwards',
                    animationDuration: '200ms'
                }}
                data-tooltip-id="tooltip-ssr"
            >
                {content}
            </div>
        </div>
    );
}

export default TooltipSSR;
