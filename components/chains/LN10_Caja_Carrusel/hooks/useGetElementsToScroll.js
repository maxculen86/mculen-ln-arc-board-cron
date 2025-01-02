import { useEffect, useRef, useState } from 'react';

function useGetElementsToScroll() {
    const [visibleItems, setVisibleItems] = useState(0);
    const itemCarouselWidth = 280;

    const getVisibleItems = (containerRef, itemWidth) => {
        if (containerRef?.current) {
            const containerWidth = containerRef.current.offsetWidth;
            return Math.floor(containerWidth / itemWidth);
        }
        return 0;
    };

    const containerRef = useRef(null);

    useEffect(() => {
        const updateVisibleItems = () => {
            setVisibleItems(getVisibleItems(containerRef, itemCarouselWidth));
        };

        updateVisibleItems();

        window.addEventListener('resize', updateVisibleItems);
        return () => window.removeEventListener('resize', updateVisibleItems);
    }, []);

    return { containerRef, elementsToScroll: visibleItems, itemCarouselWidth };
}

export default useGetElementsToScroll;
