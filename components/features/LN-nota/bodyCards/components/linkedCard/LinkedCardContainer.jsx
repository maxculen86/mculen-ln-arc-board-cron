import React from 'react';
import { cardsContainerVariant } from '../styles';
import { useLinkedCardContext } from '../../context/LinkedCardContext';

function LinkedCardContainer({ children }) {
    const { variant } = useLinkedCardContext();
    const variantContainerClass = cardsContainerVariant({ variant });

    return <div className={variantContainerClass}>{children}</div>;
}

export default LinkedCardContainer;
