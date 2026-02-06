import React from 'react';
import { useCardCarruselContext } from '../CardContext';
import { cardBadgeVariants } from '../styles';

function CardBadge({ children, className, ...props }) {
    const { variant } = useCardCarruselContext();
    if (!children) return null;
    return (
        <span className={cardBadgeVariants({ variant, className })} {...props}>
            {children}
        </span>
    );
}

export default CardBadge;
