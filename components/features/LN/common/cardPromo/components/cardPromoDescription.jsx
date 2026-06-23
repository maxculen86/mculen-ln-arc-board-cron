import React from 'react';
import { cx } from '@ln/ds-cva';
import { useCardPromoContext } from '../context/cardPromoContext';
import { cardDescriptionVariants, getResponsiveCardClasses } from '../styles';

function CardPromoDescription({ children, className }) {
    if (!children) return null;

    const { size, orientation, responsiveSize, responsiveOrientation } =
        useCardPromoContext();

    const responsiveClasses = getResponsiveCardClasses(
        'description',
        responsiveSize,
        responsiveOrientation,
        size,
        orientation
    );

    return (
        <p
            className={cardDescriptionVariants({
                size,
                orientation,
                className: cx(responsiveClasses, className)
            })}
        >
            {children}
        </p>
    );
}

CardPromoDescription.displayName = 'CardPromo.Description';

export default CardPromoDescription;
