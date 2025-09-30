import { useEffect } from 'react';

export const useImagePreload = (imageSrcs = [], shouldPreload = true) => {
    useEffect(() => {
        if (!shouldPreload || !Array.isArray(imageSrcs)) return undefined;
        const preloadLinks = [];
        imageSrcs.forEach(src => {
            if (src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
                preloadLinks.push(link);
            }
        });
        return () => {
            preloadLinks.forEach(link => {
                if (document.head.contains(link)) {
                    document.head.removeChild(link);
                }
            });
        };
    }, [imageSrcs, shouldPreload]);
};
