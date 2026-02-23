import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import { useLinkedCardContext } from '../../context/LinkedCardContext';
import { cardsDescriptionVariant } from '../styles';

function LinkedCardDescription({ children }) {
    const { variant } = useLinkedCardContext();
    return (
        <Text className={cardsDescriptionVariant({ variant })}>{children}</Text>
    );
}

export default LinkedCardDescription;
