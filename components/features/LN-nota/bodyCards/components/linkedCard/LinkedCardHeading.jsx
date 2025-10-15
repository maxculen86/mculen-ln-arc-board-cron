import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@ln/contenidos-ui-text';
import { useLinkedCardContext } from '../../context/LinkedCardContext';
import { cardsNumberVariant, cardsTitleVariant } from '../styles';

function LinkedCardHeading({ number, title }) {
    const { variant, cardColor } = useLinkedCardContext();
    if (!number && !title) return null;

    return (
        <>
            {number && (
                <Text
                    as="span"
                    className={cardsNumberVariant({ variant })}
                    color={cardColor}
                >
                    {number}
                </Text>
            )}
            {title && (
                <Text
                    as="h3"
                    className={cardsTitleVariant({ variant })}
                    color={cardColor}
                >
                    {title}
                </Text>
            )}
        </>
    );
}

LinkedCardHeading.propTypes = {
    number: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default LinkedCardHeading;
