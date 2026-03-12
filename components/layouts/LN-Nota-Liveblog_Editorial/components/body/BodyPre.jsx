import React from 'react';
import { cx } from '@ln/cva';

function BodyPre({ children, className }) {
    if (!children) return null;
    return <div className={cx(className, 'preLiveBlog_p')}>{children}</div>;
}

export default BodyPre;
