import React from 'react';

export function MessageUser({ children, ...props }) {
    if (!children) return null;

    return (
        <div className="relative" {...props}>
            <p className="ml-[32px] max-w-[500px] bg-accent-default text-accent-foreground p-8 rounded-sm">
                {children}
            </p>
            <div
                className="absolute -right-5 -bottom-6 w-12 h-12 bg-accent-default rotate-45"
                style={{
                    clipPath: 'polygon(0 0, 70% 35%, 85% 50%, 70% 65%, 0 100%)'
                }}
            />
        </div>
    );
}
