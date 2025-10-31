import React from 'react';
import PropTypes from 'prop-types';
import { cardsContainerVariant, cardsPaddingVariant } from '../styles';
import { useLinkedCardContext } from '../../context/LinkedCardContext';

function LinkedCardContainer({ children }) {
    const { variant } = useLinkedCardContext();
    const variantContainerClass = cardsContainerVariant({ variant });
    const variantPaddingClass = cardsPaddingVariant({ variant });

    return (
        <div className={variantContainerClass}>
            <div className={variantPaddingClass}>{children}</div>
        </div>
    );
}

LinkedCardContainer.propTypes = {
    children: PropTypes.node.isRequired
};

export default LinkedCardContainer;
