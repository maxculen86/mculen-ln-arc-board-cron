import React from 'react';
import { cx } from '@ln/ds-cva';
import { useCardPromoContext } from '../context/cardPromoContext';
import { cardContentVariants, getResponsiveCardClasses } from '../styles';

function CardPromoContent({ children, className }) {
    const { size, orientation, responsiveSize, responsiveOrientation } =
        useCardPromoContext();
    const responsiveClasses = getResponsiveCardClasses(
        'content',
        responsiveSize,
        responsiveOrientation,
        size,
        orientation
    );
    return (
        <div
            className={cardContentVariants({
                size,
                orientation,
                className: cx(responsiveClasses, className)
            })}
        >
            {children}
        </div>
    );
}

CardPromoContent.displayName = 'CardPromo.Content';

export default CardPromoContent;
