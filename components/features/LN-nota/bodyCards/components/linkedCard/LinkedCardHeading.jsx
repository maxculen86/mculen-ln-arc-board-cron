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
                    style={{
                        lineHeight: variant === 'collapsed' && '110%',
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
        </>
    );
}

LinkedCardHeading.propTypes = {
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired
};

LinkedCardHeading.defaultProps = {
    number: null
};
export default LinkedCardHeading;
