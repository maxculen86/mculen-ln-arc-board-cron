import React, { useRef, useEffect, useState } from 'react';
import Placeholder from '../Placeholder/foodit';

export const LazyLoad = ({
    children,
    PlaceholderComponent = Placeholder,
    showComponent = true,
    rootMargin = '0px',
    threshold = 0.1,
    onViewport,
    ...props
}) => {
    const targetRef = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    onViewport();
                    observer.disconnect();
                }
            },
            { rootMargin, threshold }
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }
    }, [rootMargin, threshold]);

    return (
        <div ref={targetRef} {...props}>
            {isIntersecting && showComponent ? (
                children
            ) : (
                <PlaceholderComponent />
            )}
        </div>
    );
};

export default LazyLoad;
