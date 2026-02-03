import React from 'react';
import { useCardCarruselContext } from '../CardContext';
import { cardDescriptionVariants } from '../styles';

function CardDescription({ className, ...props }) {
    const { variant } = useCardCarruselContext();

    const _className = cardDescriptionVariants({ variant, className });
    return <div className={_className} {...props} />;
}

export default CardDescription;
