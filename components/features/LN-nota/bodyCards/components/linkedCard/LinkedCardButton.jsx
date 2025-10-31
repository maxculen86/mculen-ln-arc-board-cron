import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';

function LinkedCardButton({ buttonText = 'Ver más', ...rest }) {
    return (
        <div className="flex h-100 ai-end">
            <Button
                size={32}
                variant="secondary"
                title={buttonText}
                className="border-neutral-light-600"
                {...rest}
            >
                <Text className="text-neutral-light-600 uppercase">
                    {buttonText}
                </Text>
            </Button>
        </div>
    );
}

LinkedCardButton.propTypes = {
    buttonText: PropTypes.string.isRequired
};

export default LinkedCardButton;
