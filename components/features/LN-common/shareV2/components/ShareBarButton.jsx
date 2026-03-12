import React from 'react';
import { Button } from '@ln/contenidos-ui-button';

function ShareBarButton({
    children,
    size = 'inherit',
    isNegative = true,
    onClick = () => {},
    ...r
}) {
    return (
        <Button
            {...r}
            onClick={onClick}
            size={size}
            isNegative={isNegative}
            iconOnly
        >
            {children}
        </Button>
    );
}

export default ShareBarButton;
