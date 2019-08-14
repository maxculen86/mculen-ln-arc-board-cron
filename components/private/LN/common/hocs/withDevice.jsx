import React from 'react';

export default function WithDevice(WrappedComponent) {
    let isMobile = false;
    if (typeof window !== 'undefined') {
        const viewportWidth =
            window.innerWidth || document.documentElement.clientWidth;
        isMobile = viewportWidth < 1024;
    }

    return props => <WrappedComponent isMobile={isMobile} {...props} />;
}
