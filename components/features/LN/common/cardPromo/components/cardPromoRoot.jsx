import React from 'react';
import { cx } from '@ln/ds-cva';
import { CardPromoProvider } from '../context/cardPromoContext';
import {
    cardRootVariants,
    getResponsiveCardClasses,
    normalizeResponsive
} from '../styles';

function CardPromoRoot({
    children,
    size,
    orientation,
    href,
    target = '_self',
    className,
    ...rest
}) {
    const normOri = normalizeResponsive(orientation, 'vertical');
    const normSize = normalizeResponsive(size, 24);

    const { default: defaultOri, ...responsiveOrientation } = normOri;
    const { default: defaultSizeRaw, ...responsiveSize } = normSize;

    const defaultSize =
        defaultOri === 'horizontal' && defaultSizeRaw === 32
            ? 24
            : defaultSizeRaw;

    const cleanResponsiveSize = Object.fromEntries(
        Object.entries(responsiveSize).filter(([, v]) => v !== undefined)
    );
    const cleanResponsiveOri = Object.fromEntries(
        Object.entries(responsiveOrientation).filter(([, v]) => v !== undefined)
    );

    const responsiveClasses = getResponsiveCardClasses(
        'root',
        cleanResponsiveSize,
        cleanResponsiveOri,
        defaultSize,
        defaultOri
    );

    return (
        <CardPromoProvider
            value={{
                size: defaultSize,
                orientation: defaultOri,
                responsiveSize: cleanResponsiveSize,
                responsiveOrientation: cleanResponsiveOri
            }}
        >
            <a
                href={href}
                target={target}
                className={cardRootVariants({
                    size: defaultSize,
                    orientation: defaultOri,
                    className: cx(responsiveClasses, className)
                })}
                {...rest}
            >
                {children}
            </a>
        </CardPromoProvider>
    );
}

CardPromoRoot.displayName = 'CardPromo';

export default CardPromoRoot;
