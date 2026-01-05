import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import { useLinkedCardContext } from '../../context/LinkedCardContext';
import { cardsNumberVariant, cardsTitleVariant } from '../styles';

function LinkedCardHeading({ number, title }) {
    const { variant, cardColor } = useLinkedCardContext();
    if (!number && !title) return null;

    return (
        <span data-tw className="flex flex-column ai-center gap-16 gap-24_m">
            {number && (
                <Text
                    as="span"
                    className={cardsNumberVariant({ variant })}
                    style={{
                        color: cardColor
                    }}
                >
                    {number}
                </Text>
            )}
            {title && (
                <Text as="h3" className={cardsTitleVariant({ variant })}>
                    {title}
                </Text>
            )}
        </span>
    );
}

export default LinkedCardHeading;
