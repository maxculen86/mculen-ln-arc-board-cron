import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ln/contenidos-ui-button';

function ShareBarButton({
    children,
    size = 'inherit',
    isNegative = true,
    onClick,
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

ShareBarButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    size: PropTypes.string,
    isNegative: PropTypes.bool
};

ShareBarButton.defaultProps = {
    onClick: () => {},
    size: 'inherit',
    isNegative: true
};

export default ShareBarButton;
