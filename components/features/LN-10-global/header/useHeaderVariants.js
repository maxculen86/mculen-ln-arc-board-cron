import { useEffect, useState } from 'react';
import { getConfigClassName, isHeaderNegative } from './_helper';
import { getTypeOfDevice } from '@ln/hooks';

export const useHeaderVariants = ({
    layout = '',
    section = '',
    layoutsName = [],
    isHome
}) => {
    const negative = isHeaderNegative({
        layout,
        section,
        layoutsName
    });
    const [variants, setVariants] = useState({
        sticky: !isHome,
        negative,
        intersectingSentinel: true
    });

    useEffect(() => {
        const typeOfDevice = getTypeOfDevice({
            breakpoints: { mobile: 768, tablet: 1024 }
        });

        if (typeOfDevice === 'mobile' || typeOfDevice === 'tablet') return;

        const headerSentinel = document.querySelector('.header-sentinel');
        if (!headerSentinel) return;

        const handleVariants = entries => {
            const wrapperHome = document.querySelector('.wrapper.homepage');
            const sectionsWithoutToggleNegative = [
                '/revista-lugares',
                '/revista-hola'
            ];
            const toggleNegative = !sectionsWithoutToggleNegative.includes(
                section
            );

            entries.forEach(entry => {
                const isIntersecting = entry.isIntersecting;

                setVariants(prev => ({
                    sticky: isHome ? !isIntersecting : prev.sticky,
                    negative: isHome
                        ? false
                        : negative && toggleNegative
                        ? !prev.negative
                        : prev.negative,
                    intersectingSentinel: isIntersecting
                }));

                if (wrapperHome) {
                    wrapperHome.classList.toggle(
                        '--top-fixed',
                        !isIntersecting
                    );
                }
            });
        };

        const interSectionObserver = new IntersectionObserver(handleVariants);
        interSectionObserver.observe(headerSentinel);

        return () => {
            interSectionObserver.unobserve(headerSentinel);
        };
    }, []);

    return {
        ...variants,
        ...getConfigClassName({ ...variants, isHome }),
        isHome
    };
};
