import { useAppContext } from 'fusion:context';
import { useEffect, useState } from 'react';
import { HEADER_VARIANTS } from '../constants';
import { getHeaderValidations } from '../helpers';

const handleSentinelIntersection = (entries, callback) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // sentinel visible
            callback(prev => ({
                ...prev,
                position: HEADER_VARIANTS.POSITION.DEFAULT
            }));
        } else {
            // sentinel not visible
            callback(prev => ({
                ...prev,
                position: HEADER_VARIANTS.POSITION.STICKY
            }));
        }
    });
};

const useHeader = () => {
    const { layout, siteProperties, section } = useAppContext();
    const { layoutsName = {} } = siteProperties || {};

    const { shouldBePositionDefault, shouldBeDarkTheme } = getHeaderValidations(
        {
            layout,
            section,
            layoutsName
        }
    );

    const defaultVariants = {
        position: shouldBePositionDefault
            ? HEADER_VARIANTS.POSITION.DEFAULT
            : HEADER_VARIANTS.POSITION.STICKY,
        appearance: shouldBeDarkTheme
            ? HEADER_VARIANTS.APPEARANCE.DARK_THEME
            : HEADER_VARIANTS.APPEARANCE.LIGHT_THEME
    };

    const [headerVariants, setHeaderVariants] = useState(defaultVariants);

    useEffect(() => {
        const isDesktop = window.innerWidth >= 1279;

        if (!isDesktop) return undefined;

        const sentinelElement = document.querySelector('.header-sentinel');

        if (!sentinelElement) return undefined;

        const observer = new IntersectionObserver(
            entries => handleSentinelIntersection(entries, setHeaderVariants),
            {
                threshold: 0,
                rootMargin: '0px'
            }
        );

        observer.observe(sentinelElement);

        return () => {
            observer.disconnect();
        };
    }, []);

    const animation =
        headerVariants.position === HEADER_VARIANTS.POSITION.STICKY
            ? HEADER_VARIANTS.ANIMATION_IN
            : undefined;

    return {
        position: headerVariants.position,
        appearance: headerVariants.appearance,
        animation
    };
};

export default useHeader;
