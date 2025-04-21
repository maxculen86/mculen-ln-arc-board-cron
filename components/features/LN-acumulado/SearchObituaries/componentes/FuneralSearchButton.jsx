import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ln/contenidos-ui-button';
import { cx } from '@ln/cva';

function FuneralSearchButton({
    children,
    className,
    onClick,
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

FuneralSearchButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    variant: PropTypes.string
};

FuneralSearchButton.defaultProps = {
    onClick: () => {},
    className: '',
    variant: 'primary'
};

export default FuneralSearchButton;
