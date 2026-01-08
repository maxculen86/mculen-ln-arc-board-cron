import React from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';

function LinkedCardButton({ buttonText = 'Ver más', ...rest }) {
    return (
        <div className="flex h-100 ai-end">
            <Button
                size={32}
                variant="secondary"
                title={buttonText}
                style={{
                    borderColor: 'var(--neutral-light-600)'
                }}
                className="mt-8 mt-16_m"
                {...rest}
            >
                <Text className="text-neutral-light-600 uppercase text-neutral-light-600 text-12_130">
                    {buttonText}
                </Text>
            </Button>
        </div>
    );
}

export default LinkedCardButton;
