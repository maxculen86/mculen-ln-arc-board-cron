import React from 'react';
import { cx } from '@ln/ds-cva';
import { cardsContainerVariant } from '../styles';
import { useLinkedCardContext } from '../../context/LinkedCardContext';

function LinkedCardContainer({ children, className: classNameProp }) {
    const { variant, gridColumns } = useLinkedCardContext();
    const className = cx(
        variant !== 'expanded' &&
            (gridColumns === 5 ? 'w-100' : 'w-300_min1366'),
        classNameProp
    );

    return (
        <div className={cardsContainerVariant({ variant, className })}>
            {children}
        </div>
    );
}

export default LinkedCardContainer;
