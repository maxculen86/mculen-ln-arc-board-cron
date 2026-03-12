import React from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { cx } from '@ln/cva';

function FuneralSearchButton({
    children,
    className = '',
    onClick = () => {},
    variant = 'primary',
    ...r
}) {
    return (
        <Button
            className={cx('px-16 py-12', className)}
            onClick={onClick}
            variant={variant}
            {...r}
        >
            {children}
        </Button>
    );
}

export default FuneralSearchButton;
