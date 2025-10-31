import React from 'react';
import PropTypes from 'prop-types';
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
    PlaceholderComponent: null,
    showComponent: true,
    rootMargin: '600px',
    threshold: 0.1,
    onViewport: () => {},
    hide: false
};

export default LazyLoad;
