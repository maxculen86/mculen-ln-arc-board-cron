import React, { useRef, useEffect, useState } from 'react';
import { SkeletonCarousel } from '../skeletons/Carousel/foodit';

export const LazyLoad = ({
    children,
    PlaceholderComponent = SkeletonCarousel,
    showComponent = true,
    rootMargin = '600px',
    threshold = 0.1,
    onViewport,
    hide,
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

    if (hide) {
        return <></>;
    }
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
