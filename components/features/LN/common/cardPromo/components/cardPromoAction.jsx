import React from 'react';
import { cx } from '@ln/ds-cva';
import Button from '../../../../ui/ln/button/default';
import { useCardPromoContext } from '../context/cardPromoContext';
import { cardActionVariants, getResponsiveCardClasses } from '../styles';

function CardPromoAction({ children, className, title }) {
    const { size, orientation, responsiveSize, responsiveOrientation } =
        useCardPromoContext();
    const responsiveClasses = getResponsiveCardClasses(
        'action',
        responsiveSize,
        responsiveOrientation,
        size,
        orientation
    );
    return (
        <Button
            variant="outline"
            color="secondary"
            size={32}
            aria-label={title}
            title={title}
            className={cardActionVariants({
                size,
                orientation,
                className: cx(responsiveClasses, className)
            })}
            asChild
        >
            <span>{children}</span>
        </Button>
    );
}

CardPromoAction.displayName = 'CardPromo.Action';

export default CardPromoAction;
