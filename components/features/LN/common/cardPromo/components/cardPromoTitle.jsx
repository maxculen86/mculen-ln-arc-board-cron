import React from 'react';
import { cx } from '@ln/ds-cva';
import { useCardPromoContext } from '../context/cardPromoContext';
import { cardTitleVariants, getResponsiveCardClasses } from '../styles';

function CardPromoTitle({ children, className, clamp = false }) {
    if (!children) return null;

    const { size, orientation, responsiveSize, responsiveOrientation } =
        useCardPromoContext();

    const responsiveClasses = getResponsiveCardClasses(
        'title',
        responsiveSize,
        responsiveOrientation,
        size,
        orientation
    );

    return (
        <span
            className={cardTitleVariants({
                size,
                orientation,
                clamp,
                className: cx(responsiveClasses, className)
            })}
        >
            {children}
        </span>
    );
}

CardPromoTitle.displayName = 'CardPromo.Title';

export default CardPromoTitle;
