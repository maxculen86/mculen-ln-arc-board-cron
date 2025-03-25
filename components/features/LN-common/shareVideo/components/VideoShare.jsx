import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@ln/cva';

function VideoShare({ className, children }) {
    return (
        <div
            className={cx(
                'ratio-9-16 h-100dvh w-100 w-fit_md js-center flex relative py-16_m',
                className
            )}
        >
            {children}
        </div>
    );
}

VideoShare.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

VideoShare.defaultProps = {
    className: ''
};

export default VideoShare;
