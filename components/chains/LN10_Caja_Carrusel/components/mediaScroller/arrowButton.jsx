import React from 'react';
import { Button } from '@ln/contenidos-ui-button';

function ArrowButton(props) {
    return (
        <Button
            variant="secondary"
            style={{ top: '50%', borderRadius: '4px' }}
            {...props}
        />
    );
}

export default ArrowButton;
