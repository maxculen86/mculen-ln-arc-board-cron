import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@ln/cva';
import LinkedCardHeader from './LinkedCardHeader';
import LinkedCardButton from './LinkedCardButton';
import LinkedCardContainer from './LinkedCardContainer';
import { cardVariant } from '../styles';
import LinkedCardProvider from '../../context/LinkedCardContext';
import LinkedCardContent from './LinkedCardContent';
import LinkedCardHeading from './LinkedCardHeading';
import LinkedCardDescription from './LinkedCardDescription';

function LinkedCard({ children, variant, cardColor, className }) {
    const variantClass = cardVariant({ variant });

    const _className = cx(
        'linked-card border border-6 border-top',
        variantClass,
        className
    );

    return (
        <LinkedCardProvider variant={variant} cardColor={cardColor}>
            <div
                data-testid="linked-card"
                className={_className}
                style={{
                    borderTopColor: cardColor
                }}
            >
                {children}
            </div>
        </LinkedCardProvider>
    );
}
LinkedCard.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string.isRequired,
    cardColor: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
};

LinkedCard.Container = LinkedCardContainer;
LinkedCard.Header = LinkedCardHeader;
LinkedCard.Heading = LinkedCardHeading;
LinkedCard.Description = LinkedCardDescription;
LinkedCard.Button = LinkedCardButton;
LinkedCard.Content = LinkedCardContent;

export default LinkedCard;
