import React from 'react';
import { cx } from '@ln/cva';
import PropTypes from 'prop-types';
import { Link } from '@ln/contenidos-ui-link';

function VideoShareButton({ className, children, ...r }) {
    return (
        <Link
            title="Cerrar"
            className={cx(
                'flex ai-center rounded-4 gap-8 w-max py-8 px-16 text-white relative left--130_lg font-bold',
                className
            )}
            {...r}
        >
            {children}
        </Link>
    );
}

VideoShareButton.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

VideoShareButton.defaultProps = {
    className: ''
};

export default VideoShareButton;
