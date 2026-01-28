import { useEffect, useState } from 'react';
import { getTypeOfDevice } from '@ln/hooks';
import { getConfigClassName, isHeaderNegative } from './_helper';

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

    const updateVariantsOnIntersect = wrapperHome => {
        setVariants(prev => ({
            sticky: isHome ? false : prev.sticky,
            negative: isHome ? false : negative,
            intersectingSentinel: true
        }));
        wrapperHome?.classList.remove('--top-fixed');
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
        wrapperHome?.classList.add('--top-fixed');
    };

    const handleVariants = entries => {
        const wrapperHome = document.querySelector('.wrapper.homepage');
        const sectionsWithoutToggleNegative = [
            '/revista-lugares',
            '/revista-hola',
            '/videos'
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

    const createIntersectionObserver = headerSentinel => {
        if (!headerSentinel) return null;
        const interSectionObserver = new IntersectionObserver(handleVariants);
        interSectionObserver.observe(headerSentinel);
        return interSectionObserver;
    };

    useEffect(() => {
        const typeOfDevice = getTypeOfDevice({
            breakpoints: { mobile: 768, tablet: 1024 }
        });

        if (typeOfDevice === 'mobile' || typeOfDevice === 'tablet')
            return undefined;

        const headerSentinel = document.querySelector('.header-sentinel');
        if (!headerSentinel) return undefined;

        const interSectionObserver = createIntersectionObserver(headerSentinel);

        return () => {
            if (interSectionObserver) {
                interSectionObserver.unobserve(headerSentinel);
            }
        };
    }, []);

    return {
        ...variants,
        ...getConfigClassName({ ...variants, isHome }),
        isHome
    };
};
