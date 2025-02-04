import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SkeletonCarousel } from '../skeletons/Carousel/foodit';

export function LazyLoad({
    children,
    PlaceholderComponent = SkeletonCarousel,
    showComponent = true,
    rootMargin = '600px',
    threshold = 0.1,
    onViewport = () => {},
    hide,
    ...props
}) {
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

        if (targetRef?.current) {
            observer.observe(targetRef.current);
        }
        return () => {
            if (targetRef?.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [rootMargin, threshold]);

    if (hide) {
        return null;
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
}

LazyLoad.propTypes = {
    children: PropTypes.node,
    PlaceholderComponent: PropTypes.elementType,
    showComponent: PropTypes.bool,
    rootMargin: PropTypes.string,
    threshold: PropTypes.number,
    onViewport: PropTypes.func,
    hide: PropTypes.bool
};

LazyLoad.defaultProps = {
    children: null,
    PlaceholderComponent: SkeletonCarousel,
    showComponent: true,
    rootMargin: '600px',
    threshold: 0.1,
    onViewport: () => {},
    hide: false
};

export default LazyLoad;
