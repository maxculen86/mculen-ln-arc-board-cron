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

        const interSectionObserver = createIntersectionObserver(headerSentinel);

        return () => {
            if (interSectionObserver) {
                interSectionObserver.unobserve(headerSentinel);
            }
        };
    }, []);

    const createIntersectionObserver = headerSentinel => {
        if (!headerSentinel) return null;
        const interSectionObserver = new IntersectionObserver(handleVariants);
        interSectionObserver.observe(headerSentinel);
        return interSectionObserver;
    };

    const handleVariants = entries => {
        const wrapperHome = document.querySelector('.wrapper.homepage');
        const sectionsWithoutToggleNegative = [
            '/revista-lugares',
            '/revista-hola'
        ];
        const toggleNegative = !sectionsWithoutToggleNegative.includes(section);

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateVariantsOnIntersect(wrapperHome);
            } else {
                updateVariantsOnExit(wrapperHome, toggleNegative);
            }
        });
    };

    const updateVariantsOnIntersect = wrapperHome => {
        setVariants(prev => ({
            sticky: isHome ? false : prev.sticky,
            negative: isHome ? false : negative,
            intersectingSentinel: true
        }));
        wrapperHome && wrapperHome.classList.remove('--top-fixed');
    };

    const updateVariantsOnExit = (wrapperHome, toggleNegative) => {
        setVariants(prev => {
            const newNegative =
                !isHome && negative && toggleNegative
                    ? !prev.negative
                    : prev.negative;

            return {
                sticky: isHome ? true : prev.sticky,
                negative: newNegative,
                intersectingSentinel: false
            };
        });
        wrapperHome && wrapperHome.classList.add('--top-fixed');
    };

    return {
        ...variants,
        ...getConfigClassName({ ...variants, isHome }),
        isHome
    };
};
