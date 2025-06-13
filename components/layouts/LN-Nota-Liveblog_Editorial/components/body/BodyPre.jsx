import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@ln/cva';

function BodyPre({ children, className }) {
    return <div className={cx(className, 'preLiveBlog_p')}>{children}</div>;
}

BodyPre.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired
};
export default BodyPre;
