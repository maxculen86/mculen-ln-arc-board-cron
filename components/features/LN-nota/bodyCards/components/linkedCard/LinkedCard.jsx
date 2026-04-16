import React from 'react';
import { cx } from '@ln/cva';
import LinkedCardButton from './LinkedCardButton';
import LinkedCardContainer from './LinkedCardContainer';
import { cardVariant } from '../styles';
import LinkedCardProvider from '../../context/LinkedCardContext';
import LinkedCardContent from './LinkedCardContent';
import LinkedCardHeading from './LinkedCardHeading';
import LinkedCardDescription from './LinkedCardDescription';

function LinkedCard({
    children,
    variant,
    cardColor,
    className,
    gridColumns,
    ...rest
}) {
    const variantClass = cardVariant({ variant });

    const _className = cx('linked-card', variantClass, className);

    return (
        <LinkedCardProvider
            gridColumns={gridColumns}
            variant={variant}
            cardColor={cardColor}
        >
            <div data-testid="linked-card" className={_className} {...rest}>
                {children}
            </div>
        </LinkedCardProvider>
    );
}

LinkedCard.Container = LinkedCardContainer;
LinkedCard.Heading = LinkedCardHeading;
LinkedCard.Description = LinkedCardDescription;
LinkedCard.Button = LinkedCardButton;
LinkedCard.Content = LinkedCardContent;

export default LinkedCard;
