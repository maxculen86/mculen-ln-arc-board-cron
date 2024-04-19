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
            const toogleNegative = !sectionsWithoutToggleNegative.includes(
                section
            );
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVariants(prev => ({
                        sticky: isHome ? false : prev.sticky,
                        negative: isHome ? false : negative,
                        intersectingSentinel: true
                    }));
                    wrapperHome && wrapperHome.classList.remove('--top-fixed');
                } else {
                    setVariants(prev => ({
                        sticky: isHome ? true : prev.sticky,
                        negative:
                            !isHome && negative && toogleNegative
                                ? !prev.negative
                                : prev.negative,
                        intersectingSentinel: false
                    }));
                    wrapperHome && wrapperHome.classList.add('--top-fixed');
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
