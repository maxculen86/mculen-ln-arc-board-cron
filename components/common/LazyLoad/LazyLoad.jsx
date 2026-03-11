import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function LazyLoad({
    children,
    PlaceholderComponent = null,
    showComponent = true,
    rootMargin = '600px',
    threshold = 0.1,
    onViewport = () => {},
    hide = false,
    ...props
}) {
    const { targetRef, isIntersecting } = useIntersectionObserver({
        rootMargin,
        threshold,
        hide,
        onViewport
    });

    if (hide) {
        return null;
    }

    return (
        <div ref={targetRef} {...props}>
            {isIntersecting && showComponent
                ? children
                : PlaceholderComponent && <PlaceholderComponent />}
        </div>
    );
}

export default LazyLoad;
