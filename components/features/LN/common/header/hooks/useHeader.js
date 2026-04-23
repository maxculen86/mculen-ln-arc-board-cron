import { useAppContext } from 'fusion:context';
import { useEffect, useState } from 'react';
import { HEADER_VARIANTS } from '../constants';
import { getHeaderValidations } from '../helpers';

const handleSentinelIntersection = (
    entries,
    callback,
    { positionDefault, darkTheme }
) => {
    entries.forEach(entry => {
        callback(prev => {
            const theme =
                darkTheme && entry.isIntersecting
                    ? HEADER_VARIANTS.THEME.DARK
                    : HEADER_VARIANTS.THEME.LIGHT;

            if (!positionDefault) return { ...prev, theme };

            const position = entry.isIntersecting
                ? HEADER_VARIANTS.POSITION.DEFAULT
                : HEADER_VARIANTS.POSITION.STICKY;

            return { position, theme };
        });
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

    const [{ position, theme }, setVariants] = useState({
        position: shouldBePositionDefault
            ? HEADER_VARIANTS.POSITION.DEFAULT
            : HEADER_VARIANTS.POSITION.STICKY,
        theme: shouldBeDarkTheme
            ? HEADER_VARIANTS.THEME.DARK
            : HEADER_VARIANTS.THEME.LIGHT
    });

    useEffect(() => {
        if (!shouldBePositionDefault && !shouldBeDarkTheme) return undefined;

        const isDesktop = window.innerWidth >= 1279;

        if (!isDesktop) return undefined;

        const sentinelElement = document.querySelector('.header-sentinel');

        if (!sentinelElement) return undefined;

        const observer = new IntersectionObserver(
            entries =>
                handleSentinelIntersection(entries, setVariants, {
                    positionDefault: shouldBePositionDefault,
                    darkTheme: shouldBeDarkTheme
                }),
            {
                threshold: 0,
                rootMargin: '0px'
            }
        );

        observer.observe(sentinelElement);

        return () => {
            observer.disconnect();
        };
    }, [shouldBePositionDefault, shouldBeDarkTheme]);

    const animation =
        shouldBePositionDefault && position === HEADER_VARIANTS.POSITION.STICKY
            ? HEADER_VARIANTS.ANIMATION_IN
            : undefined;

    return {
        position,
        theme,
        animation
    };
};

export default useHeader;
