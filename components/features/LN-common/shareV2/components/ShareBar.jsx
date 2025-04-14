import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@ln/cva';
import ShareBarButton from './ShareBarButton';

function ShareBar({ children, className }) {
    return (
        <div className={cx(className, 'flex flex-column gap-24_lg p-16 w-max')}>
            {children}
        </div>
    );
}

ShareBar.Button = ShareBarButton;

ShareBar.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

ShareBar.defaultProps = {
    className: ''
};

export default ShareBar;
